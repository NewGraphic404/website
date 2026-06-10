import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# We need to replace the entire setupGalleryLightbox function
# Start: '    // 6. Custom Lightbox with Video & Image support'
# End: '    // 7. Event listeners'

start_marker = "    // 6. Custom Lightbox with Video & Image support"
end_marker = "    // 7. Event listeners"

start_idx = js_content.find(start_marker)
end_idx = js_content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print('Could not find markers!')
    exit(1)

new_lightbox_code = '''    // 6. Custom Lightbox with Video & Image support
    function setupGalleryLightbox(allFiles, categoryTitle) {
        // Create global shared lightbox elements once
        let lb = document.querySelector('.gallery-lightbox-global');
        if (!lb) {
            lb = document.createElement('div');
            lb.className = 'gallery-lightbox gallery-lightbox-global';
            lb.innerHTML = 
                <div class="gallery-lightbox-bg"></div>
                <div class="gallery-lightbox-close">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
                <button class="gallery-lightbox-arrow gallery-lightbox-arrow--prev"></button>
                <button class="gallery-lightbox-arrow gallery-lightbox-arrow--next"></button>
            ;
            document.body.appendChild(lb);
        }

        let currentIdx = 0;
        let isAnimating = false;
        let navQueue = [];
        let allLocalFiles = allFiles; // Capture reference
        
        function isVideoFile(src) { return src.toLowerCase().endsWith('.mp4'); }
        
        function createLightboxMedia(src) {
            if (isVideoFile(src)) {
                const el = document.createElement('video');
                el.className = 'gallery-lightbox-video';
                el.poster = "assets/logo_white.png";
                el.src = src;
                el.controls = true; el.autoplay = true; el.playsInline = true;
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
        }

        function processQueue() {
            if (navQueue.length === 0 || isAnimating) return;
            const dir = navQueue.shift();
            const nextIdx = currentIdx + dir;
            if (nextIdx >= 0 && nextIdx < allLocalFiles.length) {
                openLightbox(nextIdx, dir);
            } else {
                processQueue();
            }
        }

        function openLightbox(idx, direction = 0) {
            const fileSrc = allLocalFiles[idx];
            if (!fileSrc) return;

            // Preload adjacent
            function preloadAdjacent(i) {
                try {
                    if (i >= 0 && i < allLocalFiles.length) {
                        const src = allLocalFiles[i];
                        if (src && !src.endsWith('.mp4')) { const img = new Image(); img.src = src; }
                    }
                } catch(e) {}
            }
            preloadAdjacent(idx + 1); preloadAdjacent(idx + 2); preloadAdjacent(idx - 1);

            currentIdx = idx;

            const prevBtn = lb.querySelector('.gallery-lightbox-arrow--prev');
            const nextBtn = lb.querySelector('.gallery-lightbox-arrow--next');
            prevBtn.disabled = idx === 0;
            nextBtn.disabled = idx === allLocalFiles.length - 1;

            if (direction !== 0) {
                if (isAnimating) { navQueue.push(direction); return; }
                isAnimating = true;

                const oldMedia = lb.querySelector('.gallery-lightbox-img, .gallery-lightbox-video');
                const toX = direction > 0 ? '100%' : '-100%';
                const fromX = direction > 0 ? '-100%' : '100%';

                const newMedia = createLightboxMedia(fileSrc);
                newMedia.style.cssText += ; position:absolute; transform:translateX(); opacity:0; transition:none;;
                lb.appendChild(newMedia);

                newMedia.getBoundingClientRect();
                if (oldMedia) {
                    oldMedia.style.transition = 'transform 0.15s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease';
                    oldMedia.style.transform = 	ranslateX();
                    oldMedia.style.opacity = '0';
                }
                newMedia.style.transition = 'transform 0.15s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease';
                newMedia.style.transform = 'translateX(0)';
                newMedia.style.opacity = '1';

                setTimeout(() => {
                    if (oldMedia) { if (oldMedia.tagName === 'VIDEO') oldMedia.pause(); oldMedia.remove(); }
                    newMedia.style.position = ''; newMedia.style.transition = ''; newMedia.style.transform = '';
                    isAnimating = false; processQueue();
                }, 160);
                return;
            }

            // First open
            lb.style.display = 'flex';
            lb.style.opacity = '1';
            lb.style.pointerEvents = 'auto';

            const bg = lb.querySelector('.gallery-lightbox-bg');
            const cls = lb.querySelector('.gallery-lightbox-close');
            
            // clear old media
            lb.querySelectorAll('.gallery-lightbox-img, .gallery-lightbox-video').forEach(m => m.remove());

            const newMedia = createLightboxMedia(fileSrc);
            newMedia.style.transform = 'scale(0.95)';
            newMedia.style.opacity = '0';
            lb.appendChild(newMedia);

            requestAnimationFrame(() => requestAnimationFrame(() => {
                bg.style.opacity = '1';
                cls.style.opacity = '1';
                prevBtn.style.opacity = '1';
                nextBtn.style.opacity = '1';
                newMedia.style.transition = 'transform 0.18s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease';
                newMedia.style.transform = 'translate(0, 0) scale(1)';
                newMedia.style.opacity = '1';
            }));

            // Attach listeners specific to this session
            window.lbSessionClose = () => {
                bg.style.opacity = '0'; cls.style.opacity = '0'; prevBtn.style.opacity = '0'; nextBtn.style.opacity = '0';
                const curMedia = lb.querySelector('.gallery-lightbox-img, .gallery-lightbox-video');
                if (curMedia) {
                    if (curMedia.tagName === 'VIDEO') curMedia.pause();
                    curMedia.style.transition = 'transform 0.18s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease';
                    curMedia.style.transform = 'scale(0.95)';
                    curMedia.style.opacity = '0';
                }
                setTimeout(() => { lb.style.display = 'none'; lb.style.pointerEvents = 'none'; }, 200);
                document.removeEventListener('keydown', window.lbKeyHandler);
            };

            window.lbKeyHandler = (e) => {
                if (e.key === 'ArrowLeft' && currentIdx < allLocalFiles.length - 1) { navQueue.push(1); processQueue(); }
                if (e.key === 'ArrowRight' && currentIdx > 0) { navQueue.push(-1); processQueue(); }
                if (e.key === 'Escape') window.lbSessionClose();
            };
            document.addEventListener('keydown', window.lbKeyHandler);
        }

        // Only attach ONE set of DOM listeners
        if (!lb.dataset.initialized) {
            lb.dataset.initialized = 'true';
            lb.querySelector('.gallery-lightbox-bg').addEventListener('click', () => { if(window.lbSessionClose) window.lbSessionClose(); });
            lb.querySelector('.gallery-lightbox-close').addEventListener('click', () => { if(window.lbSessionClose) window.lbSessionClose(); });
            lb.querySelector('.gallery-lightbox-arrow--prev').addEventListener('click', (e) => { e.stopPropagation(); navQueue.push(-1); processQueue(); });
            lb.querySelector('.gallery-lightbox-arrow--next').addEventListener('click', (e) => { e.stopPropagation(); navQueue.push(1); processQueue(); });
        }

        // IMPORTANT: Event delegation on the grid container!
        // Remove old delegate listener if exists
        const cloneGrid = socialGalleryGrid.cloneNode(false);
        socialGalleryGrid.parentNode.replaceChild(cloneGrid, socialGalleryGrid);
        socialGalleryGrid = cloneGrid; // update reference
        
        socialGalleryGrid.addEventListener('click', (e) => {
            const item = e.target.closest('.gallery-item');
            if (item) {
                // Find index
                const siblings = Array.from(socialGalleryGrid.querySelectorAll('.gallery-item'));
                const clickedIdx = siblings.indexOf(item);
                if (clickedIdx > -1) {
                    openLightbox(clickedIdx, 0);
                }
            }
        });
    }

'''

js_content = js_content[:start_idx] + new_lightbox_code + js_content[end_idx:]

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('setupGalleryLightbox refactored successfully!')
