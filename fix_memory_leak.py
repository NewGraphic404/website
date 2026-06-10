import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

start_marker = "    // 5. Render Gallery Files (Images/Videos)"
end_marker = "    // 7. Event listeners"

start_idx = js_content.find(start_marker)
end_idx = js_content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Error finding markers")
    exit(1)

new_code = """    // 5. Render Gallery Files (Images/Videos)
    function renderGallery(files, categoryTitle) {
        currentViewLevel = 'gallery';
        if (!socialGalleryGrid) return;

        let displayFiles = [...files];
        if (currentCategoryKey === 'social') {
            for (let i = displayFiles.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [displayFiles[i], displayFiles[j]] = [displayFiles[j], displayFiles[i]];
            }
        }

        socialGalleryGrid.className = 'portfolio-gallery-grid';
        socialGalleryGrid.innerHTML = '';

        let currentIndex = 0;
        let BATCH_SIZE = 15;
        let observer = null;
        let loadingTrigger = document.createElement('div');
        loadingTrigger.style.width = '100%';
        loadingTrigger.style.height = '50px';

        setupGalleryLightboxGlobals(displayFiles, categoryTitle);

        function renderBatch() {
            if (currentIndex >= displayFiles.length) {
                if (observer) observer.unobserve(loadingTrigger);
                loadingTrigger.style.display = 'none';
                return;
            }

            const batch = displayFiles.slice(currentIndex, currentIndex + BATCH_SIZE);
            const htmlString = batch.map(file => {
                const isVideo = isVideoFile(file);
                if (isVideo) {
                    return `
                        <div class="gallery-item video-item" data-full="${file}" data-type="video" style="position:relative; cursor:pointer; overflow:hidden; border-radius:12px; opacity:1 !important; transform:none !important;">
                            <video data-src="${file}" poster="assets/logo_white.png" class="gallery-video-element" preload="none" muted loop playsinline style="width:100%; height:100%; object-fit:cover; border-radius:12px;"></video>
                            <div class="video-play-overlay" style="position:absolute; inset:0; background:rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; z-index:2; transition:background-color 0.3s ease;">
                                <div style="width:50px; height:50px; border-radius:50%; background:rgba(245,166,35,0.9); display:flex; align-items:center; justify-content:center; color:#000; font-size:1.2rem; padding-left:4px; box-shadow:0 4px 15px rgba(245,166,35,0.4); transition:transform 0.3s ease;">►</div>
                            </div>
                        </div>
                    `;
                } else {
                    const thumbSrc = file.startsWith('assets/portfolio/') ? file.replace('assets/portfolio/', 'assets/portfolio-thumbs/') : file;
                    return `
                        <div class="gallery-item" data-full="${file}" data-type="image" style="cursor:pointer; overflow:hidden; border-radius:12px; opacity:1 !important; transform:none !important;">
                            <img src="${thumbSrc}" alt="${categoryTitle}" loading="lazy" style="width:100%; height:100%; object-fit:cover; border-radius:12px;" onerror="this.src='${file}';">
                        </div>
                    `;
                }
            }).join('');

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlString;
            const newNodes = Array.from(tempDiv.children);

            newNodes.forEach((item, i) => {
                const actualIndex = currentIndex + i;
                socialGalleryGrid.insertBefore(item, loadingTrigger);
                
                item.addEventListener('click', () => {
                    if (window.openGalleryLightboxFn) {
                        window.openGalleryLightboxFn(actualIndex);
                    }
                });

                const media = item.querySelector('img, video');
                if (media && !window.matchMedia("(pointer: coarse)").matches) {
                    item.addEventListener('mouseenter', () => {
                        media.style.transform = 'scale(1.05)';
                        if (item.classList.contains('video-item')) {
                            const playBtn = item.querySelector('.video-play-overlay div');
                            if (playBtn) playBtn.style.transform = 'scale(1.15)';
                        }
                    });
                    item.addEventListener('mouseleave', () => {
                        media.style.transform = 'scale(1)';
                        if (item.classList.contains('video-item')) {
                            const playBtn = item.querySelector('.video-play-overlay div');
                            if (playBtn) playBtn.style.transform = 'scale(1)';
                        }
                    });
                }
            });

            currentIndex += BATCH_SIZE;
        }

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

    // 6. Custom Lightbox with Video & Image support
    function setupGalleryLightboxGlobals(allFiles, categoryTitle) {
        const cursor = document.getElementById('customCursor');
        const existingLb = document.querySelector('.gallery-lightbox');
        if (existingLb) existingLb.remove();

        const lb = document.createElement('div');
        lb.className = 'gallery-lightbox';
        lb.innerHTML = `
            <div class="lightbox-close" style="z-index: 10002;">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <div class="lightbox-title">${categoryTitle}</div>
            <div class="lightbox-prev" style="z-index: 10002;"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></div>
            <div class="lightbox-next" style="z-index: 10002;"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div>
        `;
        document.body.appendChild(lb);

        let currentLightboxIndex = 0;
        let isAnimating = false;
        let navQueue = [];

        function isVideoFile(src) { return src.toLowerCase().endsWith('.mp4'); }

        function createLightboxMedia(src) {
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
        }

        function processQueue() {
            if (navQueue.length > 0 && !isAnimating) {
                const dir = navQueue.shift();
                openLightbox(currentLightboxIndex + dir, dir);
            }
        }

        function openLightbox(idx, direction = 0) {
            function preloadAdjacent(i) {
                try {
                    if (allFiles && i >= 0 && i < allFiles.length) {
                        const src = allFiles[i];
                        if (src && !src.endsWith('.mp4')) { const img = new Image(); img.src = src; }
                    }
                } catch(e) {}
            }
            preloadAdjacent(idx + 1); preloadAdjacent(idx + 2); preloadAdjacent(idx - 1);

            const fileSrc = allFiles[idx];
            if (!fileSrc) return;

            if (direction !== 0) {
                if (isAnimating) { navQueue.push(direction); return; }
                isAnimating = true;

                const oldMedia = lb.querySelector('.gallery-lightbox-img, .gallery-lightbox-video');
                const toX = direction > 0 ? '100%' : '-100%';
                const fromX = direction > 0 ? '-100%' : '100%';

                const newMedia = createLightboxMedia(fileSrc);
                newMedia.style.cssText += `; position:absolute; transform:translateX(${fromX}); opacity:0; transition:none;`;
                lb.appendChild(newMedia);

                newMedia.getBoundingClientRect();
                if (oldMedia) {
                    oldMedia.style.transition = 'transform 0.15s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease';
                    oldMedia.style.transform = `translateX(${toX})`;
                    oldMedia.style.opacity = '0';
                }
                newMedia.style.transition = 'transform 0.15s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease';
                newMedia.style.transform = 'translateX(0)';
                newMedia.style.opacity = '1';

                setTimeout(() => {
                    if (oldMedia) { if (oldMedia.tagName === 'VIDEO') oldMedia.pause(); oldMedia.remove(); }
                    newMedia.style.position = 'relative';
                    newMedia.style.transform = 'none';
                    isAnimating = false;
                    processQueue();
                }, 150);
            } else {
                lb.classList.add('active');
                if (cursor) cursor.classList.add('is-hovering-gallery');
                const newMedia = createLightboxMedia(fileSrc);
                lb.appendChild(newMedia);
                
                requestAnimationFrame(() => {
                    newMedia.style.opacity = '0';
                    newMedia.style.transform = 'scale(0.95)';
                    requestAnimationFrame(() => {
                        newMedia.style.transition = 'transform 0.3s var(--ease-out-expo), opacity 0.3s ease';
                        newMedia.style.opacity = '1';
                        newMedia.style.transform = 'scale(1)';
                    });
                });
            }

            currentLightboxIndex = idx;
            
            const prev = lb.querySelector('.lightbox-prev');
            const next = lb.querySelector('.lightbox-next');
            if (prev) prev.style.display = idx === 0 ? 'none' : 'flex';
            if (next) next.style.display = idx === allFiles.length - 1 ? 'none' : 'flex';
        }

        window.openGalleryLightboxFn = (idx) => openLightbox(idx, 0);

        function closeLightbox() {
            lb.classList.remove('active');
            if (cursor) cursor.classList.remove('is-hovering-gallery');
            const curMedia = lb.querySelector('.gallery-lightbox-img, .gallery-lightbox-video');
            if (curMedia) {
                if (curMedia.tagName === 'VIDEO') curMedia.pause();
                curMedia.style.transition = 'transform 0.15s ease, opacity 0.15s ease';
                curMedia.style.transform = 'scale(0.95)';
                curMedia.style.opacity = '0';
                setTimeout(() => { curMedia.remove(); }, 150);
            }
        }

        if (window.lbKeydownHandler) document.removeEventListener('keydown', window.lbKeydownHandler);
        window.lbKeydownHandler = (e) => {
            if (!lb.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight' && currentLightboxIndex < allFiles.length - 1) openLightbox(currentLightboxIndex + 1, 1);
            if (e.key === 'ArrowLeft' && currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1, -1);
        };
        document.addEventListener('keydown', window.lbKeydownHandler);

        const closeBtn = lb.querySelector('.lightbox-close');
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

        const nextBtn = lb.querySelector('.lightbox-next');
        const prevBtn = lb.querySelector('.lightbox-prev');
        if (nextBtn) nextBtn.addEventListener('click', () => openLightbox(currentLightboxIndex + 1, 1));
        if (prevBtn) prevBtn.addEventListener('click', () => openLightbox(currentLightboxIndex - 1, -1));

        let startX = 0; let isDragging = false;
        lb.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; isDragging = true; }, { passive: true });
        lb.addEventListener('touchmove', (e) => { if (!isDragging) return; }, { passive: true });
        lb.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentLightboxIndex < allFiles.length - 1) openLightbox(currentLightboxIndex + 1, 1);
                else if (diff < 0 && currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1, -1);
            }
        });
    }

"""

js_content = js_content[:start_idx] + new_code + js_content[end_idx:]

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Gallery rewritten successfully! Memory leak fixed.')
