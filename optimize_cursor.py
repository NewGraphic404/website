import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Disable custom cursor completely for performance
js_content = js_content.replace("initCustomCursor();", "// initCustomCursor(); /* disabled for performance */")

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Custom cursor disabled for performance!')
