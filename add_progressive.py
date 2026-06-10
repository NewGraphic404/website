import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

old_code = """        } else {
            const el = document.createElement('img');
            el.className = 'gallery-lightbox-img';
            el.src = src;
            return el;
        }"""

new_code = """        } else {
            const el = document.createElement('img');
            el.className = 'gallery-lightbox-img';
            
            // 1. Instant Preview using Thumbnail
            const thumbSrc = src.startsWith('assets/portfolio/') ? src.replace('assets/portfolio/', 'assets/portfolio-thumbs/') : src;
            el.src = thumbSrc;
            
            // 2. Load High-Res in background and swap seamlessly
            if (thumbSrc !== src) {
                const highRes = new Image();
                highRes.onload = () => {
                    if (el.src.includes(thumbSrc)) {
                        el.src = src;
                    }
                };
                highRes.src = src;
            }
            
            return el;
        }"""

js_content = js_content.replace(old_code, new_code)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Progressive image loading injected into createLightboxMedia!')
