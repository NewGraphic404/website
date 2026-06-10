import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Fix double-binding in setupGalleryLightbox
old_bind = """        items.forEach((wrapper, idx) => {
            if (cursor) {"""
new_bind = """        items.forEach((wrapper, idx) => {
            if (wrapper.dataset.lightboxBound) return;
            wrapper.dataset.lightboxBound = 'true';
            if (cursor) {"""

js_content = js_content.replace(old_bind, new_bind)

# Optimize triggerIntersectionObserver to not re-observe existing
old_obs = """        const items = socialGalleryGrid.children;
        Array.from(items).forEach(item => {
            item.classList.add('gallery-item');
            window.socialGalleryObserver.observe(item);
        });"""
new_obs = """        const items = socialGalleryGrid.children;
        Array.from(items).forEach(item => {
            if (item.tagName.toLowerCase() === 'div' && !item.dataset.observed) {
                item.classList.add('gallery-item');
                window.socialGalleryObserver.observe(item);
                item.dataset.observed = 'true';
            }
        });"""

js_content = js_content.replace(old_obs, new_obs)

# Also in apply_fixes.py I did:
# if (window.socialGalleryObserver) { newNodes.forEach(item => window.socialGalleryObserver.observe(item)); }
# Let's ensure newNodes get marked
old_newnodes = """            if (window.socialGalleryObserver) {
                newNodes.forEach(item => window.socialGalleryObserver.observe(item));"""
new_newnodes = """            if (window.socialGalleryObserver) {
                newNodes.forEach(item => { window.socialGalleryObserver.observe(item); item.dataset.observed = 'true'; });"""

js_content = js_content.replace(old_newnodes, new_newnodes)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Duplicate bindings fixed!')
