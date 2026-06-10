import os

js_path = r'd:\شغل يوسف\website\script.js'
with open(js_path, 'r', encoding='utf-8', errors='ignore') as f:
    js_content = f.read()

# 1. Performance: Remove console logs in Scroll Reveal ONLY
js_content = js_content.replace("console.log('?? Scroll Reveal initialized');", "")
js_content = js_content.replace("console.log('?? Found', elements.length, 'elements with reveal classes');", "")
js_content = js_content.replace("console.log('??? Element:', entry.target.className, 'Ratio:', entry.intersectionRatio.toFixed(2), 'IsIntersecting:', entry.isIntersecting);", "")
js_content = js_content.replace("console.log('? REVEALED:', entry.target.className);", "")

# 2. Performance: Disable infinite marquee massive cloning
js_content = js_content.replace("for (let i = 0; i < 5; i++) track.innerHTML += original;", "for (let i = 0; i < 1; i++) track.innerHTML += original;")
js_content = js_content.replace("singleW = track.scrollWidth / 6;", "singleW = track.scrollWidth / 2;")

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

css_path = r'd:\شغل يوسف\website\styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Performance: Reduce extreme blur and drop-shadows
css_content = css_content.replace("backdrop-filter: blur(40px) saturate(240%);", "backdrop-filter: blur(10px) saturate(150%);")
css_content = css_content.replace("-webkit-backdrop-filter: blur(40px) saturate(240%);", "-webkit-backdrop-filter: blur(10px) saturate(150%);")
css_content = css_content.replace("backdrop-filter: blur(20px)", "backdrop-filter: blur(8px)")

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

print('Fixed!')
