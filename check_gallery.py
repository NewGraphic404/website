import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Find renderGallery boundaries
start_idx = js_content.find("socialGalleryGrid.className = 'portfolio-gallery-grid';")
if start_idx != -1:
    end_idx = js_content.find("function setupGalleryLightbox(allFiles, categoryTitle) {")
    if end_idx != -1:
        print("Found boundaries! Length to replace:", end_idx - start_idx)
    else:
        print("Could not find setupGalleryLightbox")
else:
    print("Could not find socialGalleryGrid.className")
