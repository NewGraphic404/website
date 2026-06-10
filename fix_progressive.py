import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Fix progressive loading URL encoding bug
old_code = '''                if (thumbSrc !== src) {
                    const highRes = new Image();
                    highRes.onload = () => { if (el.src.includes(thumbSrc)) el.src = src; };
                    highRes.src = src;
                }'''

new_code = '''                if (thumbSrc !== src) {
                    const highRes = new Image();
                    highRes.onload = () => { el.src = src; };
                    highRes.src = src;
                }'''

js_content = js_content.replace(old_code, new_code)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Progressive loading fixed!')
