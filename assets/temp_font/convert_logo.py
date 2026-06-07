import cv2
import numpy as np
from PIL import Image
import os

img_path = r"D:\شغل يوسف\website\assets\logo.png"
pil_img = Image.open(img_path).convert("RGBA")
img_array = np.array(pil_img)

# Convert to OpenCV BGR for color space conversions
# Convert RGBA to BGR
bgr = cv2.cvtColor(img_array, cv2.COLOR_RGBA2BGR)
# Convert BGR to HSV
hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)

# Define HSV range for purple
# H is in [0, 180] in OpenCV. Purple is around 125-165.
# Saturation (S) > 30 to avoid gray/white.
# Value (V) > 30 to avoid black.
lower_purple = np.array([120, 30, 30])
upper_purple = np.array([168, 255, 255])

purple_mask = cv2.inRange(hsv, lower_purple, upper_purple)

# Create a copy of the original image array
output_array = img_array.copy()

# For any pixel matching the purple mask, change its RGB to white (255, 255, 255)
# Keep the original alpha channel (output_array[:, :, 3])
output_array[purple_mask > 0, 0] = 255 # R
output_array[purple_mask > 0, 1] = 255 # G
output_array[purple_mask > 0, 2] = 255 # B

# Let's save the resulting image
output_pil = Image.fromarray(output_array)
output_path = r"D:\شغل يوسف\website\assets\logo_white.png"
output_pil.save(output_path)

print(f"Saved white logo to: {output_path}")

# Let's also check if we can convert the mobile menu/other logos if needed
# We will just use logo_white.png where appropriate
