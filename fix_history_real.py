import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Insert pushState
js_content = re.sub(
    r'(// Perform ripple animation if clicked from grid card)',
    r'if (window.location.hash !== "#portfolio-" + catKey) {\n            history.pushState(null, "", "#portfolio-" + catKey);\n        }\n\n        \1',
    js_content
)

# Replace the resetSocialView() call inside backToSocial listener
js_content = re.sub(
    r'// Otherwise go back to main categories selection grid\s+resetSocialView\(\);',
    r'// Otherwise go back to main categories selection grid\n                    window.location.hash = "social-page";',
    js_content
)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('History pushState and back navigation REALLY fixed!')
