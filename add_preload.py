import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

preload_code = """
                function openLightbox(idx, direction = 0) {
                    // Preload adjacent images for instant swiping
                    function preloadAdjacent(i) {
                        if (i >= 0 && i < allFiles.length) {
                            const src = allFiles[i];
                            if (!src.endsWith('.mp4')) {
                                const img = new Image();
                                img.src = src;
                            }
                        }
                    }
                    preloadAdjacent(idx + 1);
                    preloadAdjacent(idx - 1);
                    
                    const existing = document.querySelector('.gallery-lightbox');"""

js_content = js_content.replace(
    "                function openLightbox(idx, direction = 0) {\n                    const existing = document.querySelector('.gallery-lightbox');",
    preload_code
)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Preloading logic added to lightbox!')
