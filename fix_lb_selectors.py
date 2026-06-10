import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Fix the querySelectors
js_content = js_content.replace("lb.querySelector('.lightbox-prev')", "lb.querySelector('.gallery-lightbox-arrow--prev')")
js_content = js_content.replace("lb.querySelector('.lightbox-next')", "lb.querySelector('.gallery-lightbox-arrow--next')")
js_content = js_content.replace("lb.querySelector('.lightbox-close')", "lb.querySelector('.gallery-lightbox-close')")

# Add the bgLayer click event
if 'bgLayer.addEventListener' not in js_content:
    js_content = js_content.replace(
        "const closeBtn = lb.querySelector('.gallery-lightbox-close');",
        "const bgLayer = lb.querySelector('.gallery-lightbox-bg');\n        if (bgLayer) bgLayer.addEventListener('click', closeLightbox);\n        const closeBtn = lb.querySelector('.gallery-lightbox-close');"
    )

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Lightbox query selectors and click listeners fixed!')
