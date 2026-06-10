import codecs
js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

index = 135971
start = max(0, index - 200)
end = min(len(js_content), index + 200)

print(f"Context around {index}:")
print(js_content[start:end])
