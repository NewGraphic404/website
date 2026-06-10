import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# 1. Eliminate console logs in initScrollReveal
js_content = re.sub(r'console\.log\([^)]*Scroll Reveal initialized[^)]*\);', '', js_content)
js_content = re.sub(r'console\.log\([^)]*Found[^)]*elements with reveal classes[^)]*\);', '', js_content)
js_content = re.sub(r'console\.warn\([^)]*No elements found with reveal classes[^)]*\);', '', js_content)
js_content = re.sub(r'console\.log\([^)]*Element:[^)]*Ratio:[^)]*IsIntersecting:[^)]*\);', '', js_content)
js_content = re.sub(r'console\.log\([^)]*REVEALED:[^)]*\);', '', js_content)

# Fix IntersectionObserver threshold to not fire constantly
js_content = js_content.replace('threshold: [0, 0.15, 0.5, 1]', 'threshold: [0.15]')

# 2. Fix Marquees cloning
js_content = js_content.replace('for (let i = 0; i < 5; i++) track.innerHTML += original;', 'for (let i = 0; i < 1; i++) track.innerHTML += original;')
js_content = js_content.replace('singleW = track.scrollWidth / 6;', 'singleW = track.scrollWidth / 2;')

# 3. Add Preload
preload_injection = """                function openLightbox(idx, direction = 0) {
                    function preloadAdjacent(i) {
                        try {
                            let src = null;
                            if (typeof allFiles !== 'undefined' && allFiles && i >= 0 && i < allFiles.length) src = allFiles[i];
                            else if (typeof allFullSrcs !== 'undefined' && allFullSrcs && i >= 0 && i < allFullSrcs.length) src = allFullSrcs[i];
                            if (src && !src.endsWith('.mp4')) { const img = new Image(); img.src = src; }
                        } catch(e) {}
                    }
                    preloadAdjacent(idx + 1);
                    preloadAdjacent(idx + 2);
                    preloadAdjacent(idx - 1);
"""
js_content = re.sub(r'\s+function openLightbox\(idx,\s*direction\s*=\s*0\)\s*\{', '\n' + preload_injection, js_content)

# 4. Add Progressive loading to createLightboxMedia
old_prog = """        } else {
            const el = document.createElement('img');
            el.className = 'gallery-lightbox-img';
            el.src = src;
            return el;
        }"""
new_prog = """        } else {
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
        }"""
js_content = js_content.replace(old_prog, new_prog)

# 5. Infinite Scroll
new_logic = """        socialGalleryGrid.className = 'portfolio-gallery-grid';
        socialGalleryGrid.innerHTML = '';

        let currentIndex = 0;
        let BATCH_SIZE = 15;
        let observer = null;
        let loadingTrigger = null;

        function renderBatch() {
            if (currentIndex >= displayFiles.length) {
                if (observer && loadingTrigger) observer.unobserve(loadingTrigger);
                if (loadingTrigger) loadingTrigger.style.display = 'none';
                return;
            }

            const batch = displayFiles.slice(currentIndex, currentIndex + BATCH_SIZE);
            const htmlString = batch.map(file => {
                const isVideo = isVideoFile(file);
                if (isVideo) {
                    return `
                        <div class="gallery-item video-item reveal-up" data-full="${file}" data-type="video" style="position:relative; cursor:pointer; overflow:hidden; border-radius:12px;">
                            <video data-src="${file}" class="gallery-video-element" preload="metadata" muted loop playsinline style="width:100%; height:100%; object-fit:cover; border-radius:12px; transition: transform 0.6s cubic-bezier(0.2,0,0.2,1);"></video>
                            <div class="video-play-overlay" style="
                                position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; z-index: 2; transition: background-color 0.3s ease;
                            ">
                                <div style="
                                    width: 50px; height: 50px; border-radius: 50%; background: rgba(245,166,35,0.9); display: flex; align-items: center; justify-content: center; color: #000; font-size: 1.2rem; padding-left: 4px; box-shadow: 0 4px 15px rgba(245,166,35,0.4); transition: transform 0.3s ease;
                                ">►</div>
                            </div>
                        </div>
                    `;
                } else {
                    const thumbSrc = file.startsWith('assets/portfolio/') ? file.replace('assets/portfolio/', 'assets/portfolio-thumbs/') : file;
                    return `
                        <div class="gallery-item reveal-up" data-full="${file}" data-type="image" style="cursor:pointer; overflow:hidden; border-radius:12px;">
                            <img src="${thumbSrc}" alt="${categoryTitle}" loading="lazy" style="width:100%; height:100%; object-fit:cover; border-radius:12px; transition: transform 0.6s cubic-bezier(0.2,0,0.2,1);" onerror="this.src='${file}'; console.error('Failed to load thumbnail:', '${thumbSrc}');">
                        </div>
                    `;
                }
            }).join('');

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlString;
            const newNodes = Array.from(tempDiv.children);

            newNodes.forEach(item => {
                socialGalleryGrid.insertBefore(item, loadingTrigger);
                
                const media = item.querySelector('img, video');
                if (media) {
                    item.addEventListener('mouseenter', () => {
                        media.style.transform = 'scale(1.05)';
                        if (item.classList.contains('video-item')) {
                            if (media.src) media.play().catch(e => {});
                            const playBtn = item.querySelector('.video-play-overlay div');
                            if (playBtn) playBtn.style.transform = 'scale(1.15)';
                        }
                    });
                    item.addEventListener('mouseleave', () => {
                        media.style.transform = 'scale(1)';
                        if (item.classList.contains('video-item')) {
                            media.pause();
                            media.currentTime = 0;
                            const playBtn = item.querySelector('.video-play-overlay div');
                            if (playBtn) playBtn.style.transform = 'scale(1)';
                        }
                    });
                }
            });

            setupGalleryLightbox(displayFiles, categoryTitle);
            
            // Avoid calling triggerIntersectionObserver repeatedly safely
            if (window.socialGalleryObserver) {
                newNodes.forEach(item => window.socialGalleryObserver.observe(item));
            } else {
                triggerIntersectionObserver();
            }

            currentIndex += BATCH_SIZE;
        }

        loadingTrigger = document.createElement('div');
        loadingTrigger.style.width = '100%';
        loadingTrigger.style.height = '50px';
        socialGalleryGrid.appendChild(loadingTrigger);

        if ('IntersectionObserver' in window) {
            observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    renderBatch();
                }
            }, { rootMargin: '300px' });
            observer.observe(loadingTrigger);
        } else {
            BATCH_SIZE = displayFiles.length;
        }

        renderBatch();
    }

    // 6. Custom Lightbox with Video & Image support"""

start_idx = js_content.find("socialGalleryGrid.className = 'portfolio-gallery-grid';")
end_idx = js_content.find("    // 6. Custom Lightbox with Video & Image support")

if start_idx != -1 and end_idx != -1:
    js_content = js_content[:start_idx] + new_logic + js_content[end_idx + 44:]

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('All optimizations applied correctly!')
