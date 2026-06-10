css_path = r'd:\شغل يوسف\website\styles.css'
with open(css_path, 'r', encoding='utf-8', errors='replace') as f:
    if '' in f.read():
        print('styles.css is corrupted!')
    else:
        print('styles.css is fine.')
