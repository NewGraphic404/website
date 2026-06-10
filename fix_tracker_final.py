import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Fix double injection of HashTracker
js_content = js_content.replace('''    // ==========================================
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
''', '', 1) # remove the first one if there are two

# Update backToSocial
js_content = re.sub(
    r'window\.location\.hash\s*=\s*["\']social-page["\'];',
    r'window.HashTracker.goBack("social-page");',
    js_content
)

# Update backToIdentityGrid
js_content = re.sub(
    r'window\.location\.hash\s*=\s*[\'"]identity[\'"];',
    r'window.HashTracker.goBack("identity");',
    js_content
)

# Update backToProvinces
js_content = re.sub(
    r'window\.location\.hash\s*=\s*[\'"]clients[\'"];',
    r'window.HashTracker.goBack("clients");',
    js_content
)

# Update handleSocialHash to use isAnimatingRipple correctly
js_content = re.sub(
    r'(\}\s*else\s*if\s*\(\s*currentCategoryKey\s*!==\s*catKey\s*\|\|\s*currentViewLevel\s*!==\s*\'gallery\'\s*\)\s*\{)(\s*showCategoryDetails\(catKey\);\s*)(\})',
    r'\1\n                if (!window.isAnimatingRipple) {\n                    showCategoryDetails(catKey);\n                }\n            }',
    js_content
)


with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('HashTracker applied correctly!')
