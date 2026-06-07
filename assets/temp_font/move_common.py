import os
import shutil
from pathlib import Path

base_dir = Path(r"D:\شغل يوسف\موكب مطبوعات\مطبوعات\صور\sorted")
common_folders = ["اعلام", "بانارات", "كراسات"]

for folder in common_folders:
    src_dir = base_dir / "giveaway" / folder
    dest_dir = base_dir / "مطبوعات" / folder
    
    if not src_dir.exists():
        print(f"Source folder {src_dir} does not exist. Skipping.")
        continue
        
    dest_dir.mkdir(parents=True, exist_ok=True)
    
    # List all files in the source folder
    files = [f for f in src_dir.iterdir() if f.is_file()]
    print(f"Moving {len(files)} files from {src_dir.name} to {dest_dir.parent.name}/{dest_dir.name}:")
    
    for f in files:
        target_path = dest_dir / f.name
        # Handle naming collisions
        if target_path.exists():
            stem = f.stem
            suffix = f.suffix
            counter = 1
            while target_path.exists():
                target_path = dest_dir / f"{stem}_{counter}{suffix}"
                counter += 1
        
        # Move the file
        try:
            shutil.move(str(f), str(target_path))
            print(f"  Moved: {f.name} -> {target_path.name}")
        except Exception as e:
            print(f"  Error moving {f.name}: {e}")
            
    # Remove the source folder if it's empty
    try:
        if src_dir.exists() and not any(src_dir.iterdir()):
            src_dir.rmdir()
            print(f"Removed empty source folder: {src_dir}")
        else:
            print(f"Source folder {src_dir} is not empty or cannot be removed.")
    except Exception as e:
        print(f"Error removing folder {src_dir}: {e}")

print("\nMove operation completed successfully!")
