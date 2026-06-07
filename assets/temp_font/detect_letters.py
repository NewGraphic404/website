import cv2
import numpy as np
from PIL import Image

# Load the image using PIL (handles unicode paths on Windows)
img_path = r"D:\شغل يوسف\website\assets\temp_font\S27X_generated.jpg"
pil_img = Image.open(img_path)
img = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
h, w, c = img.shape
print(f"Loaded image size: {w}x{h}")

# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Threshold to get mask (background is white, so we look for non-white pixels)
# Anything darker than 250 is letter
_, thresh = cv2.threshold(gray, 250, 255, cv2.THRESH_BINARY_INV)

# Find contours
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Get bounding boxes
boxes = []
for ctr in contours:
    x, y, bw, bh = cv2.boundingRect(ctr)
    # Filter out very small noise
    if bw > 5 and bh > 5:
        boxes.append([x, y, bw, bh])

print(f"Found {len(boxes)} initial bounding boxes.")

# Function to check if box1 and box2 overlap or are very close (within distance D)
def boxes_close(box1, box2):
    x1, y1, w1, h1 = box1
    x2, y2, w2, h2 = box2
    
    # Calculate horizontal overlap
    x_overlap = max(0, min(x1 + w1, x2 + w2) - max(x1, x2))
    # Calculate vertical gap
    vert_gap = max(0, y2 - (y1 + h1)) if y2 > y1 else max(0, y1 - (y2 + h2))
    
    # If they overlap horizontally (meaning one is above/below the other, like a letter and its swoosh)
    # and their vertical gap is small
    if x_overlap > 5 and vert_gap < 50:
        return True
        
    # Also if they are extremely close horizontally and have vertical overlap/closeness
    horiz_gap = max(0, x2 - (x1 + w1)) if x2 > x1 else max(0, x1 - (x2 + w2))
    y_overlap = max(0, min(y1 + h1, y2 + h2) - max(y1, y2))
    
    if horiz_gap < 5 and vert_gap < 15:
        return True
        
    return False

# Group bounding boxes that are close to each other
merged = True
while merged:
    merged = False
    new_boxes = []
    used = set()
    for i in range(len(boxes)):
        if i in used:
            continue
        curr = boxes[i]
        for j in range(i + 1, len(boxes)):
            if j in used:
                continue
            if boxes_close(curr, boxes[j]):
                # Merge curr and boxes[j]
                x1, y1, w1, h1 = curr
                x2, y2, w2, h2 = boxes[j]
                nx = min(x1, x2)
                ny = min(y1, y2)
                nw = max(x1 + w1, x2 + w2) - nx
                nh = max(y1 + h1, y2 + h2) - ny
                curr = [nx, ny, nw, nh]
                used.add(j)
                merged = True
        new_boxes.append(curr)
        used.add(i)
    boxes = new_boxes

print(f"After merging close components, found {len(boxes)} bounding boxes.")

# Draw bounding boxes and numbers on a copy of the image to visualize
vis_img = img.copy()
for idx, box in enumerate(boxes):
    x, y, bw, bh = box
    cv2.rectangle(vis_img, (x, y), (x+bw, y+bh), (0, 0, 255), 2)
    cv2.putText(vis_img, str(idx), (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)

cv2.imwrite(r"D:\شغل يوسف\website\assets\temp_font\detected_boxes.jpg", vis_img)
print("Saved detected_boxes.jpg for visualization.")

# Sort boxes by y coordinate first to find rows, then by x coordinate
# We can group boxes into rows based on y coordinate tolerance
rows = []
sorted_boxes = sorted(boxes, key=lambda b: b[1]) # sort by Y

current_row = []
prev_y = -1
for box in sorted_boxes:
    x, y, bw, bh = box
    if prev_y == -1 or (y - prev_y) < 80: # If y is close to previous y, it's in the same row
        current_row.append(box)
    else:
        rows.append(current_row)
        current_row = [box]
    prev_y = y
if current_row:
    rows.append(current_row)

print(f"Detected {len(rows)} rows.")
for r_idx, row in enumerate(rows):
    # Sort each row by X coordinate
    row.sort(key=lambda b: b[0])
    print(f"Row {r_idx}: {len(row)} elements. Y-centers: {[b[1] + b[3]/2 for b in row[:3]]}")
    for e_idx, box in enumerate(row):
        print(f"  El {e_idx}: x={box[0]}, y={box[1]}, w={box[2]}, h={box[3]}")
