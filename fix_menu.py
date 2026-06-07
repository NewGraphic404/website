import codecs
import re

# 1. Update index.html
with codecs.open('index.html', 'r', 'utf-8') as f:
    html = f.read()

old_ul = re.search(r'<ul class=\"mobile-nav-list\">.*?</ul>', html, re.DOTALL)

new_ul = '''<ul class="mobile-nav-list">
                <li><a href="#" id="mobileOrderBtn" class="mobile-nav-link" style="color: var(--gold)"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg><span data-i18n="nav_order">اطلب اوردرك</span></a></li>
                <li><a href="#identityPage" id="mobileNavIdentity" class="mobile-nav-link"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg><span data-i18n="nav_identity">هوية بصرية</span></a></li>
                <li><a href="#portfolio-print" id="mobileNavPrints" class="mobile-nav-link"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg><span data-i18n="nav_print">مطبوعات</span></a></li>
                <li><a href="#portfolio-outdoor" id="mobileNavOutdoor" class="mobile-nav-link"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="12" x="3" y="4" rx="1"/><path d="M8 20h8M12 16v4"/></svg><span data-i18n="nav_outdoor">Outdoor</span></a></li>
                <li><a href="#social-page" id="mobileNavSocial" class="mobile-nav-link"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20.5V20m0 0v-4m0 4h4m-4 0H8M19 12h1.5M19 12a7 7 0 10-14 0c0 3.866 3.134 7 7 7M19 12h-4"/></svg><span data-i18n="nav_social">Social</span></a></li>
                <li><a href="#portfolio-giveaway" id="mobileNavGiveaway" class="mobile-nav-link"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg><span data-i18n="nav_giveaway">Giveaway</span></a></li>
                <li><a href="#portfolio-exhibitions" id="mobileNavExhibitions" class="mobile-nav-link"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg><span data-i18n="nav_exhibitions">تنظيم معارض</span></a></li>
                <li><a href="#clients-section" class="mobile-nav-link"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg><span data-i18n="nav_partners">شركاء النجاح</span></a></li>
                <li><a href="#clientsPage" class="mobile-nav-link"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg><span data-i18n="nav_our_clients">عملاؤنا</span></a></li>
                <li><a href="https://www.google.com/maps/search/%D8%A7%D9%84%D9%81%D8%B1%D8%B9+%D8%A7%D9%84%D8%A7%D9%88%D9%84+%D8%A8%D9%88%D8%B1%D8%B3%D8%B9%D9%8A%D8%AF+%D8%B4%D8%A7%D8%B1%D8%B9+%D8%A7%D9%84%D8%AB%D9%84%D8%A7%D8%AB%D9%8A%D9%86%D9%8A+%D8%A8%D8%B1%D8%AC+%D8%A7%D9%84%D8%AD%D9%8A%D8%A7%D9%87+%D8%A8%D9%84%D8%A7%D8%B2%D8%A7+%D8%A7%D9%84%D8%AF%D9%88%D8%B1+%D8%A7%D9%84%D8%B3%D8%A7%D8%AF%D8%B3%E2%80%AD/@31.2594832,32.2941002,13z?utm_campaign=ml-ardl&g_ep=Eg1tbF8yMDI2MDUyN18wIJvbDyoASAJQAQ%3D%3D" target="_blank" class="mobile-nav-link"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span data-i18n="loc_portsaid_branch">فرع بورسعيد</span></a></li>
                <li><a href="https://www.google.com/maps/search/%D8%AF%D9%85%D9%8A%D8%A7%D8%B7+%D8%A7%D9%84%D8%AC%D8%AF%D9%8A%D8%AF%D9%87+%D8%A7%D9%84%D9%85%D9%86%D8%B7%D9%82%D9%87+%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2%D9%8A%D9%87+%D9%81%D9%88%D9%82+%D9%83%D8%A7%D9%81%D9%8A%D9%87+%D8%A8%D8%A7%D9%88%D9%84%D9%88%E2%80%AD/@31.4383498,31.675964,16z?utm_campaign=ml-ardl&g_ep=Eg1tbF8yMDI2MDUyN18wIJvbDyoASAJQAQ%3D%3D" target="_blank" class="mobile-nav-link"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span data-i18n="loc_damietta_branch">فرع دمياط</span></a></li>
                <li><a href="#" class="mobile-nav-link" id="mobileSupportBtn"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg><span data-i18n="nav_support">الدعم</span></a></li>
                <li><a href="#" class="mobile-nav-link" id="mobileComplaintsBtn"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span data-i18n="nav_complaints">الشكاوى والاقتراحات</span></a></li>
                <li><button id="mobileContactBtn" class="mobile-nav-link mobile-nav-link--cta" style="background:none;border:none;cursor:pointer;width:100%;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg><span data-i18n="nav_contact">تواصل معنا</span></button></li>
            </ul>'''

if old_ul:
    html = html.replace(old_ul.group(0), new_ul)
    with codecs.open('index.html', 'w', 'utf-8') as f:
        f.write(html)
    print('Updated index.html')
else:
    print('Could not find old_ul in index.html')

# 2. Update styles.css
with codecs.open('styles.css', 'r', 'utf-8') as f:
    css = f.read()
    
# Change display: block; to display: flex; align-items: center; justify-content: center; gap: 15px;
css = re.sub(r'(\.mobile-nav-link\s*\{[^}]*)display:\s*block;', r'\1display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 15px;', css)

with codecs.open('styles.css', 'w', 'utf-8') as f:
    f.write(css)
print('Updated styles.css')

# 3. Bind mobileOrderBtn in script.js
with codecs.open('script.js', 'r', 'utf-8') as f:
    js = f.read()

# Look for: const navBtn     = document.getElementById('navOrderBtn');
bind_code = '''    const mobileOrderBtn = document.getElementById('mobileOrderBtn');
'''
js = js.replace("const navBtn     = document.getElementById('navOrderBtn');", 
                "const navBtn     = document.getElementById('navOrderBtn');\n" + bind_code)

# Look for: if (navBtn) navBtn.addEventListener('click', openModal);
# and add the mobile binding right after it.
bind_event = '''    if (mobileOrderBtn) {
        mobileOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(typeof closeMenu === 'function') closeMenu();
            openModal();
        });
    }'''

js = js.replace("if (navBtn) navBtn.addEventListener('click', openModal);", 
                "if (navBtn) navBtn.addEventListener('click', openModal);\n" + bind_event)

with codecs.open('script.js', 'w', 'utf-8') as f:
    f.write(js)
print('Updated script.js')
