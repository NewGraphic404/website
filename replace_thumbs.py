"""
Replace low-quality thumbnails in portfolio-thumbs with resized versions
of the original high-quality images from the sorted source directory.

Strategy:
- Walk both directory trees recursively
- Match files by name (exact match)
- For matched files: resize the original to a reasonable thumbnail size
  (max 600px on longest side, JPEG quality 80) and overwrite the thumbnail
- Report what was replaced, what was skipped, and what had no match
"""

import os
import sys
from pathlib import Path
from PIL import Image

# Configuration
SOURCE_DIR = Path(r"D:\شغل يوسف\موكب مطبوعات\مطبوعات\صور\sorted")
THUMB_DIR = Path(r"D:\شغل يوسف\website\assets\portfolio-thumbs")
PORTFOLIO_DIR = Path(r"D:\شغل يوسف\website\assets\portfolio")

MAX_THUMB_SIZE = 600  # max dimension for thumbnails (px)
THUMB_QUALITY = 80    # JPEG quality for thumbnails

MAX_PORTFOLIO_SIZE = 1200  # max dimension for portfolio full images (px)
PORTFOLIO_QUALITY = 82     # JPEG quality for portfolio full images

IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.jfif'}


def build_file_index(root_dir):
    """Build a dict mapping filename -> list of full paths for all images under root_dir."""
    index = {}
    for dirpath, dirnames, filenames in os.walk(root_dir):
        for fname in filenames:
            ext = os.path.splitext(fname)[1].lower()
            if ext in IMAGE_EXTENSIONS:
                full_path = os.path.join(dirpath, fname)
                if fname not in index:
                    index[fname] = []
                index[fname].append(full_path)
    return index


def get_relative_subdir(filepath, base_dir):
    """Get the relative subdirectory path of a file from base_dir."""
    rel = os.path.relpath(os.path.dirname(filepath), base_dir)
    return rel


def resize_and_save(source_path, dest_path, max_size, quality):
    """Resize an image to fit within max_size and save it."""
    try:
        with Image.open(source_path) as img:
            # Convert RGBA to RGB for JPEG
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Get original dimensions
            orig_w, orig_h = img.size
            
            # Calculate new dimensions maintaining aspect ratio
            if orig_w > max_size or orig_h > max_size:
                if orig_w > orig_h:
                    new_w = max_size
                    new_h = int(orig_h * (max_size / orig_w))
                else:
                    new_h = max_size
                    new_w = int(orig_w * (max_size / orig_h))
                img = img.resize((new_w, new_h), Image.LANCZOS)
            
            # Determine output format
            dest_ext = os.path.splitext(dest_path)[1].lower()
            if dest_ext == '.png':
                img.save(dest_path, 'PNG', optimize=True)
            else:
                img.save(dest_path, 'JPEG', quality=quality, optimize=True)
            
            new_size = os.path.getsize(dest_path)
            orig_size = os.path.getsize(source_path)
            return True, orig_w, orig_h, img.size[0], img.size[1], orig_size, new_size
    except Exception as e:
        return False, 0, 0, 0, 0, 0, 0, str(e)


def main():
    print("=" * 70)
    print("THUMBNAIL REPLACEMENT TOOL")
    print("=" * 70)
    
    # Build index of source (original) images
    print(f"\n📂 Scanning source directory: {SOURCE_DIR}")
    source_index = build_file_index(SOURCE_DIR)
    print(f"   Found {sum(len(v) for v in source_index.values())} images ({len(source_index)} unique names)")
    
    # Process portfolio-thumbs
    print(f"\n📂 Scanning thumbnail directory: {THUMB_DIR}")
    thumb_index = build_file_index(THUMB_DIR)
    print(f"   Found {sum(len(v) for v in thumb_index.values())} thumbnails ({len(thumb_index)} unique names)")
    
    # Process portfolio full images
    print(f"\n📂 Scanning portfolio directory: {PORTFOLIO_DIR}")
    portfolio_index = build_file_index(PORTFOLIO_DIR)
    print(f"   Found {sum(len(v) for v in portfolio_index.values())} portfolio images ({len(portfolio_index)} unique names)")
    
    replaced = 0
    skipped = 0
    no_match = 0
    errors = 0
    
    # ---- Replace thumbnails ----
    print("\n" + "=" * 70)
    print("REPLACING THUMBNAILS (portfolio-thumbs)")
    print("=" * 70)
    
    for fname, thumb_paths in sorted(thumb_index.items()):
        if fname in source_index:
            source_path = source_index[fname][0]  # Use first match
            for thumb_path in thumb_paths:
                # Check if source is actually bigger
                source_size = os.path.getsize(source_path)
                thumb_size = os.path.getsize(thumb_path)
                
                if source_size <= thumb_size:
                    print(f"  ⏭️  SKIP (source not bigger): {fname}")
                    skipped += 1
                    continue
                
                result = resize_and_save(source_path, thumb_path, MAX_THUMB_SIZE, THUMB_QUALITY)
                if result[0]:
                    _, ow, oh, nw, nh, os_size, ns_size = result
                    print(f"  ✅ {fname}")
                    print(f"     {ow}x{oh} → {nw}x{nh} | "
                          f"{os_size//1024}KB → {ns_size//1024}KB | "
                          f"was {thumb_size//1024}KB")
                    replaced += 1
                else:
                    print(f"  ❌ ERROR: {fname} - {result[-1]}")
                    errors += 1
        else:
            # Try to match with slight name differences
            # (e.g., .jpg vs .png, or similar names)
            matched = False
            fname_base = os.path.splitext(fname)[0].lower()
            for src_name, src_paths in source_index.items():
                src_base = os.path.splitext(src_name)[0].lower()
                if fname_base == src_base:
                    source_path = src_paths[0]
                    for thumb_path in thumb_paths:
                        source_size = os.path.getsize(source_path)
                        thumb_size = os.path.getsize(thumb_path)
                        
                        if source_size <= thumb_size:
                            print(f"  ⏭️  SKIP (source not bigger): {fname} ← {src_name}")
                            skipped += 1
                            continue
                        
                        result = resize_and_save(source_path, thumb_path, MAX_THUMB_SIZE, THUMB_QUALITY)
                        if result[0]:
                            _, ow, oh, nw, nh, os_size, ns_size = result
                            print(f"  ✅ {fname} ← {src_name} (fuzzy match)")
                            print(f"     {ow}x{oh} → {nw}x{nh} | "
                                  f"{os_size//1024}KB → {ns_size//1024}KB | "
                                  f"was {thumb_size//1024}KB")
                            replaced += 1
                        else:
                            print(f"  ❌ ERROR: {fname} - {result[-1]}")
                            errors += 1
                    matched = True
                    break
            
            if not matched:
                no_match += 1
    
    # ---- Replace portfolio full images ----
    print("\n" + "=" * 70)
    print("REPLACING PORTFOLIO FULL IMAGES")
    print("=" * 70)
    
    portfolio_replaced = 0
    portfolio_skipped = 0
    portfolio_no_match = 0
    portfolio_errors = 0
    
    for fname, port_paths in sorted(portfolio_index.items()):
        if fname in source_index:
            source_path = source_index[fname][0]
            for port_path in port_paths:
                source_size = os.path.getsize(source_path)
                port_size = os.path.getsize(port_path)
                
                if source_size <= port_size:
                    print(f"  ⏭️  SKIP (source not bigger): {fname}")
                    portfolio_skipped += 1
                    continue
                
                result = resize_and_save(source_path, port_path, MAX_PORTFOLIO_SIZE, PORTFOLIO_QUALITY)
                if result[0]:
                    _, ow, oh, nw, nh, os_size, ns_size = result
                    print(f"  ✅ {fname}")
                    print(f"     {ow}x{oh} → {nw}x{nh} | "
                          f"{os_size//1024}KB → {ns_size//1024}KB | "
                          f"was {port_size//1024}KB")
                    portfolio_replaced += 1
                else:
                    print(f"  ❌ ERROR: {fname} - {result[-1]}")
                    portfolio_errors += 1
        else:
            fname_base = os.path.splitext(fname)[0].lower()
            matched = False
            for src_name, src_paths in source_index.items():
                src_base = os.path.splitext(src_name)[0].lower()
                if fname_base == src_base:
                    source_path = src_paths[0]
                    for port_path in port_paths:
                        source_size = os.path.getsize(source_path)
                        port_size = os.path.getsize(port_path)
                        
                        if source_size <= port_size:
                            print(f"  ⏭️  SKIP (source not bigger): {fname} ← {src_name}")
                            portfolio_skipped += 1
                            continue
                        
                        result = resize_and_save(source_path, port_path, MAX_PORTFOLIO_SIZE, PORTFOLIO_QUALITY)
                        if result[0]:
                            _, ow, oh, nw, nh, os_size, ns_size = result
                            print(f"  ✅ {fname} ← {src_name} (fuzzy match)")
                            print(f"     {ow}x{oh} → {nw}x{nh} | "
                                  f"{os_size//1024}KB → {ns_size//1024}KB | "
                                  f"was {port_size//1024}KB")
                            portfolio_replaced += 1
                        else:
                            print(f"  ❌ ERROR: {fname} - {result[-1]}")
                            portfolio_errors += 1
                    matched = True
                    break
            
            if not matched:
                portfolio_no_match += 1
    
    # Summary
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"\n📸 Thumbnails (portfolio-thumbs):")
    print(f"   ✅ Replaced: {replaced}")
    print(f"   ⏭️  Skipped:  {skipped}")
    print(f"   ❓ No match: {no_match}")
    print(f"   ❌ Errors:   {errors}")
    print(f"\n🖼️  Portfolio full images:")
    print(f"   ✅ Replaced: {portfolio_replaced}")
    print(f"   ⏭️  Skipped:  {portfolio_skipped}")
    print(f"   ❓ No match: {portfolio_no_match}")
    print(f"   ❌ Errors:   {portfolio_errors}")


if __name__ == "__main__":
    main()
