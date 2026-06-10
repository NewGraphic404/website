import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# 1. Update openLightbox
old_first_open = '''            // First open
            lb.style.display = 'flex';'''

new_first_open = '''            // First open
            if (lb.style.display !== 'flex') {
                if (!window.location.hash.endsWith('-lb')) {
                    window.location.hash = window.location.hash + '-lb';
                }
            }
            lb.style.display = 'flex';'''
js_content = js_content.replace(old_first_open, new_first_open)

# 2. Update lbSessionClose
old_lb_close = '''            // Attach listeners specific to this session
            window.lbSessionClose = () => {
                bg.style.opacity = '0'; cls.style.opacity = '0'; prevBtn.style.opacity = '0'; nextBtn.style.opacity = '0';'''

new_lb_close = '''            // Attach listeners specific to this session
            window.lbSessionClose = (fromHistory = false) => {
                if (fromHistory !== true && window.location.hash.endsWith('-lb')) {
                    history.back();
                    return;
                }
                bg.style.opacity = '0'; cls.style.opacity = '0'; prevBtn.style.opacity = '0'; nextBtn.style.opacity = '0';'''
js_content = js_content.replace(old_lb_close, new_lb_close)

# 3. Update handleSocialHash
old_handle_social = '''    // Social Hash Routing
    function handleSocialHash() {
        const hash = window.location.hash;
        
        if (hash === '#social-page') {'''

new_handle_social = '''    // Social Hash Routing
    function handleSocialHash() {
        const hash = window.location.hash;
        
        if (hash.endsWith('-lb')) return; // Lightbox state
        
        if (window.lbSessionClose && document.querySelector('.gallery-lightbox-global') && document.querySelector('.gallery-lightbox-global').style.display === 'flex') {
            window.lbSessionClose(true);
        }
        
        if (hash === '#social-page') {'''
js_content = js_content.replace(old_handle_social, new_handle_social)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Lightbox hash routing implemented successfully!')
