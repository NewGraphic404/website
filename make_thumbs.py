import os
from PIL import Image

# Paths
base_social = r"D:\شغل يوسف\website\assets\social"
base_thumbs = r"D:\شغل يوسف\website\assets\social-thumbs"

categories = ["mockups", "exhibitions", "outdoor"]

# Ensure thumb directories exist
for cat in categories:
    os.makedirs(os.path.join(base_thumbs, cat), exist_ok=True)

print("Starting thumbnail generation...")

for cat in categories:
    src_dir = os.path.join(base_social, cat)
    dst_dir = os.path.join(base_thumbs, cat)
    
    if not os.path.exists(src_dir): continue
    
    files = [f for f in os.listdir(src_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
    print(f"Processing {len(files)} images in {cat}...")
    
    for filename in files:
        src_path = os.path.join(src_dir, filename)
        dst_path = os.path.join(dst_dir, filename)
        
        # Skip if already exists to save time (unless you want to force update)
        if os.path.exists(dst_path): continue
        
        try:
            with Image.open(src_path) as img:
                # Convert to RGB if necessary (for PNGs with alpha)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                
                # Resize (Thumbnail) - max width/height 400px
                img.thumbnail((400, 400))
                
                # Save compressed JPEG
                img.save(dst_path, "JPEG", quality=60, optimize=True)
        except Exception as e:
            print(f"Error processing {filename}: {e}")

print("Thumbnail generation complete!")
