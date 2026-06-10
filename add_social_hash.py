import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Add hashchange listener to initSocialPage
insertion_point = "    // Mobile clients link - open clients page"

social_hash_handler = '''
    // Social Hash Routing
    function handleSocialHash() {
        const hash = window.location.hash;
        
        if (hash === '#social-page') {
            if (!socialPage.classList.contains('active')) {
                triggerTransition(() => {
                    socialPage.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    resetSocialView();
                });
            } else {
                resetSocialView();
            }
        } else if (hash.startsWith('#portfolio-')) {
            const catKey = hash.replace('#portfolio-', '');
            if (!socialPage.classList.contains('active')) {
                triggerTransition(() => {
                    socialPage.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    showCategoryDetails(catKey);
                });
            } else if (currentCategoryKey !== catKey || currentViewLevel !== 'gallery') {
                showCategoryDetails(catKey);
            }
        } else {
            // Close social page if navigating away
            if (socialPage.classList.contains('active') && !hash.startsWith('#social') && !hash.startsWith('#portfolio')) {
                closePage(true); // Call closePage with true to skip hash clearing
            }
        }
    }
    window.addEventListener('hashchange', handleSocialHash);
    setTimeout(handleSocialHash, 2900);

'''

if insertion_point in js_content:
    js_content = js_content.replace(insertion_point, social_hash_handler + insertion_point)
    with codecs.open(js_path, 'w', 'utf-8') as f:
        f.write(js_content)
    print('Added social hash routing!')
else:
    print('Could not find insertion point!')
