import os
from PIL import Image

def generate_thumbs(src_dir, dst_dir, max_size=(400, 400), quality=75):
    print(f"\nProcessing: {os.path.basename(src_dir)} -> {os.path.basename(dst_dir)}")
    count = 0
    skipped = 0
    errors = 0

    for root, dirs, files in os.walk(src_dir):
        # Skip output/compressed directories if they happen to be subfolders of src
        if "portfolio-thumbs" in root or "featured-clients-thumbs" in root or "featured-clients-compressed" in root:
            continue
            
        relative_path = os.path.relpath(root, src_dir)
        if relative_path == ".":
            current_dst = dst_dir
        else:
            current_dst = os.path.join(dst_dir, relative_path)
        
        os.makedirs(current_dst, exist_ok=True)
        
        img_files = [f for f in files if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
        
        for filename in img_files:
            src_path = os.path.join(root, filename)
            
            # For featured-clients, the frontend expects .jpg for all processed files
            is_client = "featured-clients" in src_dir
            if is_client:
                name_part, _ = os.path.splitext(filename)
                dst_filename = name_part + ".jpg"
            else:
                dst_filename = filename
                
            dst_path = os.path.join(current_dst, dst_filename)
            
            # Skip if thumbnail already exists
            if os.path.exists(dst_path):
                skipped += 1
                continue
            
            try:
                with Image.open(src_path) as img:
                    # Convert to RGB if necessary (JPEGs do not support alpha transparency)
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGB")
                    
                    img.thumbnail(max_size)
                    img.save(dst_path, "JPEG", quality=quality, optimize=True)
                    count += 1
                    if count % 50 == 0:
                        print(f"  Processed {count} images...")
            except Exception as e:
                print(f"  Error processing {filename}: {e}")
                errors += 1
                
    print(f"Finished! Generated: {count}, Skipped: {skipped}, Errors: {errors}")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 1. Portfolio thumbnails
    portfolio_src = os.path.join(base_dir, "assets", "portfolio")
    portfolio_dst = os.path.join(base_dir, "assets", "portfolio-thumbs")
    if os.path.exists(portfolio_src):
        generate_thumbs(portfolio_src, portfolio_dst, max_size=(400, 400), quality=75)
        
    # 2. Featured Clients thumbnails and compressed versions
    clients_src = os.path.join(base_dir, "assets", "featured-clients")
    clients_thumb_dst = os.path.join(base_dir, "assets", "featured-clients-thumbs")
    clients_comp_dst = os.path.join(base_dir, "assets", "featured-clients-compressed")
    
    if os.path.exists(clients_src):
        # Generate thumbnails (400px)
        generate_thumbs(clients_src, clients_thumb_dst, max_size=(400, 400), quality=70)
        # Generate compressed views (1200px)
        generate_thumbs(clients_src, clients_comp_dst, max_size=(1200, 1200), quality=75)
        
    print("\nAll thumbnail generation tasks completed successfully!")
