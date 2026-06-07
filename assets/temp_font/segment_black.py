import cv2
import numpy as np
from PIL import Image

img_path = r"D:\شغل يوسف\website\assets\temp_font\S27X_generated.jpg"
pil_img = Image.open(img_path)
img = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

# Convert to HSV color space
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Define black/dark gray threshold (low value/brightness)
# In HSV, Value (V) represents brightness. Dark gray/black will have low V.
# Let's check V < 80.
lower_dark = np.array([0, 0, 0])
upper_dark = np.array([180, 255, 100])

dark_mask = cv2.inRange(hsv, lower_dark, upper_dark)

# Save dark mask to see if letters are separated
cv2.imwrite(r"D:\شغل يوسف\website\assets\temp_font\dark_mask.png", dark_mask)
print("Saved dark_mask.png")
