import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

preload_injection = '''                function openLightbox(idx, direction = 0) {
                    // Preload adjacent images for instant swiping
                    function preloadAdjacent(i) {
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

# Use regex to find unction openLightbox(idx, direction = 0) {
# accounting for varying whitespace
js_content = re.sub(
    r'\s+function openLightbox\(idx,\s*direction\s*=\s*0\)\s*\{',
    '\n' + preload_injection,
    js_content
)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Preload logic injected successfully!')
