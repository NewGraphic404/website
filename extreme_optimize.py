import codecs
import re

css_path = r'd:\شغل يوسف\website\styles.css'
with codecs.open(css_path, 'r', 'utf-8') as f:
    css_content = f.read()

# 1. FIX THE HIDDEN MOUSE CURSOR
css_content = css_content.replace('cursor: none !important;', '/* cursor: none !important; */')
css_content = css_content.replace('cursor: none;', '/* cursor: none; */')

# 2. ELIMINATE ALL BACKDROP FILTERS GLOBALLY (Extreme performance boost)
css_content = re.sub(r'backdrop-filter:\s*blur[^;]+;', 'backdrop-filter: none;', css_content)
css_content = re.sub(r'-webkit-backdrop-filter:\s*blur[^;]+;', '-webkit-backdrop-filter: none;', css_content)

# 3. ELIMINATE HEAVY BOX SHADOWS
# We'll reduce large spread/blur box-shadows (e.g. blur radius > 20px)
css_content = re.sub(r'box-shadow:[^;]+(\d{2,}px)[^;]*;', 'box-shadow: none; /* removed heavy shadow */', css_content)

# 4. ELIMINATE HEAVY TEXT SHADOWS
css_content = re.sub(r'text-shadow:[^;]+(\d{2,}px)[^;]*;', 'text-shadow: none; /* removed heavy text shadow */', css_content)

# 5. ELIMINATE HEAVY DROP SHADOW FILTERS
css_content = re.sub(r'filter:\s*drop-shadow[^;]+;', 'filter: none; /* removed heavy drop shadow */', css_content)

# Save the CSS
with codecs.open(css_path, 'w', 'utf-8') as f:
    f.write(css_content)

print('Cursor fixed and extreme performance optimizations applied to CSS!')
