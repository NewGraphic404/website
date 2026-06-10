import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

if "});\r\n\r\n/* ================================================================\r\n   SOCIAL PAGE" in js_content:
    print("Found with CRLF")
elif "});\n\n/* ================================================================\n   SOCIAL PAGE" in js_content:
    print("Found with LF")
else:
    print("Not found!")
