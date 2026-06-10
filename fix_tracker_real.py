import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Replace pushState with window.location.hash
js_content = re.sub(
    r'if\s*\(\s*window\.location\.hash\s*!==\s*"#portfolio-"\s*\+\s*catKey\s*\)\s*\{\s*history\.pushState\(null,\s*"",\s*"#portfolio-"\s*\+\s*catKey\);\s*\}\s*// Perform ripple animation if clicked from grid card\s*if\s*\(\s*cardElement\s*&&\s*!socialPage\.classList\.contains\(\'expanding\'\)\s*\)\s*\{',
    r'// Perform ripple animation if clicked from grid card\n        if (cardElement && !socialPage.classList.contains(\'expanding\')) {\n            window.isAnimatingRipple = true;\n            window.location.hash = "#portfolio-" + catKey;',
    js_content
)

# Replace timeout inside ripple
js_content = re.sub(
    r'setTimeout\(\(\)\s*=>\s*\{\s*showCategoryDetails\(catKey\);\s*ripple\.style\.opacity\s*=\s*\'0\';\s*setTimeout\(\(\)\s*=>\s*\{\s*ripple\.remove\(\);\s*socialPage\.classList\.remove\(\'expanding\'\);\s*\},\s*400\);\s*\},\s*750\);',
    r'setTimeout(() => {\n                    window.isAnimatingRipple = false;\n                    showCategoryDetails(catKey);\n                    ripple.style.opacity = \'0\';\n                    setTimeout(() => {\n                        ripple.remove();\n                        socialPage.classList.remove(\'expanding\');\n                    }, 400);\n                }, 750);',
    js_content
)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Replaced correctly!')
