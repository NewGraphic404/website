import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

old_openPage_social = '''    const openPage = (directCatKey = null, directSubdirKey = null) => {
        if (socialPage.classList.contains('active')) {
            if (directCatKey) showCategoryDetails(directCatKey, directSubdirKey);
            return;
        }
        triggerTransition(() => {
            socialPage.classList.add('active');'''

new_openPage_social = '''    const openPage = (directCatKey = null, directSubdirKey = null) => {
        if (window.location.hash !== '#social-page' && !window.location.hash.startsWith('#portfolio-')) {
            window.location.hash = '#social-page';
        }
        if (socialPage.classList.contains('active')) {
            if (directCatKey) showCategoryDetails(directCatKey, directSubdirKey);
            return;
        }
        triggerTransition(() => {
            socialPage.classList.add('active');'''
js_content = js_content.replace(old_openPage_social, new_openPage_social)

old_openPage_identity = '''    const openPage = (directClientKey = null) => {
        if (identityPage.classList.contains('active')) {
            if (directClientKey) {
                showClientDetails(directClientKey);
            } else {
                resetView();
            }
            return;
        }
        triggerTransition(() => {
            identityPage.classList.add('active');'''

new_openPage_identity = '''    const openPage = (directClientKey = null) => {
        if (window.location.hash !== '#identity' && !window.location.hash.startsWith('#identity-')) {
            window.location.hash = '#identity';
        }
        if (identityPage.classList.contains('active')) {
            if (directClientKey) {
                showClientDetails(directClientKey);
            } else {
                resetView();
            }
            return;
        }
        triggerTransition(() => {
            identityPage.classList.add('active');'''
js_content = js_content.replace(old_openPage_identity, new_openPage_identity)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('openPage sets hashes now!')
