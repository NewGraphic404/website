# 🔧 QUICK FIXES - Common Issues & Solutions

## 🚨 IF IMAGES DON'T LOAD

### Problem: Social gallery shows "لا توجد صور"
**Solution:**
```javascript
// Check if PORTFOLIO_IMAGES is loaded
console.log(window.PORTFOLIO_IMAGES);
// Should show: { mockups: [...], exhibitions: [...], outdoor: [...] }
```

**Fix:** Make sure `<script src="assets/portfolio-images.js"></script>` is in HTML `<head>`

---

### Problem: Images show broken icon
**Solution:**
1. Check file paths in `assets/portfolio-images.js`
2. Verify images exist in folders:
   - `assets/social/mockups/`
   - `assets/social/exhibitions/`
   - `assets/social/outdoor/`

**Quick Fix:**
```javascript
// In browser console:
fetch('assets/social/mockups/1 (18).jpg')
  .then(r => console.log('Image exists:', r.ok))
  .catch(e => console.log('Image missing:', e));
```

---

## 🎨 IF LIGHTBOX ANIMATION IS NOT SMOOTH

### Problem: Lightbox doesn't scale smoothly
**Solution:** Check if this CSS exists in `styles.css`:

```css
.gallery-lightbox-img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
    z-index: 1;
    transition: transform 0.18s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.15s ease;
}
```

**If missing, add it around line 4380**

---

### Problem: Arrow keys don't work
**Solution:** Check browser console for errors. The keyboard handler should be attached.

**Quick Fix:**
```javascript
// In browser console while lightbox is open:
document.addEventListener('keydown', (e) => {
    console.log('Key pressed:', e.key);
});
// Should log when you press arrow keys
```

---

## 📱 IF MOBILE MENU DOESN'T WORK

### Problem: Hamburger icon doesn't open menu
**Solution:** Check if menu toggle is visible:

```javascript
// In browser console:
const toggle = document.getElementById('menuToggleFixed');
console.log('Toggle exists:', !!toggle);
console.log('Toggle visible:', window.getComputedStyle(toggle).display);
```

**Fix:** Should show `display: flex` on mobile (< 1340px width)

---

### Problem: Menu opens but doesn't close
**Solution:** Check if click handlers are attached:

```javascript
// In browser console:
const toggle = document.getElementById('menuToggleFixed');
toggle.click(); // Should toggle menu
```

---

## 🎯 IF SOCIAL PAGE DOESN'T OPEN

### Problem: Clicking "سوشيال" does nothing
**Solution:** Check if click handler is attached:

```javascript
// In browser console:
const navSocial = document.getElementById('navSocial');
console.log('Social nav exists:', !!navSocial);
console.log('Has click handler:', navSocial.onclick !== null);
```

**Fix:** Make sure `initSocialPage()` is called in `DOMContentLoaded`

---

### Problem: Social page opens but shows blank
**Solution:** Check if elements exist:

```javascript
// In browser console:
console.log('Social page:', !!document.getElementById('socialPage'));
console.log('Social grid:', !!document.getElementById('socialGrid'));
console.log('Social detail:', !!document.getElementById('socialDetailView'));
```

**All should return `true`**

---

## 🌈 IF COLORS LOOK WRONG

### Problem: Social page has purple background instead of white
**Solution:** Check this line in `script.js` (around line 2020):

```javascript
socialPage.style.background = '#ffffff'; // Should be white
```

**If it says `bgColor` or purple color, change it to `'#ffffff'`**

---

### Problem: Header doesn't change color on scroll
**Solution:** Check if `initHeader()` is called:

```javascript
// In browser console:
const header = document.getElementById('mainHeader');
console.log('Header classes:', header.className);
// Should show: main-header scrolled header--light (or header--orange)
```

---

## 🔄 IF TRANSITIONS ARE JERKY

### Problem: Page transition is not smooth
**Solution:** Check if GPU acceleration is enabled:

```css
/* Add to .page-transition-overlay in styles.css */
.page-transition-overlay {
    transform: translateZ(0); /* Force GPU acceleration */
    will-change: opacity;
}
```

---

### Problem: Lightbox slides are choppy
**Solution:** Reduce image size or add this CSS:

```css
.gallery-lightbox-img {
    transform: translateZ(0); /* Force GPU acceleration */
    backface-visibility: hidden;
}
```

---

## 🖱️ IF CUSTOM CURSOR DOESN'T WORK

### Problem: Custom cursor not visible
**Solution:** Check if cursor element exists:

```javascript
// In browser console:
const cursor = document.getElementById('customCursor');
console.log('Cursor exists:', !!cursor);
console.log('Cursor visible:', window.getComputedStyle(cursor).display);
```

**Fix:** Make sure `initCustomCursor()` is called

---

## 📊 IF LAYOUT LOOKS BROKEN

### Problem: Elements overlap or misaligned
**Solution:** Check viewport meta tag in HTML `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5, user-scalable=yes">
```

**Should be present!**

---

### Problem: Mobile layout doesn't work
**Solution:** Check media queries are loading:

```javascript
// In browser console:
const isMobile = window.matchMedia('(max-width: 768px)').matches;
console.log('Is mobile:', isMobile);
```

---

## 🔊 IF CONSOLE SHOWS ERRORS

### Error: "Failed to load social images"
**Solution:**
1. Check if `assets/social-images.json` exists
2. Check if `window.PORTFOLIO_IMAGES` is defined
3. Verify `assets/portfolio-images.js` is loaded

**Quick Fix:**
```javascript
// In browser console:
console.log('PORTFOLIO_IMAGES loaded:', !!window.PORTFOLIO_IMAGES);
```

---

### Error: "Cannot read property 'classList' of null"
**Solution:** An element is missing from HTML. Check the element ID in the error message.

**Example:**
```
Error: Cannot read property 'classList' of null at socialPage
```
**Fix:** Make sure `<section id="socialPage">` exists in HTML

---

### Error: "Uncaught TypeError: X is not a function"
**Solution:** Function is not defined or not loaded yet.

**Fix:** Make sure all functions are defined before calling them:
```javascript
// Check if function exists before calling
if (typeof initSocialPage === 'function') {
    initSocialPage();
}
```

---

## 🎭 IF ANIMATIONS DON'T PLAY

### Problem: Liquid ripple doesn't show
**Solution:** Check if `.liquid-ripple` CSS exists:

```css
.liquid-ripple {
    position: fixed;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
    z-index: 99999;
}

.liquid-ripple.active {
    transform: translate(-50%, -50%) scale(1);
}
```

**Should be around line 3800 in styles.css**

---

### Problem: Scale-up animation doesn't work
**Solution:** Check if origin rect is calculated:

```javascript
// Add this to openLightbox function for debugging:
console.log('Origin rect:', originRect);
// Should show: { top: X, left: Y, width: Z, height: W }
```

---

## 🌍 IF LANGUAGE TOGGLE DOESN'T WORK

### Problem: Clicking EN/AR doesn't change language
**Solution:** Check if `updateLanguage()` function exists:

```javascript
// In browser console:
console.log('Current lang:', document.documentElement.lang);
// Should show: 'ar' or 'en'
```

**Fix:** Make sure `initLocalization()` is called

---

## 🔗 IF LINKS DON'T WORK

### Problem: Navigation links don't scroll
**Solution:** Check if `initSmoothScroll()` is called:

```javascript
// In browser console:
document.querySelector('a[href="#hero"]').click();
// Should scroll to hero section
```

---

### Problem: Email links don't open Gmail
**Solution:** Check link format:

```html
<!-- Should be: -->
<a href="https://mail.google.com/mail/?view=cm&to=e.newgraphic@gmail.com" target="_blank">
```

---

## 💾 IF CHANGES DON'T APPEAR

### Problem: Made changes but nothing happens
**Solution:**
1. **Hard refresh:** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Clear cache:** DevTools → Network → Disable cache
3. **Incognito mode:** Test in private/incognito window

---

### Problem: CSS changes don't apply
**Solution:** Check if CSS file is loaded:

```javascript
// In browser console:
const styles = document.querySelector('link[href="styles.css"]');
console.log('CSS loaded:', !!styles);
```

---

## 🎯 NUCLEAR OPTION (If Nothing Works)

### Complete Reset:
1. Close all browser tabs
2. Clear browser cache completely
3. Restart browser
4. Open website in incognito mode
5. Check browser console for errors
6. Test one feature at a time

### Verify Files:
```bash
# Check if all files exist:
ls -la index.html
ls -la styles.css
ls -la script.js
ls -la assets/portfolio-images.js
ls -la assets/social-images.json
```

### Verify Structure:
```
website/
├── index.html ✓
├── styles.css ✓
├── script.js ✓
└── assets/
    ├── logo.png ✓
    ├── portfolio-images.js ✓
    ├── social-images.json ✓
    ├── social/
    │   ├── mockups/ (319 images) ✓
    │   ├── exhibitions/ (47 images) ✓
    │   └── outdoor/ (49 images) ✓
    ├── social-compressed/ (optional)
    └── social-thumbs/ (optional)
```

---

## 📞 EMERGENCY DEBUGGING

### Step 1: Open DevTools
Press **F12** or **Right-click → Inspect**

### Step 2: Check Console
Look for red errors. Common ones:
- `404 Not Found` → File missing
- `Uncaught TypeError` → Code error
- `CORS error` → File protocol issue (use local server)

### Step 3: Check Network
- All files should show **200 OK**
- Images should load (green status)
- No 404 errors (red status)

### Step 4: Check Elements
- Inspect element that's not working
- Check if CSS is applied
- Check if element exists in DOM

### Step 5: Check Sources
- Verify all files are loaded
- Check if JavaScript is running
- Set breakpoints to debug

---

## 🎓 DEBUGGING TIPS

### Tip 1: Use Console.log
```javascript
// Add to any function to debug:
console.log('Function called:', functionName);
console.log('Variable value:', variableName);
```

### Tip 2: Check Element Exists
```javascript
// Before using an element:
const element = document.getElementById('elementId');
if (!element) {
    console.error('Element not found:', 'elementId');
    return;
}
```

### Tip 3: Test in Isolation
```javascript
// Test one feature at a time:
// Comment out other code
// initSocialPage(); // Test this
// initClientsPage(); // Comment this
```

### Tip 4: Use Browser DevTools
- **Elements tab:** Inspect HTML/CSS
- **Console tab:** See errors/logs
- **Network tab:** Check file loading
- **Sources tab:** Debug JavaScript
- **Performance tab:** Check speed

---

## ✅ VERIFICATION COMMANDS

### Check if everything is loaded:
```javascript
// Paste in browser console:
console.log('HTML loaded:', document.readyState);
console.log('Images loaded:', !!window.PORTFOLIO_IMAGES);
console.log('Social page exists:', !!document.getElementById('socialPage'));
console.log('Lightbox CSS exists:', !!document.querySelector('.gallery-lightbox'));
console.log('All good!');
```

### Check image counts:
```javascript
// Paste in browser console:
if (window.PORTFOLIO_IMAGES) {
    console.log('Mockups:', window.PORTFOLIO_IMAGES.mockups.length);
    console.log('Exhibitions:', window.PORTFOLIO_IMAGES.exhibitions.length);
    console.log('Outdoor:', window.PORTFOLIO_IMAGES.outdoor.length);
    console.log('Total:', 
        window.PORTFOLIO_IMAGES.mockups.length + 
        window.PORTFOLIO_IMAGES.exhibitions.length + 
        window.PORTFOLIO_IMAGES.outdoor.length
    );
}
```

**Expected output:**
```
Mockups: 319
Exhibitions: 47
Outdoor: 49
Total: 415
```

---

## 🎉 SUCCESS INDICATORS

### Everything is working if:
- ✅ No red errors in console
- ✅ All images load (check Network tab)
- ✅ Lightbox opens smoothly
- ✅ Arrows navigate between images
- ✅ Keyboard shortcuts work
- ✅ Mobile menu works
- ✅ Social page opens
- ✅ Animations are smooth
- ✅ No layout issues
- ✅ All links work

---

**Remember:** Most issues are caused by:
1. **Cache** - Clear it!
2. **File paths** - Check them!
3. **Missing files** - Verify they exist!
4. **Typos** - Double-check spelling!
5. **Browser compatibility** - Test in different browsers!

**If all else fails, check the full report in `WEBSITE_CHECKUP_REPORT.md`**
