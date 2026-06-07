import os
import sys
import subprocess
from PIL import Image, ImageOps
import re

# Ensure utf-8 output for console
sys.stdout.reconfigure(encoding='utf-8')

# We can rely on imageio-ffmpeg since we installed it in the workspace environment
try:
    import imageio_ffmpeg
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
except ImportError:
    print("Error: imageio_ffmpeg is not installed. Please run 'pip install imageio-ffmpeg'")
    input("Press Enter to exit...")
    sys.exit(1)

def format_size(size_bytes):
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.2f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.2f} GB"

def update_code_references(old_path, new_path):
    # This will search for the old filename and replace it with new filename in portfolio-data.js
    # We'll just replace the extension for that specific file.
    data_file = r"d:\شغل يوسف\website\assets\portfolio-data.js"
    if os.path.exists(data_file):
        with open(data_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # To be safe, we just replace .mov with .mp4 case insensitively but since we might 
        # not know if it's already there, we just do a global replace of .mov to .mp4
        new_content = re.sub(r'\.mov\b', '.mp4', content, flags=re.IGNORECASE)
        
        if new_content != content:
            with open(data_file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Updated portfolio-data.js with new .mp4 extensions.")

def main():
    print("========================================")
    print("الضاغط الآلي لملفات الموقع - V1.0")
    print("========================================")
    
    assets_dir = r"d:\شغل يوسف\website\assets\portfolio"
    
    compressed_images = 0
    compressed_videos = 0
    
    for root, _, files in os.walk(assets_dir):
        for file in files:
            file_lower = file.lower()
            file_path = os.path.join(root, file)
            
            try:
                original_size = os.path.getsize(file_path)
                
                # 1. Image Optimization
                if file_lower.endswith(('.jpg', '.jpeg', '.png')):
                    # Check if it needs compression (e.g. > 800 KB)
                    if original_size > 800 * 1024:
                        print(f"Compressing Image: {file} ({format_size(original_size)})...")
                        with Image.open(file_path) as img:
                            # Preserve transparency for PNGs
                            if file_lower.endswith('.png'):
                                if img.mode in ("P", "LA", "L", "1"):
                                    img = img.convert("RGBA")
                            else:
                                if img.mode in ("RGBA", "P"):
                                    img = img.convert("RGB")
                                    
                            img = ImageOps.exif_transpose(img)
                            
                            max_width = 1920
                            if img.width > max_width:
                                ratio = max_width / float(img.width)
                                new_height = int((float(img.height) * float(ratio)))
                                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                                
                            save_format = 'PNG' if file_lower.endswith('.png') else 'JPEG'
                            img.save(file_path, save_format, quality=80, optimize=True)
                            
                        new_size = os.path.getsize(file_path)
                        print(f" -> Success: {format_size(new_size)}")
                        compressed_images += 1

                # 2. Video Optimization
                elif file_lower.endswith(('.mov', '.mp4')):
                    # Convert MOV to MP4, or compress MP4 if > 15 MB
                    is_mov = file_lower.endswith('.mov')
                    if is_mov or original_size > 15 * 1024 * 1024:
                        base, _ = os.path.splitext(file_path)
                        out_path = base + "_compressed.mp4"
                        
                        print(f"Compressing Video: {file} ({format_size(original_size)})...")
                        
                        cmd = [
                            ffmpeg_exe, '-y', '-i', file_path,
                            '-vcodec', 'libx264', '-crf', '28', '-preset', 'fast',
                            '-acodec', 'aac', '-b:a', '128k', '-movflags', '+faststart',
                            out_path
                        ]
                        
                        result = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
                        
                        if result.returncode == 0:
                            new_size = os.path.getsize(out_path)
                            print(f" -> Success: {format_size(new_size)}")
                            
                            os.remove(file_path) # Delete original
                            final_path = base + ".mp4"
                            
                            if os.path.exists(final_path) and file_path != final_path:
                                os.remove(final_path)
                                
                            os.rename(out_path, final_path)
                            
                            if is_mov:
                                update_code_references(file, os.path.basename(final_path))
                                
                            compressed_videos += 1
                        else:
                            print(f" -> Error compressing video: {file}")
                            if os.path.exists(out_path):
                                os.remove(out_path)

            except Exception as e:
                print(f"Error processing {file}: {e}")

    print("\n========================================")
    print("النتيجة النهائية:")
    print(f"عدد الصور التي تم ضغطها: {compressed_images}")
    print(f"عدد الفيديوهات التي تم ضغطها: {compressed_videos}")
    print("========================================")

if __name__ == "__main__":
    main()
