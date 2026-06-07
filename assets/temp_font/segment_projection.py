import cv2
import numpy as np
from PIL import Image
import os

img_path = r"D:\شغل يوسف\website\assets\temp_font\S27X_generated.jpg"
pil_img = Image.open(img_path)
img = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
h, w, c = img.shape

# Convert to grayscale and invert threshold (white text on black background)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 250, 255, cv2.THRESH_BINARY_INV)

# Define Y-ranges for the alphabet rows based on visual analysis
# Row 1 (A-N): Y from 740 to 850
# Row 2 (O-Z): Y from 860 to 970
y_ranges = [
    ("row1", 740, 850, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[:14]), # A-N
    ("row2", 860, 970, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[14:])  # O-Z
]

output_dir = r"D:\شغل يوسف\website\assets\temp_font\letters"
os.makedirs(output_dir, exist_ok=True)

# For transparency, we create an RGBA version of the original image
# where white background is replaced with transparency
rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
# Make white pixels transparent (R,G,B > 248)
white_mask = (img[:, :, 0] > 248) & (img[:, :, 1] > 248) & (img[:, :, 2] > 248)
rgba[white_mask, 3] = 0

for row_name, y_start, y_end, letters in y_ranges:
    # Get the row slice from thresholded image
    row_thresh = thresh[y_start:y_end, :]
    
    # Calculate vertical projection profile (sum columns)
    profile = np.sum(row_thresh, axis=0)
    
    # Threshold the profile to find segments (where sum > some small noise threshold)
    active = profile > 200 # active columns
    
    # Find start and end of each active segment
    segments = []
    in_segment = False
    start = 0
    for x in range(w):
        if active[x] and not in_segment:
            start = x
            in_segment = True
        elif not active[x] and in_segment:
            end = x
            # Filter out very thin segments
            if end - start > 10:
                segments.append((start, end))
            in_segment = False
    if in_segment:
        segments.append((start, w))
        
    print(f"Row {row_name} (letters: {letters}) - found {len(segments)} segments.")
    
    # If the number of segments matches the number of letters, or we can adjust parameters
    # Let's crop and save them
    for idx, (x1, x2) in enumerate(segments):
        if idx < len(letters):
            letter = letters[idx]
            # Add some padding
            pad_x = 5
            x1_pad = max(0, x1 - pad_x)
            x2_pad = min(w, x2 + pad_x)
            
            # Crop the RGBA letter
            cropped = rgba[y_start:y_end, x1_pad:x2_pad]
            
            # Save the cropped letter using PIL (handles unicode paths on Windows)
            # Convert BGRA to RGBA first
            cropped_rgba = cv2.cvtColor(cropped, cv2.COLOR_BGRA2RGBA)
            pil_cropped = Image.fromarray(cropped_rgba)
            save_path = os.path.join(output_dir, f"{letter}.png")
            pil_cropped.save(save_path)
            print(f"  Saved {letter}.png: x={x1_pad}-{x2_pad}, width={x2_pad-x1_pad}")
        else:
            print(f"  Warning: Extra segment found at x={x1}-{x2}")
