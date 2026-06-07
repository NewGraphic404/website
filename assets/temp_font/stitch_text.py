import os
import cv2
import numpy as np
from PIL import Image

letters_dir = r"D:\شغل يوسف\website\assets\temp_font\letters"
output_dir = r"D:\شغل يوسف\website\assets"

def get_letter_img(char):
    if char == " ":
        # Return transparent spacer
        return Image.new("RGBA", (35, 110), (0, 0, 0, 0))
    
    char = char.upper()
    path = os.path.join(letters_dir, f"{char}.png")
    if os.path.exists(path):
        return Image.open(path).convert("RGBA")
    else:
        print(f"Warning: Letter '{char}' not found.")
        return Image.new("RGBA", (20, 110), (0, 0, 0, 0))

def create_text_image(text, spacing=-8):
    # Load all images
    imgs = [get_letter_img(c) for c in text]
    
    # Calculate total width with overlap/spacing
    # If spacing is negative, letters will overlap
    total_width = 0
    height = 110
    
    for i, img in enumerate(imgs):
        w, h = img.size
        if i == 0:
            total_width += w
        else:
            total_width += w + spacing
            
    # Create final transparent image
    result = Image.new("RGBA", (total_width, height), (0, 0, 0, 0))
    
    current_x = 0
    for i, img in enumerate(imgs):
        w, h = img.size
        # Paste with alpha channel to allow overlapping
        result.alpha_composite(img, (current_x, 0))
        current_x += w + spacing
        
    return result

# Create the three lines
line1 = create_text_image("NEW GRAPHIC", spacing=-8)
line2 = create_text_image("FROM IDEA TO", spacing=-8)
line3 = create_text_image("IMPACT", spacing=-8)

# Save the lines
line1.save(os.path.join(output_dir, "new_graphic_line1.png"))
line2.save(os.path.join(output_dir, "new_graphic_line2.png"))
line3.save(os.path.join(output_dir, "new_graphic_line3.png"))

print("Successfully stitched and saved the three text images!")
