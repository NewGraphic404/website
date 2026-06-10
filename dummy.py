import codecs
import json
import urllib.request

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Let's search for "SyntaxError" in node by compiling it via python using a quick node command trick... wait we don't have node
# Let's use Python's built in tools. I'll just save it and use Edge to run it or something?
# No, let's just dump the last 5 replacements to a file and read them.
