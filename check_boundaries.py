import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

start_idx = js_content.find("function renderGallery(files, categoryTitle) {")
end_idx = js_content.find("    // 7. Identity Page Functions")

if start_idx != -1 and end_idx != -1:
    print("Found boundaries!")
else:
    print("Could not find boundaries")
