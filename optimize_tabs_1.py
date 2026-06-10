import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# 1. Eliminate console logs in initScrollReveal
js_content = re.sub(r'console\.log\([^)]*Scroll Reveal initialized[^)]*\);', '', js_content)
js_content = re.sub(r'console\.log\([^)]*Found[^)]*elements with reveal classes[^)]*\);', '', js_content)
js_content = re.sub(r'console\.warn\([^)]*No elements found with reveal classes[^)]*\);', '', js_content)
js_content = re.sub(r'console\.log\([^)]*Element:[^)]*Ratio:[^)]*IsIntersecting:[^)]*\);', '', js_content)
js_content = re.sub(r'console\.log\([^)]*REVEALED:[^)]*\);', '', js_content)

# Fix IntersectionObserver threshold to not fire constantly
js_content = js_content.replace('threshold: [0, 0.15, 0.5, 1]', 'threshold: [0.15]')

# 2. Fix Marquees cloning
js_content = js_content.replace('for (let i = 0; i < 5; i++) track.innerHTML += original;', 'for (let i = 0; i < 1; i++) track.innerHTML += original;')
js_content = js_content.replace('singleW = track.scrollWidth / 6;', 'singleW = track.scrollWidth / 2;')

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('ScrollReveal and Marquee Optimized!')
