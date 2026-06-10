import codecs
import py_compile
import traceback

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Let's try to just use a quick regex to find unmatched braces or missing quotes
# Actually, the easiest way to find a JS syntax error in Windows without node
# is to use the Windows Script Host (cscript)
