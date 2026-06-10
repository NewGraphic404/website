import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

js_content = js_content.replace('''onerror="this.src='${path}'"''', '''onerror="this.onerror=null; this.src='${path}'"''')
js_content = js_content.replace('''onerror="this.src='${file}'; console.error('Failed to load thumbnail:', '${thumbSrc}');"''', '''onerror="this.onerror=null; this.src='${file}';"''')

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('onerror fixed!')
