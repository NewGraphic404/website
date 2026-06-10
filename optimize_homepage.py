import codecs

css_path = r'd:\شغل يوسف\website\styles.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css_content = f.read()

# 1. Fix Hero Background Video GPU crush
css_content = css_content.replace("filter: grayscale(0.8) brightness(0.5) blur(2px);", "filter: grayscale(0.8) brightness(0.5); /* blur removed for performance */")

# 2. Fix Hero Glow Repaint Loop
css_content = css_content.replace("animation: heroGlow 8s ease-in-out infinite alternate;", "/* animation: heroGlow removed for performance */")

# 3. Disable heavy page transition backdrop filter which runs globally
css_content = css_content.replace("backdrop-filter: blur(20px);", "backdrop-filter: none; /* removed */")
css_content = css_content.replace("-webkit-backdrop-filter: blur(20px);", "-webkit-backdrop-filter: none;")
css_content = css_content.replace("backdrop-filter: blur(10px) saturate(150%);", "backdrop-filter: none;")
css_content = css_content.replace("-webkit-backdrop-filter: blur(10px) saturate(150%);", "-webkit-backdrop-filter: none;")

# 4. Turn off liquid flow animations that repaint layout
css_content = css_content.replace("animation: liquidGlassFlow 12s ease infinite, liquidGlassGlowDark 10s ease infinite;", "")
css_content = css_content.replace("animation: liquidGlassFlow 10s ease infinite, liquidGlassGlowDark 8s ease infinite;", "")

with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css_content)

print('Homepage Specific Performance fixes applied to CSS!')
