import os
import shutil
import time
import base64
from pathlib import Path
from google import genai
from google.genai import types

# --- Config ---
API_KEY = "AIzaSyCE2BPGTTGv9S0w3TNPI2FCHYqClA9zcjg"
SOURCE_FOLDER = r"G:\job\شغل نيو جرافيك\موكب مطبوعات"
OUTPUT_FOLDER = r"G:\job\شغل نيو جرافيك\موكب مطبوعات\sorted"
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}

client = genai.Client(api_key=API_KEY)

def get_company_name(image_path):
    try:
        with open(image_path, "rb") as f:
            image_bytes = f.read()

        suffix = image_path.suffix.lower()
        mime_map = {".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".bmp": "image/bmp"}
        mime_type = mime_map.get(suffix, "image/jpeg")

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[
                types.Part.from_bytes(data=image_bytes, mime_type=mime_type),
                "Look at this image. It contains a logo or brand mark of a company. What is the company or brand name? Reply with ONLY the company/brand name, nothing else. If unknown, reply: unknown"
            ]
        )
        name = response.text.strip()
        for ch in r'\/:*?"<>|':
            name = name.replace(ch, "")
        return name if name else "unknown"
    except Exception as e:
        print(f"  Error: {e}")
        return "unknown"

def main():
    source = Path(SOURCE_FOLDER)
    output = Path(OUTPUT_FOLDER)
    output.mkdir(parents=True, exist_ok=True)

    images = [f for f in source.iterdir() if f.is_file() and f.suffix.lower() in SUPPORTED_EXTENSIONS]
    total = len(images)
    print(f"Found {total} images to process...\n")

    for i, image_path in enumerate(images, 1):
        print(f"[{i}/{total}] Processing: {image_path.name}")
        company = get_company_name(image_path)
        print(f"  -> Company: {company}")

        dest_folder = output / company
        dest_folder.mkdir(parents=True, exist_ok=True)

        dest_file = dest_folder / image_path.name
        if dest_file.exists():
            dest_file = dest_folder / f"{image_path.stem}_{i}{image_path.suffix}"

        shutil.copy2(image_path, dest_file)

        if i % 14 == 0:
            print("  Pausing 60s for rate limit...")
            time.sleep(60)

    print(f"\nDone! Sorted images are in: {OUTPUT_FOLDER}")

if __name__ == "__main__":
    main()
