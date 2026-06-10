import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# 1. Update renderPortfolioCategory
old_render = '''        currentCategoryKey = catKey;
        const lang = document.documentElement.lang || 'ar';
        const categoryName = lang === 'ar' ? data.name_ar : data.name_en;
        const color = '#0f0c1b'; // premium dark theme

        // Perform ripple animation if clicked from grid card
        if (cardElement && !socialPage.classList.contains('expanding')) {'''

new_render = '''        currentCategoryKey = catKey;
        const lang = document.documentElement.lang || 'ar';
        const categoryName = lang === 'ar' ? data.name_ar : data.name_en;
        const color = '#0f0c1b'; // premium dark theme

        if (window.location.hash !== '#portfolio-' + catKey) {
            history.pushState(null, '', '#portfolio-' + catKey);
        }

        // Perform ripple animation if clicked from grid card
        if (cardElement && !socialPage.classList.contains('expanding')) {'''

js_content = js_content.replace(old_render, new_render)

# 2. Update backToSocial event listener
old_back = '''                if (currentCategoryKey === 'social' || currentCategoryKey === 'exhibitions') {
                    closePage();
                } else {
                    // Otherwise go back to main categories selection grid
                    resetSocialView();
                }'''

new_back = '''                if (currentCategoryKey === 'social' || currentCategoryKey === 'exhibitions') {
                    closePage();
                } else {
                    // Otherwise go back to main categories selection grid
                    window.location.hash = 'social-page';
                }'''

js_content = js_content.replace(old_back, new_back)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('History pushState and back navigation fixed!')
