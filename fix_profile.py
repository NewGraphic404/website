import codecs
import re

with codecs.open('index.html', 'r', 'utf-8') as f:
    html = f.read()

correct_modal = '''    <!-- Company Profile Modal -->
    <div id="profileModal" class="profile-modal">
        <div class="modal-overlay" id="modalOverlay"></div>
        <div class="modal-container">
            <button class="modal-close" id="closeProfileModal"><span></span></button>
            <div class="modal-content-wrapper">
                <div class="about-extra-content revealed">
                    
                    <div class="about-block">
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
                        <div class="pillar-card">
                            <h4 class="pillar-title" data-i18n="about_vision_title"></h4>
                            <p class="pillar-text" data-i18n="about_vision_p"></p>
                        </div>
                        <div class="pillar-card">
                            <h4 class="pillar-title" data-i18n="about_mission_title"></h4>
                            <p class="pillar-text" data-i18n="about_mission_p"></p>
                        </div>
                        <div class="pillar-card">
                            <h4 class="pillar-title" data-i18n="about_values_title"></h4>
                            <p class="pillar-text" data-i18n="about_values_p"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>'''

# Replace from <!-- Company Profile Modal --> down to the last </div> before <!-- Back to Top Button -->
new_html = re.sub(r'<!-- Company Profile Modal -->\s*<div id="profileModal".*?</div>\s*</div>\s*</div>\s*</div>\s*</div>', correct_modal, html, flags=re.DOTALL)

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(new_html)

print('Fixed profileModal in index.html')
