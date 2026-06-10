import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

js_content = js_content.replace(
    "lb.className = 'gallery-lightbox gallery-lightbox-global';",
    "lb.className = 'gallery-lightbox gallery-lightbox-global';\n            lb.style.display = 'none';"
)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Hide by default added!')
