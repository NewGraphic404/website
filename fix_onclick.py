import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

old_event = '''        // IMPORTANT: Event delegation on the grid container!
        if (!socialGalleryGrid.dataset.lightboxInit) {
            socialGalleryGrid.dataset.lightboxInit = 'true';
            socialGalleryGrid.addEventListener('click', (e) => {'''

new_event = '''        // IMPORTANT: Event delegation on the grid container!
        socialGalleryGrid.onclick = (e) => {'''

js_content = js_content.replace(old_event, new_event)

js_content = js_content.replace(
    "if (clickedIdx > -1) {\n                    openLightbox(clickedIdx, 0);\n                }\n            }\n        });\n        }",
    "if (clickedIdx > -1) {\n                    openLightbox(clickedIdx, 0);\n                }\n            }\n        };"
)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Event listener updated to onclick!')
