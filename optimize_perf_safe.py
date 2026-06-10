import os

js_path = r'd:\شغل يوسف\website\script.js'
with open(js_path, 'r', encoding='utf-8') as f:
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

# 4. Temporarily disable heavy plugins to test speed
js_content = js_content.replace("initScrollReveal();", "// initScrollReveal();")
js_content = js_content.replace("initCinematicPartners();", "// initCinematicPartners();")
js_content = js_content.replace("initCustomCursor();", "// initCustomCursor();")
js_content = js_content.replace("initFooterMarquee();", "// initFooterMarquee();")

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

css_path = r'd:\شغل يوسف\website\styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Performance: Reduce extreme blur and drop-shadows
css_content = css_content.replace("backdrop-filter: blur(40px) saturate(240%);", "backdrop-filter: blur(10px) saturate(150%);")
css_content = css_content.replace("-webkit-backdrop-filter: blur(40px) saturate(240%);", "-webkit-backdrop-filter: blur(10px) saturate(150%);")
css_content = css_content.replace("backdrop-filter: blur(20px)", "backdrop-filter: blur(8px)")
css_content = css_content.replace("filter: drop-shadow(0 0 60px var(--purple)) drop-shadow(0 0 100px var(--orange));", "filter: drop-shadow(0 0 20px var(--purple));")
css_content = css_content.replace("filter: drop-shadow(0 0 50px var(--purple-glow)) drop-shadow(0 0 80px var(--orange-glow));", "filter: drop-shadow(0 0 20px var(--purple-glow));")

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

print('Performance and safe text replacement applied!')
