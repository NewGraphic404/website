import os
import sys
import shutil
import time
import json
import base64
import urllib.request
import urllib.error
import io
from pathlib import Path
from PIL import Image

# --- Config ---
SOURCE_FOLDER = r"D:\شغل يوسف\موكب مطبوعات\مطبوعات\صور"
OUTPUT_FOLDER = r"D:\شغل يوسف\موكب مطبوعات\مطبوعات\صور\sorted"
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}

# Global variable to hold the API key
GROQ_API_KEY = ""

def is_already_sorted(filename, output_dir):
    """
    Checks if a file with the given name already exists in any subfolder of the output directory.
    If it exists only in 'unknown', we don't skip it, so it can be retried.
    """
    for path in output_dir.glob("**/*"):
        if path.is_file() and path.name == filename:
            if path.parent.name == "unknown":
                continue
            return True
    return False

def draw_progress_bar(current, total, bar_length=35):
    """Draws a clean text-based progress bar on the console."""
    percent = float(current) * 100 / total
    filled_length = int(round(bar_length * current / total))
    bar = '█' * filled_length + '░' * (bar_length - filled_length)
    sys.stdout.write(f"\r[{bar}] {percent:.1f}% ({current}/{total})")
    sys.stdout.flush()

def get_image_classification_groq(image_path):
    global GROQ_API_KEY
    
    # Keep prompting user for an API key if it's empty
    while not GROQ_API_KEY:
        print("\n")
        GROQ_API_KEY = input("🔑 Please enter a valid Groq API Key: ").strip()

    try:
        # Compress image in-memory to reduce payload size and token usage dramatically
        try:
            with Image.open(image_path) as img:
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                img.thumbnail((512, 512))
                buffer = io.BytesIO()
                img.save(buffer, format="JPEG", quality=70)
                image_bytes = buffer.getvalue()
                mime_type = "image/jpeg"
        except Exception as compression_error:
            # Fallback to reading raw file if compression fails
            with open(image_path, "rb") as f:
                image_bytes = f.read()
            suffix = image_path.suffix.lower()
            mime_map = {
                ".jpg": "image/jpeg",
                ".jpeg": "image/jpeg",
                ".png": "image/png",
                ".webp": "image/webp",
                ".bmp": "image/bmp"
            }
            mime_type = mime_map.get(suffix, "image/jpeg")

        base64_image = base64.b64encode(image_bytes).decode('utf-8')

        prompt = """
Analyze this image of a promotional product/giveaway/printing item and classify it into the correct category and subcategory based on the following rules:

Categories and Subcategories:
1. giveaway:
   - "اقلام": Pens (individual pens or groups of pens).
   - "شنط": Bags of all kinds (paper bags, shopping bags, cloth bags, backpacks, etc.).
   - "كرّاتات": Cardholders for business cards/IDs (made of leather, metal, cork, etc.).
   - "ورّاقات": Desk paper/note holders (wooden/leather boxes/stands that hold loose note papers, with opening slot).
   - "gifts": VIP gift boxes/sets (containing items like notebook + pen + powerbank set) and custom tissue box covers (wood/acrylic tissue boxes).
   - "ميدليات": Keychains or keyrings (including custom metal/leather keychains or USB flash drives attached to keychains).
   - "mugs": Mugs, cups, thermo flasks, tumblers, water bottles.
   - "كوسرتات": Coasters (small mats to put cups on).
   - "tag names": Name tags, ID badges, pin badges, neck lanyards.

2. مطبوعات:
   - "كراسات": Notebooks, booklets, sketchbooks, brochures.
   - "جلاد": Book covers, wrapping paper, binders, folders.
   - "notepad": Notepads, spiral-bound writing pads.
   - "اعلام": Flags (large flags, desk flags).
   - "بانارات": Banners, roll-up banners, large promotional banners/signage.
   - "كروت": Cards (business cards, greeting cards, invitation cards, coupons).
   - "ورق_آخر": Any other paper-based printed materials (flyers, paper boxes/cartons, paper folders, letterheads, brochures).

3. uniforms:
   - Workwear, custom T-shirts, polo shirts, aprons, caps, vests, overalls, caps/hats. (Use subcategory: null)

4. دروع:
   - Trophies, plaques, glass/wooden/crystal awards, shields. (Use subcategory: null)

5. unknown:
   - If the image does not contain any of these, or is unrelated. (Use subcategory: null)

Output format:
Return ONLY a valid JSON object with the keys "category" and "subcategory", nothing else.
Example:
{"category": "giveaway", "subcategory": "اقلام"}
"""

        url = "https://api.groq.com/openai/v1/chat/completions"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
        
        payload = {
            "model": "meta-llama/llama-4-scout-17b-16e-instruct",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": prompt
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{mime_type};base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            "temperature": 0.1,
            "max_tokens": 150,
            "response_format": {"type": "json_object"}
        }
        
        req_data = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(url, data=req_data, headers=headers, method='POST')
        
        with urllib.request.urlopen(req) as response:
            res_body = response.read().decode('utf-8')
            result = json.loads(res_body)
            
        raw_text = result["choices"][0]["message"]["content"].strip()
        data = json.loads(raw_text)
        
        category = data.get("category", "unknown")
        subcategory = data.get("subcategory")
        
        # Validate values
        valid_categories = {"giveaway", "مطبوعات", "uniforms", "دروع", "unknown"}
        if category not in valid_categories:
            category = "unknown"
            
        return category, subcategory

    except urllib.error.HTTPError as e:
        err_body = e.read().decode('utf-8', errors='ignore')
        try:
            err_json = json.loads(err_body)
            err_msg = err_json.get("error", {}).get("message", "").lower()
            err_code = err_json.get("error", {}).get("code", "").lower()
        except:
            err_msg = err_body.lower()
            err_code = ""

        # 429 Rate Limit
        if e.code == 429:
            if "quota" in err_msg or "limit exceeded" in err_msg or "insufficient_quota" in err_code:
                print(f"\n\n⚠️ Daily Groq API Quota limit reached (Error 429).")
                GROQ_API_KEY = ""  # Force new API key prompt
                return get_image_classification_groq(image_path)
            else:
                print(f"\n\n⏳ Rate limit hit (TPM/RPM). Pausing 20 seconds for limits to reset...")
                time.sleep(20)
                return get_image_classification_groq(image_path)  # Retry with same key

        # 401 Unauthorized / 402 Payment Required
        elif e.code in (401, 402):
            print(f"\n\n⚠️ API key invalid, unauthorized, or insufficient balance (Error {e.code}).")
            GROQ_API_KEY = ""  # Force new API key prompt
            return get_image_classification_groq(image_path)
        else:
            print(f"\n\nHTTP Error {e.code}: {err_body}")
            return "unknown", None
    except Exception as e:
        # If there's any other error (e.g. JSON parsing error or connection issue), retry or mark unknown
        print(f"\n\nError: {e}")
        return "unknown", None

def main():
    # Force UTF-8 stdout encoding for safety on Windows console
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')

    source = Path(SOURCE_FOLDER)
    output = Path(OUTPUT_FOLDER)
    output.mkdir(parents=True, exist_ok=True)

    # Scans files ONLY in the root of the folder (non-recursive)
    images = [f for f in source.iterdir() if f.is_file() and f.suffix.lower() in SUPPORTED_EXTENSIONS]
    total = len(images)
    print(f"Found {total} images to process in the root folder.\n")

    # Prompt user for initial API key
    global GROQ_API_KEY
    GROQ_API_KEY = input("🔑 Enter your Groq API Key: ").strip()

    skipped = 0
    for i, image_path in enumerate(images, 1):
        # Resume check: If file is already sorted in any subfolder, skip it
        if is_already_sorted(image_path.name, output):
            skipped += 1
            draw_progress_bar(i, total)
            continue

        # Draw the progress bar
        draw_progress_bar(i, total)

        # Classify the image
        category, subcategory = get_image_classification_groq(image_path)

        # Print classification details preserving the progress bar line
        sub_str = f" / {subcategory}" if subcategory else ""
        print(f"\n[{i}/{total}] Sorted: {image_path.name} -> {category}{sub_str}")

        # Construct destination directory
        if category in {"giveaway", "مطبوعات"} and subcategory:
            dest_dir = output / category / subcategory
        else:
            dest_dir = output / category
            
        dest_dir.mkdir(parents=True, exist_ok=True)

        # Prepare destination file name (handle naming collisions)
        dest_file = dest_dir / image_path.name
        if dest_file.exists():
            dest_file = dest_dir / f"{image_path.stem}_{i}{image_path.suffix}"

        # If a file existed in 'unknown' previously and is now correctly classified, clean it up
        old_unknown = output / "unknown" / image_path.name
        if old_unknown.exists() and category != "unknown":
            try:
                old_unknown.unlink()
            except Exception:
                pass

        # Copy file to preserve original
        shutil.copy2(image_path, dest_file)

        # Small delay to keep API healthy
        time.sleep(1.5)

    print(f"\nProcessing Completed! Sorted: {total - skipped}, Skipped (Already sorted): {skipped}")
    print(f"All files are stored in: {OUTPUT_FOLDER}")

if __name__ == "__main__":
    main()
