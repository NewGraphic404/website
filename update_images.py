import os
import json

# Paths
base_path = r"D:\شغل يوسف\website\assets\social"
output_file = r"D:\شغل يوسف\website\assets\portfolio-images.js"

categories = ["mockups", "exhibitions", "outdoor"]
data = {}

for cat in categories:
    cat_path = os.path.join(base_path, cat)
    if os.path.exists(cat_path):
        # List all image files
        files = [f"assets/social/{cat}/{f}" for f in os.listdir(cat_path) 
                 if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
        data[cat] = files
    else:
        data[cat] = []

# Generate JS content
js_content = f"window.PORTFOLIO_IMAGES = {json.dumps(data, indent=4, ensure_ascii=False)};"

with open(output_file, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Updated {output_file} with {sum(len(v) for v in data.values())} images.")
