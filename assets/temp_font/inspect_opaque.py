from PIL import Image
import numpy as np

img_path = r"D:\شغل يوسف\website\assets\logo.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)
h, w, c = data.shape
print(f"Logo shape: {w}x{h}")

pixels = data.reshape(-1, 4)
opaque = pixels[pixels[:, 3] > 200]
print(f"Total opaque pixels (alpha > 200): {len(opaque)}")

# Let's count unique RGB values in opaque pixels to see what colors dominate
from collections import Counter
colors = [tuple(p[:3]) for p in opaque]
c_counter = Counter(colors)
print("Top 15 most common opaque colors (R, G, B) and their counts:")
for color, count in c_counter.most_common(15):
    print(f"  {color}: {count}")
