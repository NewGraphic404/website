import cv2
import numpy as np
from PIL import Image

img_path = r"D:\شغل يوسف\website\assets\temp_font\S27X_generated.jpg"
pil_img = Image.open(img_path)
img = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
lower_dark = np.array([0, 0, 0])
upper_dark = np.array([180, 255, 110])
dark_mask = cv2.inRange(hsv, lower_dark, upper_dark)

contours, _ = cv2.findContours(dark_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

boxes = []
for ctr in contours:
    x, y, bw, bh = cv2.boundingRect(ctr)
    if bw > 10 and bh > 10:
        boxes.append([x, y, bw, bh])

# Sort boxes by Y-center
boxes.sort(key=lambda b: b[1] + b[3]/2)

# Group into rows
rows = []
tolerance = 50 # vertical pixels tolerance to be in same row
current_row = []
prev_y_center = -1

for box in boxes:
    y_center = box[1] + box[3]/2
    if prev_y_center == -1 or abs(y_center - prev_y_center) < tolerance:
        current_row.append(box)
    else:
        rows.append(current_row)
        current_row = [box]
    prev_y_center = y_center
if current_row:
    rows.append(current_row)

print(f"Grouped into {len(rows)} rows:")
for r_idx, row in enumerate(rows):
    row.sort(key=lambda b: b[0]) # sort horizontally
    y_centers = [b[1] + b[3]/2 for b in row]
    avg_y = sum(y_centers)/len(y_centers) if y_centers else 0
    print(f"Row {r_idx} (Avg Y: {avg_y:.1f}): {len(row)} elements")
    for e_idx, box in enumerate(row):
        print(f"  El {e_idx}: x={box[0]}, y={box[1]}, w={box[2]}, h={box[3]}")
