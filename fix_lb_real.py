import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

pattern = r'lb\.innerHTML\s*=\s*[\s\S]*?;'

new_html = '''lb.innerHTML = 
            <div class="gallery-lightbox-bg"></div>
            <div class="gallery-lightbox-close">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); color: white; font-size: 1.2rem; font-weight: bold; z-index: 10002; pointer-events: none; text-shadow: 0 2px 10px rgba(0,0,0,0.5);"></div>
            <button class="gallery-lightbox-arrow gallery-lightbox-arrow--prev"></button>
            <button class="gallery-lightbox-arrow gallery-lightbox-arrow--next"></button>
        ;'''

# Only replace the FIRST occurrence in setupGalleryLightboxGlobals!
# But wait, there is only ONE lb.innerHTML = ...; in the file? Let's be safe.
# Find setupGalleryLightboxGlobals and replace inside it.

start_idx = js_content.find('function setupGalleryLightboxGlobals')
if start_idx != -1:
    end_idx = js_content.find('document.body.appendChild(lb);', start_idx)
    sub_content = js_content[start_idx:end_idx]
    sub_content = re.sub(pattern, new_html, sub_content)
    js_content = js_content[:start_idx] + sub_content + js_content[end_idx:]

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Lightbox HTML fixed for REAL!')
