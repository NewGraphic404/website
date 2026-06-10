import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# 1. Performance: Remove console logs in Scroll Reveal
js_content = js_content.replace("console.log('?? Scroll Reveal initialized');", "")
js_content = js_content.replace("console.log('?? Found', elements.length, 'elements with reveal classes');", "")
js_content = js_content.replace("console.warn('?? No elements found with reveal classes!');", "")
js_content = js_content.replace("console.log('??? Element:', entry.target.className, 'Ratio:', entry.intersectionRatio.toFixed(2), 'IsIntersecting:', entry.isIntersecting);", "")
js_content = js_content.replace("console.log('? REVEALED:', entry.target.className);", "")

# 2. Performance: Fix intersection observer thresholds
js_content = js_content.replace("threshold: [0, 0.15, 0.5, 1],", "threshold: [0.15],")

# 3. Performance: Disable infinite marquee massive cloning
js_content = js_content.replace("for (let i = 0; i < 5; i++) track.innerHTML += original;", "for (let i = 0; i < 1; i++) track.innerHTML += original;")
js_content = js_content.replace("singleW = track.scrollWidth / 6;", "singleW = track.scrollWidth / 2;")

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Safe JS performance optimizations applied!')
