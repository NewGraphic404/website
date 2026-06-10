import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# 1. Remove automatic video loading from observer
old_obs_logic = """                    // Lazy load video source to prevent network/CPU overload
                    if (entry.target.classList.contains('video-item')) {
                        const video = entry.target.querySelector('video');
                        if (video && !video.src) {
                            video.src = video.getAttribute('data-src');
                            video.load();
                        }
                    }"""
js_content = js_content.replace(old_obs_logic, "/* video lazy load disabled for mobile performance */")

# 2. Add poster to video items in renderBatch
old_vid_tag = '<video data-src="${file}" class="gallery-video-element" preload="metadata" muted loop playsinline'
new_vid_tag = '<video data-src="${file}" poster="assets/logo_white.png" class="gallery-video-element" preload="none" muted loop playsinline'
js_content = js_content.replace(old_vid_tag, new_vid_tag)

# 3. Add same poster to lightbox video just in case
old_lb_vid = 'el.className = \'gallery-lightbox-video\';'
new_lb_vid = 'el.className = \'gallery-lightbox-video\'; el.poster = "assets/logo_white.png";'
js_content = js_content.replace(old_lb_vid, new_lb_vid)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Disabled auto-loading videos in gallery grid!')
