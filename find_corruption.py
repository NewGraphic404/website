import re

js_path = r'd:\شغل يوسف\website\script.js'
with open(js_path, 'r', encoding='utf-8', errors='replace') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if '' in line:
        print(f"Line {i+1}: {line.strip()}")
