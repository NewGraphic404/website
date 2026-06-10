import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Replace the dataset.initialized block
old_listener_block = '''        // Only attach ONE set of DOM listeners
        if (!lb.dataset.initialized) {
            lb.dataset.initialized = 'true';
            lb.querySelector('.gallery-lightbox-bg').addEventListener('click', () => { if(window.lbSessionClose) window.lbSessionClose(); });
            lb.querySelector('.gallery-lightbox-close').addEventListener('click', () => { if(window.lbSessionClose) window.lbSessionClose(); });
            lb.querySelector('.gallery-lightbox-arrow--prev').addEventListener('click', (e) => { e.stopPropagation(); navQueue.push(-1); processQueue(); });
            lb.querySelector('.gallery-lightbox-arrow--next').addEventListener('click', (e) => { e.stopPropagation(); navQueue.push(1); processQueue(); });
        }'''

new_listener_block = '''        // Overwrite click listeners to ensure they use the current closure variables
        lb.querySelector('.gallery-lightbox-bg').onclick = () => { if(window.lbSessionClose) window.lbSessionClose(); };
        lb.querySelector('.gallery-lightbox-close').onclick = () => { if(window.lbSessionClose) window.lbSessionClose(); };
        lb.querySelector('.gallery-lightbox-arrow--prev').onclick = (e) => { e.stopPropagation(); navQueue.push(-1); processQueue(); };
        lb.querySelector('.gallery-lightbox-arrow--next').onclick = (e) => { e.stopPropagation(); navQueue.push(1); processQueue(); };'''

js_content = js_content.replace(old_listener_block, new_listener_block)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Lightbox arrow listeners fixed!')
