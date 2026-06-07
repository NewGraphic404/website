import codecs

# 1. Update index.html
with codecs.open('index.html', 'r', 'utf-8') as f:
    html = f.read()

floating_btn = '''
    <!-- Floating Mobile Order Button -->
    <button id="mobileFloatingOrderBtn" class="mobile-floating-order" aria-label="Order Now">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <span data-i18n="nav_order">اطلب أوردرك</span>
    </button>
'''

if 'mobileFloatingOrderBtn' not in html:
    # Insert right before </body>
    if '</body>' in html:
        html = html.replace('</body>', floating_btn + '\n</body>')
        with codecs.open('index.html', 'w', 'utf-8') as f:
            f.write(html)
        print('Added floating button to index.html')

# 2. Update styles.css
with codecs.open('styles.css', 'r', 'utf-8') as f:
    css = f.read()

floating_css = '''
/* Floating Mobile Order Button */
.mobile-floating-order {
    display: none;
    position: fixed;
    bottom: 25px;
    right: 20px;
    z-index: 900;
    background: var(--gold);
    color: var(--black);
    border: none;
    border-radius: 50px;
    padding: 12px 20px;
    font-size: 1.1rem;
    font-weight: 800;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 15px rgba(245, 166, 35, 0.4);
    cursor: pointer;
    font-family: 'Cairo', sans-serif;
    transition: transform 0.3s ease, background 0.3s ease;
}

.mobile-floating-order:active {
    transform: scale(0.95);
}

@media (max-width: 900px) {
    .mobile-floating-order {
        display: flex;
    }
}
'''

if 'mobile-floating-order' not in css:
    with codecs.open('styles.css', 'a', 'utf-8') as f:
        f.write(floating_css)
    print('Added floating CSS to styles.css')

# 3. Bind mobileFloatingOrderBtn in script.js
with codecs.open('script.js', 'r', 'utf-8') as f:
    js = f.read()

js_addition = '''    const mobileFloatingOrderBtn = document.getElementById('mobileFloatingOrderBtn');
    if (mobileFloatingOrderBtn) {
        mobileFloatingOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(typeof closeMenu === 'function') closeMenu();
            openModal();
        });
    }
'''
if 'mobileFloatingOrderBtn' not in js:
    js = js.replace("const mobileOrderBtn = document.getElementById('mobileOrderBtn');", 
                    "const mobileOrderBtn = document.getElementById('mobileOrderBtn');\n" + js_addition)
    with codecs.open('script.js', 'w', 'utf-8') as f:
        f.write(js)
    print('Added floating JS binding')
