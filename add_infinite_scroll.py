import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

new_logic = '''        socialGalleryGrid.className = 'portfolio-gallery-grid';
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
                    return 
                        <div class="gallery-item video-item reveal-up" data-full="" data-type="video" style="position:relative; cursor:pointer; overflow:hidden; border-radius:12px;">
                            <video data-src="" class="gallery-video-element" preload="metadata" muted loop playsinline style="width:100%; height:100%; object-fit:cover; border-radius:12px; transition: transform 0.6s cubic-bezier(0.2,0,0.2,1);"></video>
                            <div class="video-play-overlay" style="
                                position: absolute;
                                inset: 0;
                                background: rgba(0,0,0,0.3);
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                z-index: 2;
                                transition: background-color 0.3s ease;
                            ">
                                <div style="
                                    width: 50px;
                                    height: 50px;
                                    border-radius: 50%;
                                    background: rgba(245,166,35,0.9);
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    color: #000;
                                    font-size: 1.2rem;
                                    padding-left: 4px;
                                    box-shadow: 0 4px 15px rgba(245,166,35,0.4);
                                    transition: transform 0.3s ease;
                                ">►</div>
                            </div>
                        </div>
                    ;
                } else {
                    const thumbSrc = file.startsWith('assets/portfolio/') ? file.replace('assets/portfolio/', 'assets/portfolio-thumbs/') : file;
                    return 
                        <div class="gallery-item reveal-up" data-full="" data-type="image" style="cursor:pointer; overflow:hidden; border-radius:12px;">
                            <img src="" alt="" loading="lazy" style="width:100%; height:100%; object-fit:cover; border-radius:12px; transition: transform 0.6s cubic-bezier(0.2,0,0.2,1);" onerror="this.src=''; console.error('Failed to load thumbnail:', '');">
                        </div>
                    ;
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

            // Re-bind Lightbox to all items in grid
            setupGalleryLightbox(displayFiles, categoryTitle);
            triggerIntersectionObserver();

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

    // 6. Custom Lightbox with Video & Image support'''

start_idx = js_content.find("socialGalleryGrid.className = 'portfolio-gallery-grid';")
end_idx = js_content.find("    // 6. Custom Lightbox with Video & Image support")

if start_idx != -1 and end_idx != -1:
    js_content = js_content[:start_idx] + new_logic + js_content[end_idx + 44:]
    with codecs.open(js_path, 'w', 'utf-8') as f:
        f.write(js_content)
    print('Infinite scrolling injected successfully!')
else:
    print('Failed to find replacement boundaries!')
