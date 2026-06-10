import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    lines = f.readlines()

new_lines = []
skip_next = False
for i, line in enumerate(lines):
    # Fix the literal backslashes
    if r"ripple.style.opacity = \'0\';" in line:
        line = line.replace(r"\'0\'", "'0'")

    # Remove the stray DOMContentLoaded at 2627
    if "document.addEventListener('DOMContentLoaded', () => {" in line and i > 100:
        continue # Just skip this line entirely
    
    new_lines.append(line)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.writelines(new_lines)

print("Syntax errors fixed!")
