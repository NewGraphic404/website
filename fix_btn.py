import codecs
import re

with codecs.open('index.html', 'r', 'utf-8') as f:
    html = f.read()

# 1. Restore the missing blocks
missing_html = '''                    <div class="about-block">
                        <h3 class="about-block-title" data-i18n="about_story_title"></h3>
                        <p class="about-text" data-i18n="about_story_p"></p>
                    </div>

                    <div class="about-block">
                        <h3 class="about-block-title" data-i18n="about_services_title"></h3>
                        <ul class="about-services-list">
                            <li data-i18n="about_s1"></li>
                            <li data-i18n="about_s2"></li>
                            <li data-i18n="about_s3"></li>
                            <li data-i18n="about_s4"></li>
                            <li data-i18n="about_s5"></li>
                            <li data-i18n="about_s6"></li>
                            <li data-i18n="about_s7"></li>
                            <li data-i18n="about_s8"></li>
                            <li data-i18n="about_s9"></li>
                        </ul>
                    </div>

                    <div class="about-pillars">
'''

target_restore = '<!-- Same structure as before, just in a modal -->\n                        <div class="pillar-card">'
if target_restore in html:
    html = html.replace(target_restore, '<!-- Same structure as before, just in a modal -->\n' + missing_html + '                        <div class="pillar-card">')
    print('Restored missing HTML')
else:
    print('Could not find target to restore')

# 2. Fix the floating button text
# Remove <span data-i18n="nav_order">...</span> from mobileFloatingOrderBtn
html = re.sub(r'(<button id="mobileFloatingOrderBtn"[^>]*>.*?)(<span data-i18n="nav_order">.*?</span>)(.*?</button>)', r'\1\3', html, flags=re.DOTALL)

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(html)
print('Fixed index.html')

# 3. Update styles.css
with codecs.open('styles.css', 'r', 'utf-8') as f:
    css = f.read()

css = css.replace('background: var(--gold);', 'background: var(--orange);')
css = css.replace('padding: 12px 20px;', 'width: 60px; height: 60px; justify-content: center; padding: 0;')

with codecs.open('styles.css', 'w', 'utf-8') as f:
    f.write(css)
print('Fixed styles.css')
