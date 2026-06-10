import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Fix the accidental regex matches
js_content = js_content.replace('''    clientsLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.HashTracker.goBack("clients");
    });''', '''    clientsLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = "clients";
    });''')

js_content = js_content.replace('''    if (navIdentity) {
        navIdentity.addEventListener('click', (e) => {
            e.preventDefault();
            window.HashTracker.goBack("identity");
        });
    }''', '''    if (navIdentity) {
        navIdentity.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = "identity";
        });
    }''')

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Nav links fixed!')
