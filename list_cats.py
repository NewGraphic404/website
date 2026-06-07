import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'd:\شغل يوسف\website\assets\portfolio-data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Try to find all name_ar
matches = re.findall(r'"([a-zA-Z0-9_]+)":\s*\{\s*"name_ar":\s*"([^"]+)"', js)
for key, ar_name in matches:
    print(f"Key: {key} -> {ar_name}")
    
# also find subdirectories of all keys
subdirs = re.findall(r'"subdirs":\s*\{([^}]+)\}', js)
print("\nSubdirs found in the file:")
for sub in subdirs:
    keys = re.findall(r'"([^"]+)":', sub)
    print(f" - {keys}")
