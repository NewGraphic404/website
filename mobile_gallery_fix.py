import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# 1. Remove reveal-up from gallery-item in renderBatch
old_video_str = '<div class="gallery-item video-item reveal-up" data-full="${file}" data-type="video" style="position:relative; cursor:pointer; overflow:hidden; border-radius:12px;">'
new_video_str = '<div class="gallery-item video-item" data-full="${file}" data-type="video" style="position:relative; cursor:pointer; overflow:hidden; border-radius:12px; opacity:1 !important; transform:none !important;">'
js_content = js_content.replace(old_video_str, new_video_str)

old_image_str = '<div class="gallery-item reveal-up" data-full="${file}" data-type="image" style="cursor:pointer; overflow:hidden; border-radius:12px;">'
new_image_str = '<div class="gallery-item" data-full="${file}" data-type="image" style="cursor:pointer; overflow:hidden; border-radius:12px; opacity:1 !important; transform:none !important;">'
js_content = js_content.replace(old_image_str, new_image_str)

# 2. Prevent mouse events on mobile
old_mouse_logic = """                const media = item.querySelector('img, video');
                if (media) {
                    item.addEventListener('mouseenter', () => {"""
new_mouse_logic = """                const media = item.querySelector('img, video');
                if (media && !window.matchMedia("(pointer: coarse)").matches) {
                    item.addEventListener('mouseenter', () => {"""
js_content = js_content.replace(old_mouse_logic, new_mouse_logic)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Mobile gallery optimizations applied safely!')
