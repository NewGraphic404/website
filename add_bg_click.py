import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Add background click listener
js_content = js_content.replace(
    "const closeBtn = lb.querySelector('.gallery-lightbox-close');",
    "const bgLayer = lb.querySelector('.gallery-lightbox-bg');\n        if (bgLayer) bgLayer.addEventListener('click', closeLightbox);\n        const closeBtn = lb.querySelector('.gallery-lightbox-close');"
)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Background click listener added!')
