import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# 1. PAUSE CINEMATIC PARTNERS MARQUEE WHEN NOT IN VIEW
old_cine_animate = """    function animate() {
        if (!clientsSection) return;
        
        currentX -= speed;
        // Reset seamlessly when one full original width is scrolled
        if (Math.abs(currentX) >= singleW) {
            currentX = 0;
        }
        
        track.style.transform = `translateX(${currentX}px)`;
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();"""
new_cine_animate = """    let isCineVisible = true;
    function animate() {
        if (!clientsSection) return;
        if (isCineVisible) {
            currentX -= speed;
            if (Math.abs(currentX) >= singleW) {
                currentX = 0;
            }
            track.style.transform = `translateX(${currentX}px)`;
        }
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation with observer
    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => {
            isCineVisible = entries[0].isIntersecting;
        }).observe(clientsSection);
    }
    animate();"""
js_content = js_content.replace(old_cine_animate, new_cine_animate)

# 2. PAUSE FOOTER MARQUEE WHEN NOT IN VIEW
old_footer_animate = """    function animate() {
        if (!footerBar) return;
        
        currentX -= speed;
        // Reset seamlessly when one full original width is scrolled
        if (Math.abs(currentX) >= singleW) {
            currentX = 0;
        }
        
        track.style.transform = `translateX(${currentX}px)`;
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();"""
new_footer_animate = """    let isFooterVisible = true;
    function animate() {
        if (!footerBar) return;
        if (isFooterVisible) {
            currentX -= speed;
            if (Math.abs(currentX) >= singleW) {
                currentX = 0;
            }
            track.style.transform = `translateX(${currentX}px)`;
        }
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation with observer
    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => {
            isFooterVisible = entries[0].isIntersecting;
        }).observe(footerBar);
    }
    animate();"""
js_content = js_content.replace(old_footer_animate, new_footer_animate)

# 3. PAUSE HERO VIDEO WHEN OVERLAY IS OPEN
old_social_open = """    function initSocialPage() {
        const triggers = document.querySelectorAll('.category-trigger[data-cat]');
        const socialPage = document.getElementById('socialPage');"""
new_social_open = """    function initSocialPage() {
        const triggers = document.querySelectorAll('.category-trigger[data-cat]');
        const socialPage = document.getElementById('socialPage');
        const heroVideo = document.getElementById('showreelVideo');"""
js_content = js_content.replace(old_social_open, new_social_open)

old_social_active = """        socialPage.classList.add('active');
        socialPage.style.display = 'block';"""
new_social_active = """        socialPage.classList.add('active');
        socialPage.style.display = 'block';
        if (heroVideo) heroVideo.pause();"""
js_content = js_content.replace(old_social_active, new_social_active)

old_social_close = """        if (!socialPage.classList.contains('active')) return;
        triggerTransition(() => {
            socialPage.classList.remove('active');"""
new_social_close = """        if (!socialPage.classList.contains('active')) return;
        triggerTransition(() => {
            socialPage.classList.remove('active');
            if (heroVideo) heroVideo.play().catch(()=>{});"""
js_content = js_content.replace(old_social_close, new_social_close)

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print('Background animations and videos are now paused when offscreen/modal open!')
