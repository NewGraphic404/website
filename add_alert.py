import codecs

with codecs.open('script.js', 'r', 'utf-8') as f:
    js = f.read()

target = '''    const toggleLang = () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        updateLanguage();
    };'''

replacement = '''    const toggleLang = () => {
        alert("Button clicked! Current lang was: " + currentLang);
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        alert("Current lang is now: " + currentLang);
        updateLanguage();
    };'''

js = js.replace(target, replacement)

with codecs.open('script.js', 'w', 'utf-8') as f:
    f.write(js)
