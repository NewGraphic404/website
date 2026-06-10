import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Just remove the unmatched `});` completely using a targeted regex
js_content = re.sub(r'\}\);\r?\n\r?\n/\* ================================================================\r?\n   SOCIAL PAGE', r'\r\n\r\n/* ================================================================\r\n   SOCIAL PAGE', js_content)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print("Syntax errors fixed properly!")
