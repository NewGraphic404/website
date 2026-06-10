import codecs
import re

html_path = r'd:\شغل يوسف\website\index.html'
with codecs.open(html_path, 'r', 'utf-8') as f:
    html_content = f.read()

# Bump version to 1.3.7
html_content = re.sub(r'v=1\.3\.6', 'v=1.3.7', html_content)

with codecs.open(html_path, 'w', 'utf-8') as f:
    f.write(html_content)

print('Cache buster bumped to v=1.3.7 in index.html!')
