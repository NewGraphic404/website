import json, re

with open(r'd:\شغل يوسف\website\assets\portfolio-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the JSON object from the JS assignment
match = re.search(r'window\.PORTFOLIO_DATA\s*=\s*(\{.*\})\s*;', content, re.DOTALL)
if match:
    json_str = match.group(1)
    # Fix any trailing commas (common JS->JSON issue)
    json_str = re.sub(r',\s*}', '}', json_str)
    json_str = re.sub(r',\s*\]', ']', json_str)
    try:
        data = json.loads(json_str)
        print("Valid JSON!")
        print("Top-level keys:", list(data.keys()))
        for key in data:
            d = data[key]
            if d.get('has_subdirs'):
                subdirs = list(d.get('subdirs', {}).keys())
                total = sum(len(d['subdirs'][s]) for s in subdirs)
                print(f"  {key}: {len(subdirs)} subdirs, {total} total files")
            else:
                print(f"  {key}: {len(d.get('files', []))} files")
    except json.JSONDecodeError as e:
        print(f"JSON Error: {e}")
        # Find problematic area
        pos = e.pos if hasattr(e, 'pos') else 0
        print(f"Around position {pos}:")
        print(json_str[max(0,pos-100):pos+100])
else:
    print("Could not find PORTFOLIO_DATA in file")
