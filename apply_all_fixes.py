import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# 1. Fix onerror infinite loop
js_content = js_content.replace('''onerror="this.src=''"''', '''onerror="this.onerror=null; this.src=''"''')
js_content = js_content.replace('''onerror="this.src='';"''', '''onerror="this.onerror=null; this.src='';"''')

# 2. Fix setupGalleryLightboxGlobals HTML and classes
old_lb_globals = '''        lb.innerHTML = 
            <div class="lightbox-close" style="z-index: 10002;">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <div class="lightbox-title"></div>
            <div class="lightbox-prev" style="z-index: 10002;"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></div>
            <div class="lightbox-next" style="z-index: 10002;"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
        ;'''

new_lb_globals = '''        lb.innerHTML = 
            <div class="gallery-lightbox-bg"></div>
            <div class="gallery-lightbox-close">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); color: white; font-size: 1.2rem; font-weight: bold; z-index: 10002; pointer-events: none; text-shadow: 0 2px 10px rgba(0,0,0,0.5);"></div>
            <button class="gallery-lightbox-arrow gallery-lightbox-arrow--prev"></button>
            <button class="gallery-lightbox-arrow gallery-lightbox-arrow--next"></button>
        ;'''

js_content = js_content.replace(old_lb_globals, new_lb_globals)

# 3. Fix selectors in setupGalleryLightboxGlobals
js_content = js_content.replace("lb.querySelector('.lightbox-prev')", "lb.querySelector('.gallery-lightbox-arrow--prev')")
js_content = js_content.replace("lb.querySelector('.lightbox-next')", "lb.querySelector('.gallery-lightbox-arrow--next')")

# Careful with close selector replacement, we also want to add background click
old_close_logic = "const closeBtn = lb.querySelector('.lightbox-close');"
new_close_logic = '''const bgLayer = lb.querySelector('.gallery-lightbox-bg');
        if (bgLayer) bgLayer.addEventListener('click', closeLightbox);
        const closeBtn = lb.querySelector('.gallery-lightbox-close');'''
js_content = js_content.replace(old_close_logic, new_close_logic)

# 4. Add Progressive Loading to createLightboxMedia
# We will find the EXACT block for the else condition
old_create_media = '''        function createLightboxMedia(src) {
            if (isVideoFile(src)) {
                const el = document.createElement('video');
                el.className = 'gallery-lightbox-video';
                el.poster = "assets/logo_white.png";
                el.src = src;
                el.controls = true;
                el.autoplay = true;
                el.playsInline = true;
                el.style.cssText = 'max-width:90%; max-height:85vh; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.6); outline:none; z-index:1; position:relative;';
                return el;
            } else {
                const el = document.createElement('img');
                el.className = 'gallery-lightbox-img';
                el.src = src;
                return el;
            }
        }'''

new_create_media = '''        function createLightboxMedia(src) {
            if (isVideoFile(src)) {
                const el = document.createElement('video');
                el.className = 'gallery-lightbox-video';
                el.poster = "assets/logo_white.png";
                el.src = src;
                el.controls = true;
                el.autoplay = true;
                el.playsInline = true;
                el.style.cssText = 'max-width:90%; max-height:85vh; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.6); outline:none; z-index:1; position:relative;';
                return el;
            } else {
                const el = document.createElement('img');
                el.className = 'gallery-lightbox-img';
                
                const thumbSrc = src.startsWith('assets/portfolio/') ? src.replace('assets/portfolio/', 'assets/portfolio-thumbs/') : src;
                el.src = thumbSrc;
                
                if (thumbSrc !== src) {
                    const highRes = new Image();
                    highRes.onload = () => { if (el.src.includes(thumbSrc)) el.src = src; };
                    highRes.src = src;
                }
                return el;
            }
        }'''

js_content = js_content.replace(old_create_media, new_create_media)

# 5. Add preloadAdjacent logic to openLightbox functions
preload_injection = '''            function preloadAdjacent(i) {
                try {
                    let src = null;
                    if (typeof allFiles !== 'undefined' && allFiles && i >= 0 && i < allFiles.length) {
                        src = allFiles[i];
                    } else if (typeof allFullSrcs !== 'undefined' && allFullSrcs && i >= 0 && i < allFullSrcs.length) {
                        src = allFullSrcs[i];
                    }
                    if (src && !src.endsWith('.mp4')) {
                        const img = new Image();
                        img.src = src;
                    }
                } catch(e) {}
            }
            preloadAdjacent(idx + 1);
            preloadAdjacent(idx + 2);
            preloadAdjacent(idx - 1);
'''

# First openLightbox
js_content = re.sub(
    r'(?P<indent>\s+)function openLightbox\(idx,\s*direction\s*=\s*0\)\s*\{\n(?P<next>.*const existing = document\.querySelector\(\'\.gallery-lightbox\'\);)',
    r'\g<indent>function openLightbox(idx, direction = 0) {\n\g<indent>' + preload_injection.replace('\n', '\n\g<indent>') + r'\n\g<next>',
    js_content
)

# Second openLightbox
js_content = re.sub(
    r'(?P<indent>\s+)function openLightbox\(idx,\s*direction\s*=\s*0\)\s*\{\n(?P<next>.*const fileSrc = allFiles\[idx\];)',
    r'\g<indent>function openLightbox(idx, direction = 0) {\n\g<indent>' + preload_injection.replace('\n', '\n\g<indent>') + r'\n\g<next>',
    js_content
)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('All fixes applied cleanly to fresh script.js!')
