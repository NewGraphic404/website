import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Fix clientsLink
js_content = re.sub(
    r'(clientsLink\.addEventListener\(\'click\', \(e\) => \{\s*e\.preventDefault\(\);\s*)window\.HashTracker\.goBack\("clients"\);(\s*\}\);)',
    r'\1window.location.hash = "clients";\2',
    js_content
)

# Fix navIdentity
js_content = re.sub(
    r'(navIdentity\.addEventListener\(\'click\', \(e\) => \{\s*e\.preventDefault\(\);\s*)window\.HashTracker\.goBack\("identity"\);(\s*\}\);)',
    r'\1window.location.hash = "identity";\2',
    js_content
)

# Fix mobileNavIdentity
js_content = re.sub(
    r'(setTimeout\(\(\) => \{\s*)window\.HashTracker\.goBack\("identity"\);(\s*\}, 300\);\s*\}\);)',
    r'\1window.location.hash = "identity";\2',
    js_content
)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Accidental navigation regressions fixed!')
