import re

css_path = r'd:\شغل يوسف\website\styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

matches = re.finditer(r'\.custom-cursor\s*\{[^}]+\}', css_content)
for m in matches:
    print(m.group(0))
    print('---')
