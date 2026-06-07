import cv2
import numpy as np
from PIL import Image

img_path = r"D:\شغل يوسف\website\assets\temp_font\S27X_generated.jpg"
pil_img = Image.open(img_path)
img = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

# HSV threshold for dark parts
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
lower_dark = np.array([0, 0, 0])
upper_dark = np.array([180, 255, 110]) # Let's capture dark gray as well
dark_mask = cv2.inRange(hsv, lower_dark, upper_dark)

# Find contours on dark mask
contours, _ = cv2.findContours(dark_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

boxes = []
for ctr in contours:
    x, y, bw, bh = cv2.boundingRect(ctr)
    # Filter out very small noise (smaller than 10x10)
    if bw > 10 and bh > 10:
        boxes.append([x, y, bw, bh])

print(f"Found {len(boxes)} dark bounding boxes.")

# Draw boxes on the original image
vis_img = img.copy()
for idx, box in enumerate(boxes):
    x, y, bw, bh = box
    cv2.rectangle(vis_img, (x, y), (x+bw, y+bh), (0, 255, 0), 2)
    cv2.putText(vis_img, str(idx), (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

cv2.imwrite(r"D:\شغل يوسف\website\assets\temp_font\dark_boxes.jpg", vis_img)
print("Saved dark_boxes.jpg")
