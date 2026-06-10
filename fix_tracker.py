import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# 1. Remove popstate listeners
js_content = js_content.replace("\n    window.addEventListener('popstate', handleRouting);", "")
js_content = js_content.replace("\n    window.addEventListener('popstate', handleSocialHash);", "")
js_content = js_content.replace("\n    window.addEventListener('popstate', handleHash);", "")

# 2. Add HashTracker
tracker_code = '''
    // ==========================================
    // Custom Navigation History Tracker
    // ==========================================
    window.HashTracker = {
        stack: [],
        init: function() {
            this.stack.push(window.location.hash);
            window.addEventListener('hashchange', () => {
                this.stack.push(window.location.hash);
            });
        },
        goBack: function(fallbackHash) {
            if (this.stack.length > 1) {
                history.back();
            } else {
                window.location.hash = fallbackHash;
            }
        }
    };
    window.HashTracker.init();
'''
# Insert after DOMContentLoaded
js_content = js_content.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', () => {\n" + tracker_code)

# 3. Update renderPortfolioCategory
old_render = '''        if (window.location.hash !== "#portfolio-" + catKey) {
            history.pushState(null, "", "#portfolio-" + catKey);
        }

        // Perform ripple animation if clicked from grid card
        if (cardElement && !socialPage.classList.contains('expanding')) {'''

new_render = '''        // Perform ripple animation if clicked from grid card
        if (cardElement && !socialPage.classList.contains('expanding')) {
            window.isAnimatingRipple = true;
            window.location.hash = "#portfolio-" + catKey;
'''
js_content = js_content.replace(old_render, new_render)

# 4. Update ripple timeout
old_ripple_timeout = '''                setTimeout(() => {
                    showCategoryDetails(catKey);
                    ripple.style.opacity = '0';
                    setTimeout(() => {
                        ripple.remove();
                        socialPage.classList.remove('expanding');
                    }, 400);
                }, 750);'''

new_ripple_timeout = '''                setTimeout(() => {
                    window.isAnimatingRipple = false;
                    showCategoryDetails(catKey);
                    ripple.style.opacity = '0';
                    setTimeout(() => {
                        ripple.remove();
                        socialPage.classList.remove('expanding');
                    }, 400);
                }, 750);'''
js_content = js_content.replace(old_ripple_timeout, new_ripple_timeout)

# 5. Update handleSocialHash
old_social_hash = '''            } else if (currentCategoryKey !== catKey || currentViewLevel !== 'gallery') {
                showCategoryDetails(catKey);
            }'''

new_social_hash = '''            } else if (currentCategoryKey !== catKey || currentViewLevel !== 'gallery') {
                if (!window.isAnimatingRipple) {
                    showCategoryDetails(catKey);
                }
            }'''
js_content = js_content.replace(old_social_hash, new_social_hash)

# 6. Update backToSocial
old_back_social = '''                } else {
                    // Otherwise go back to main categories selection grid
                    window.location.hash = "social-page";
                }'''

new_back_social = '''                } else {
                    // Otherwise go back to main categories selection grid
                    window.HashTracker.goBack('social-page');
                }'''
js_content = js_content.replace(old_back_social, new_back_social)

# 7. Update backToIdentityGrid
old_back_identity = '''    if (backToIdentityGrid) {
        backToIdentityGrid.addEventListener('click', () => {
            window.location.hash = 'identity';
        });
    }'''

new_back_identity = '''    if (backToIdentityGrid) {
        backToIdentityGrid.addEventListener('click', () => {
            window.HashTracker.goBack('identity');
        });
    }'''
js_content = js_content.replace(old_back_identity, new_back_identity)

# 8. Update backToProvinces
old_back_provinces = '''    backToProvinces.addEventListener('click', () => {
        window.location.hash = 'clients';
    });'''

new_back_provinces = '''    backToProvinces.addEventListener('click', () => {
        window.HashTracker.goBack('clients');
    });'''
js_content = js_content.replace(old_back_provinces, new_back_provinces)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('HashTracker injected successfully!')
