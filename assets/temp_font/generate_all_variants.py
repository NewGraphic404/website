import cv2
import numpy as np
from PIL import Image
import os

img_path = r"D:\شغل يوسف\website\assets\temp_font\S27X_generated.jpg"
pil_img = Image.open(img_path)
img = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
h, w, c = img.shape

# Grayscale and threshold for segment coordinates
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 250, 255, cv2.THRESH_BINARY_INV)

# Hardcoded segment coords from our previous successful run
row1_coords = [
    (424, 509), (511, 575), (591, 666), (680, 751), (763, 824),
    (834, 904), (910, 989), (996, 1076), (1091, 1135), (1139, 1197),
    (1208, 1280), (1289, 1351), (1364, 1444), (1463, 1536)
]
row2_coords = [
    (491, 569), (584, 648), (663, 748), (757, 824), (836, 897),
    (900, 979), (988, 1056), (1072, 1148), (1154, 1249), (1258, 1338),
    (1339, 1406), (1412, 1489)
]

letters_map = {}
row1_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[:14] # A-N
row2_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[14:]  # O-Z

# Create transparency masks
# Make white pixels transparent (R,G,B > 245)
white_mask = (img[:, :, 0] > 245) & (img[:, :, 1] > 245) & (img[:, :, 2] > 245)

# Detect dark/black letter bodies
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
v_channel = hsv[:, :, 2]
s_channel = hsv[:, :, 1]
# Letter body pixels: dark (low value) and low saturation (gray/black)
dark_body_mask = (v_channel < 130) & (s_channel < 100) & (~white_mask)

# Version A: Original Black (keep dark pixels black)
rgba_black = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
rgba_black[white_mask, 3] = 0

# Version B: Premium White/Silver (convert dark pixels to white)
rgba_white = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
rgba_white[white_mask, 3] = 0
rgba_white[dark_body_mask, 0] = 255 # Blue
rgba_white[dark_body_mask, 1] = 255 # Green
rgba_white[dark_body_mask, 2] = 255 # Red

# Extract letters for both versions
letters_black = {}
letters_white = {}

# Row 1 (A-N): Y from 740 to 850
y_start1, y_end1 = 740, 850
for idx, letter in enumerate(row1_letters):
    x1, x2 = row1_coords[idx]
    
    crop_b = rgba_black[y_start1:y_end1, x1:x2]
    crop_w = rgba_white[y_start1:y_end1, x1:x2]
    
    # Convert BGRA to RGBA for PIL
    letters_black[letter] = Image.fromarray(cv2.cvtColor(crop_b, cv2.COLOR_BGRA2RGBA))
    letters_white[letter] = Image.fromarray(cv2.cvtColor(crop_w, cv2.COLOR_BGRA2RGBA))

# Row 2 (O-Z): Y from 860 to 970
y_start2, y_end2 = 860, 970
for idx, letter in enumerate(row2_letters):
    x1, x2 = row2_coords[idx]
    
    crop_b = rgba_black[y_start2:y_end2, x1:x2]
    crop_w = rgba_white[y_start2:y_end2, x1:x2]
    
    letters_black[letter] = Image.fromarray(cv2.cvtColor(crop_b, cv2.COLOR_BGRA2RGBA))
    letters_white[letter] = Image.fromarray(cv2.cvtColor(crop_w, cv2.COLOR_BGRA2RGBA))

# Function to stitch letters
def get_letter_img(char, variant_dict):
    if char == " ":
        return Image.new("RGBA", (35, 110), (0, 0, 0, 0))
    char = char.upper()
    return variant_dict.get(char, Image.new("RGBA", (20, 110), (0, 0, 0, 0)))

def stitch_text(text, variant_dict, spacing=-8):
    imgs = [get_letter_img(c, variant_dict) for c in text]
    total_width = 0
    height = 110
    
    for i, img_let in enumerate(imgs):
        w_let, h_let = img_let.size
        if i == 0:
            total_width += w_let
        else:
            total_width += w_let + spacing
            
    result = Image.new("RGBA", (total_width, height), (0, 0, 0, 0))
    current_x = 0
    for i, img_let in enumerate(imgs):
        w_let, h_let = img_let.size
        result.alpha_composite(img_let, (current_x, 0))
        current_x += w_let + spacing
        
    return result

output_dir = r"D:\شغل يوسف\website\assets"

# Generate Black Stitched Text
stitch_text("NEW GRAPHIC", letters_black).save(os.path.join(output_dir, "new_graphic_line1_black.png"))
stitch_text("FROM IDEA TO", letters_black).save(os.path.join(output_dir, "new_graphic_line2_black.png"))
stitch_text("IMPACT", letters_black).save(os.path.join(output_dir, "new_graphic_line3_black.png"))

# Generate White Stitched Text
stitch_text("NEW GRAPHIC", letters_white).save(os.path.join(output_dir, "new_graphic_line1_white.png"))
stitch_text("FROM IDEA TO", letters_white).save(os.path.join(output_dir, "new_graphic_line2_white.png"))
stitch_text("IMPACT", letters_white).save(os.path.join(output_dir, "new_graphic_line3_white.png"))

print("All variants generated successfully!")
