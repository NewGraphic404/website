import codecs

css_path = r'd:\شغل يوسف\website\styles.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css_content = f.read()

# Performance: Reduce extreme blur and drop-shadows
css_content = css_content.replace("backdrop-filter: blur(40px) saturate(240%);", "backdrop-filter: blur(10px) saturate(150%);")
css_content = css_content.replace("-webkit-backdrop-filter: blur(40px) saturate(240%);", "-webkit-backdrop-filter: blur(10px) saturate(150%);")
css_content = css_content.replace("backdrop-filter: blur(20px)", "backdrop-filter: blur(8px)")
css_content = css_content.replace("filter: drop-shadow(0 0 60px var(--purple)) drop-shadow(0 0 100px var(--orange));", "filter: drop-shadow(0 0 20px var(--purple));")
css_content = css_content.replace("filter: drop-shadow(0 0 50px var(--purple-glow)) drop-shadow(0 0 80px var(--orange-glow));", "filter: drop-shadow(0 0 20px var(--purple-glow));")

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css_content)

print('CSS performance optimizations applied safely!')
