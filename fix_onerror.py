import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Fix the infinite loop onerror bug
js_content = js_content.replace('''onerror="this.src=''"''', '''onerror="this.onerror=null; this.src=''"''')
js_content = js_content.replace('''onerror="this.src='';"''', '''onerror="this.onerror=null; this.src='';"''')

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Infinite loop onerror fixed!')
