import re
import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

new_render_gallery = '''    // 5. Render Gallery Files (Images/Videos) with Infinite Scroll
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
        const BATCH_SIZE = 20;
        
        // Helper to render a batch of files
        function renderBatch() {
            if (currentIndex >= displayFiles.length) return;
            
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
            
            // Insert new items
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlString;
            const newNodes = Array.from(tempDiv.children);
            
            // Attach events
            newNodes.forEach(item => {
                socialGalleryGrid.appendChild(item);
                const media = item.querySelector('img, video');
                if (media) {
                    item.addEventListener('mouseenter', () => {
                        media.style.transform = 'scale(1.05)';
                        if (item.classList.contains('video-item')) {
                            if (media.src) {
                                media.play().catch(e => console.log('Autoplay blocked:', e));
                            }
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
            
            // Refresh lightbox bindings
            setupGalleryLightbox(displayFiles, categoryTitle);
            
            // Trigger animation
            requestAnimationFrame(() => {
                newNodes.forEach((node, i) => {
                    setTimeout(() => node.classList.add('revealed'), i * 50);
                });
            });
            
            currentIndex += BATCH_SIZE;
            
            // Move trigger to bottom if not done
            if (currentIndex < displayFiles.length) {
                socialGalleryGrid.appendChild(triggerDiv);
            }
        }
        
        // Setup observer trigger
        const triggerDiv = document.createElement('div');
        triggerDiv.style.width = '100%';
        triggerDiv.style.height = '100px';
        triggerDiv.className = 'gallery-load-trigger';
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                renderBatch();
            }
        }, { rootMargin: '200px' });
        
        observer.observe(triggerDiv);
        
        // Initial render
        renderBatch();
        
        // Call global intersection observer logic if needed
        triggerIntersectionObserver();
    }'''

# Create pattern using regex
pattern = re.compile(r'function renderGallery\(files, categoryTitle\) \{.*?(?=// 6\. Custom Lightbox with Video & Image support)', re.DOTALL)
js_content = pattern.sub(new_render_gallery + '\n\n    ', js_content)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print("Infinite scrolling applied successfully!")
