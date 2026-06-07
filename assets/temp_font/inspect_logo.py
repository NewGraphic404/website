from PIL import Image
import numpy as np

img_path = r"D:\شغل يوسف\website\assets\logo.png"
img = Image.open(img_path).convert("RGBA")
data = np.array(img)
h, w, c = data.shape
print(f"Logo shape: {w}x{h}")

# Let's count the unique colors or check color channels
# Purple colors generally have high Blue and Red, low Green.
# Orange colors have high Red, medium Green, low Blue.
# Let's inspect some non-transparent pixels
pixels = data.reshape(-1, 4)
non_transparent = pixels[pixels[:, 3] > 0]
print(f"Total non-transparent pixels: {len(non_transparent)}")

# Let's sample some pixels to find the purple range
# Purple: R > 80, G < 80, B > 100 or similar
purple_samples = []
orange_samples = []
for p in non_transparent:
    r, g, b, a = p[:4]
    # Simple heuristic to identify purple and orange
    if b > r and b > 100 and g < 120:
        purple_samples.append((r,g,b,a))
    elif r > b and r > 150 and g > 50:
        orange_samples.append((r,g,b,a))

print(f"Sampled purple pixels count: {len(purple_samples)}")
if purple_samples:
    print("Purple sample:", purple_samples[0])
print(f"Sampled orange pixels count: {len(orange_samples)}")
if orange_samples:
    print("Orange sample:", orange_samples[0])
