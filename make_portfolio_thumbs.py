import os
from PIL import Image

# Paths
base_portfolio = r"D:\شغل يوسف\website\assets\portfolio"
base_thumbs = r"D:\شغل يوسف\website\assets\portfolio-thumbs"

print("Starting portfolio thumbnail generation...")

# Replicate directory structure and generate thumbnails
count = 0
skipped = 0
errors = 0

for root, dirs, files in os.walk(base_portfolio):
    # Determine the destination subdirectory path
    relative_path = os.path.relpath(root, base_portfolio)
    if relative_path == ".":
        dst_dir = base_thumbs
    else:
        dst_dir = os.path.join(base_thumbs, relative_path)
    
    os.makedirs(dst_dir, exist_ok=True)
    
    # Filter image files
    img_files = [f for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
    
    for filename in img_files:
        src_path = os.path.join(root, filename)
        dst_path = os.path.join(dst_dir, filename)
        
        # Skip if already exists to save time
        if os.path.exists(dst_path):
            skipped += 1
            continue
        
        try:
            with Image.open(src_path) as img:
                # Convert to RGB if necessary (for PNGs with alpha)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                
                # Resize (Thumbnail) - max width/height 400px
                img.thumbnail((400, 400))
                
                # Save compressed JPEG with optimization
                img.save(dst_path, "JPEG", quality=75, optimize=True)
                count += 1
                if count % 50 == 0:
                    print(f"Generated {count} thumbnails...")
        except Exception as e:
            print(f"Error processing {filename}: {e}")
            errors += 1

print("\nThumbnail generation complete!")
print(f"Total generated: {count}")
print(f"Total skipped: {skipped}")
print(f"Total errors: {errors}")
