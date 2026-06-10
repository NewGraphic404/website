import codecs

css_path = r'd:\شغل يوسف\website\styles.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css_content = f.read()

# Restore the custom cursor hide rule
css_content = css_content.replace('/* cursor: none !important; */', 'cursor: none !important;')
css_content = css_content.replace('/* cursor: none; */', 'cursor: none;')

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css_content)

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Re-enable the custom cursor JS logic
js_content = js_content.replace('// initCustomCursor(); /* disabled for performance */', 'initCustomCursor();')

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Custom cursor restored and optimized!')
