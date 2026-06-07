import os

src = r'D:\شغل يوسف\موكب مطبوعات\social'
photo_exts = {'.jpg', '.jpeg', '.png', '.webp'}
video_exts = {'.mp4', '.mov'}

photos = []
videos = []
ignored = []

for f in os.listdir(src):
    full = os.path.join(src, f)
    if os.path.isdir(full):
        ignored.append(f)
        continue
    ext = os.path.splitext(f)[1].lower()
    if ext in photo_exts:
        photos.append(f)
    elif ext in video_exts:
        videos.append(f)
    elif f == 'social.rar':
        ignored.append(f)
    else:
        print(f"Unknown ext: {f}")

print(f"Photos: {len(photos)}")
print(f"Videos: {len(videos)}")
print(f"Total media: {len(photos) + len(videos)}")
print(f"Ignored: {ignored}")
