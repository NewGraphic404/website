import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# I will find the start of setupGalleryLightboxGlobals and replace it.
# The function ends right before // 7. Initialize Social Grid Items or something similar.
# Let's find exactly where it ends.

pattern = r'function setupGalleryLightboxGlobals\(allFiles, categoryTitle\) \{.*?(?=\s+// 7\.|\s+function closeLightbox|\s+if \(window\.lbKeydownHandler\))'
# Wait, let's just replace the exact innerHTML and class additions!

old_html = '''        const lb = document.createElement('div');
        lb.className = 'gallery-lightbox';
        lb.innerHTML = 
            <div class="lightbox-close" style="z-index: 10002;">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <div class="lightbox-title"></div>
            <div class="lightbox-prev" style="z-index: 10002;"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></div>
            <div class="lightbox-next" style="z-index: 10002;"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
        ;'''

new_html = '''        const lb = document.createElement('div');
        lb.className = 'gallery-lightbox';
        lb.innerHTML = 
            <div class="gallery-lightbox-bg"></div>
            <div class="gallery-lightbox-close">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); color: white; font-size: 1.2rem; font-weight: bold; z-index: 10002; pointer-events: none; text-shadow: 0 2px 10px rgba(0,0,0,0.5);"></div>
            <button class="gallery-lightbox-arrow gallery-lightbox-arrow--prev"></button>
            <button class="gallery-lightbox-arrow gallery-lightbox-arrow--next"></button>
        ;'''

js_content = js_content.replace(old_html, new_html)

js_content = js_content.replace("lb.querySelector('.lightbox-prev')", "lb.querySelector('.gallery-lightbox-arrow--prev')")
js_content = js_content.replace("lb.querySelector('.lightbox-next')", "lb.querySelector('.gallery-lightbox-arrow--next')")
js_content = js_content.replace("lb.querySelector('.lightbox-close')", "lb.querySelector('.gallery-lightbox-close')")

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Lightbox HTML and classes fixed!')
