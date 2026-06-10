import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Add popstate listeners
js_content = js_content.replace(
    "window.addEventListener('hashchange', handleRouting);",
    "window.addEventListener('hashchange', handleRouting);\n    window.addEventListener('popstate', handleRouting);"
)
js_content = js_content.replace(
    "window.addEventListener('hashchange', handleSocialHash);",
    "window.addEventListener('hashchange', handleSocialHash);\n    window.addEventListener('popstate', handleSocialHash);"
)
js_content = js_content.replace(
    "window.addEventListener('hashchange', handleHash);",
    "window.addEventListener('hashchange', handleHash);\n    window.addEventListener('popstate', handleHash);"
)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('popstate listeners added!')
