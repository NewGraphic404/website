import json
import re

with open(r'd:\شغل يوسف\website\assets\portfolio-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JSON part
json_str = content.split('window.PORTFOLIO_DATA = ')[1].strip()
if json_str.endswith(';'):
    json_str = json_str[:-1]

data = json.loads(json_str)

max_files = 0
max_cat = ""

for cat_key, cat_data in data.items():
    if 'subdirs' in cat_data:
        for sub_key, sub_files in cat_data['subdirs'].items():
            if len(sub_files) > max_files:
                max_files = len(sub_files)
                max_cat = f"{cat_key} -> {sub_key}"
    elif 'files' in cat_data:
        if len(cat_data['files']) > max_files:
            max_files = len(cat_data['files'])
            max_cat = cat_key

print(f"Max files in a single category: {max_files} (in {max_cat})")
