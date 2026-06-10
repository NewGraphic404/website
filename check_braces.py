import json

js_path = r'd:\شغل يوسف\website\script.js'
with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Let's count braces to see if they are matched
def count_braces(text):
    open_b = text.count('{')
    close_b = text.count('}')
    return open_b, close_b

print(f"Total braces: {count_braces(js_content)}")

# Let's check if the specific function we injected has balanced braces
start_idx = js_content.find("function renderGallery(files, categoryTitle) {")
end_idx = js_content.find("function setupGalleryLightbox(allFiles, categoryTitle) {")

if start_idx != -1 and end_idx != -1:
    func_text = js_content[start_idx:end_idx]
    print(f"Function braces: {count_braces(func_text)}")
