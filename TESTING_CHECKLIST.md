# ✅ TESTING CHECKLIST - New Graphic Website

## 🖥️ DESKTOP TESTING (1920x1080)

### Navigation
- [ ] Click "من نحن" - scrolls to about section
- [ ] Hover "سوشيال" - dropdown appears with 3 items
- [ ] Click "موك أبز" from dropdown - opens social page with mockups
- [ ] Click "أوت دور" from dropdown - opens social page with outdoor
- [ ] Click "معارض" from dropdown - opens social page with exhibitions
- [ ] Click "عملاؤنا" - scrolls to clients section
- [ ] Click "تواصل معنا" - opens email modal
- [ ] Language toggle (EN/AR) - switches language

### Social Page
- [ ] Click "سوشيال" in nav - opens social page
- [ ] See 3 cards: Mockups (left), Outdoor (center), Exhibitions (right)
- [ ] Background is white (not purple)
- [ ] Click Mockups card - liquid ripple animation plays
- [ ] Gallery shows 319 images in grid
- [ ] Click any image - lightbox opens with scale-up animation
- [ ] Click right arrow - next image slides in smoothly
- [ ] Click left arrow - previous image slides in smoothly
- [ ] Press → key - navigates to next image
- [ ] Press ← key - navigates to previous image
- [ ] Press ESC - lightbox closes with scale-down animation
- [ ] Click outside image - lightbox closes
- [ ] Click X button - lightbox closes
- [ ] Click "رجوع" - returns to category selection
- [ ] Click X at top - closes social page

### Portfolio Section (Main Page)
- [ ] See 3 blocks: Outdoor (top), Mockups (middle, full-width), Exhibitions (bottom)
- [ ] NO "مطبوعات" block visible
- [ ] Mockups block is wider than others
- [ ] Mockups block height is shorter (280-400px)
- [ ] Click Outdoor block - opens social page → outdoor category
- [ ] Click Mockups block - opens social page → mockups category
- [ ] Click Exhibitions block - opens social page → exhibitions category

### Clients Section
- [ ] Cinematic slider with client names
- [ ] Click any client card - opens gallery
- [ ] Gallery lightbox works (same as social page)
- [ ] Navigation arrows work
- [ ] Keyboard navigation works

### Header Behavior
- [ ] Scroll down - header becomes smaller
- [ ] On white sections - header becomes light theme
- [ ] On orange section - header becomes orange theme
- [ ] On dark sections - header becomes dark theme

### Footer
- [ ] Marquee animation scrolls smoothly
- [ ] Social links work
- [ ] Email links open Gmail compose
- [ ] Phone link works
- [ ] All navigation links work

---

## 📱 MOBILE TESTING (375x667 - iPhone SE)

### Mobile Menu
- [ ] Click hamburger icon (top left) - menu slides in from right
- [ ] Page content pushes to the side
- [ ] See logo at top
- [ ] See navigation items
- [ ] See "سوشيال" with submenu items below
- [ ] Click "موك أبز" - closes menu, opens social page with mockups
- [ ] Click "أوت دور" - closes menu, opens social page with outdoor
- [ ] Click "معارض" - closes menu, opens social page with exhibitions
- [ ] Click "تواصل معنا" - closes menu, opens email modal
- [ ] Click hamburger again - menu closes

### Social Page (Mobile)
- [ ] Cards stack vertically
- [ ] Touch any card - opens gallery
- [ ] Gallery grid shows 3 columns
- [ ] Tap image - lightbox opens
- [ ] Swipe left/right - navigates images (if implemented)
- [ ] Tap outside - closes lightbox
- [ ] Tap X - closes lightbox

### Portfolio Section (Mobile)
- [ ] Blocks stack vertically
- [ ] Mockups block is full-width
- [ ] All blocks are tappable
- [ ] Tap opens social page

### Responsive Behavior
- [ ] Rotate device - layout adjusts
- [ ] No horizontal scroll
- [ ] All text is readable
- [ ] Buttons are touch-friendly (min 44x44px)

---

## 🌐 BROWSER TESTING

### Chrome (Latest)
- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

### Firefox (Latest)
- [ ] All features work
- [ ] Backdrop-filter works
- [ ] No console errors

### Safari (Latest)
- [ ] All features work
- [ ] Backdrop-filter works
- [ ] No console errors

### Edge (Latest)
- [ ] All features work
- [ ] No console errors

### Mobile Safari (iOS)
- [ ] Touch gestures work
- [ ] Animations smooth
- [ ] No layout issues

### Chrome Mobile (Android)
- [ ] Touch gestures work
- [ ] Animations smooth
- [ ] No layout issues

---

## 🎨 VISUAL TESTING

### Colors
- [ ] Purple: #6B3FA0 (primary)
- [ ] Orange: #F5A623 (accent)
- [ ] White: #FFFFFF (backgrounds)
- [ ] Black: #0A0A0A (text)

### Typography
- [ ] Arabic text uses Cairo font
- [ ] English text uses Inter font
- [ ] All text is readable
- [ ] No text overflow

### Spacing
- [ ] Consistent padding/margins
- [ ] No elements touching edges
- [ ] Proper whitespace

### Images
- [ ] No distorted images
- [ ] No stretched images
- [ ] All images load
- [ ] Proper aspect ratios

### Animations
- [ ] Smooth transitions (60fps)
- [ ] No janky animations
- [ ] Proper easing curves
- [ ] No layout shifts

---

## 🔍 DETAILED IMAGE TESTING

### Mockups Gallery (319 images)
- [ ] First 10 images load
- [ ] Scroll down - more images load (lazy loading)
- [ ] All images have proper aspect ratio
- [ ] No broken images
- [ ] Thumbnails load fast
- [ ] Full images load in lightbox

### Exhibitions Gallery (47 images)
- [ ] All images load
- [ ] Proper aspect ratio
- [ ] No broken images

### Outdoor Gallery (49 images)
- [ ] All images load
- [ ] Proper aspect ratio
- [ ] No broken images

---

## ⚡ PERFORMANCE TESTING

### Load Time
- [ ] Page loads in < 3 seconds
- [ ] Images load progressively
- [ ] No blocking resources

### Interactions
- [ ] Buttons respond instantly
- [ ] Animations are smooth
- [ ] No lag when scrolling
- [ ] Lightbox opens quickly

### Memory
- [ ] No memory leaks
- [ ] Browser doesn't slow down
- [ ] Can navigate multiple times

---

## 🐛 ERROR TESTING

### Console
- [ ] Open DevTools (F12)
- [ ] Check Console tab
- [ ] Should see: "Setting up social gallery lightbox for X images"
- [ ] Should NOT see: Red errors
- [ ] Yellow warnings are OK

### Network
- [ ] Open Network tab
- [ ] Reload page
- [ ] All resources load (green status)
- [ ] No 404 errors
- [ ] Images load from correct paths

### Broken Scenarios
- [ ] Click rapidly on navigation - no errors
- [ ] Open/close lightbox rapidly - no errors
- [ ] Spam arrow keys in lightbox - no errors
- [ ] Resize window while lightbox open - no errors
- [ ] Go back/forward in browser - no errors

---

## 📊 ACCESSIBILITY TESTING

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons
- [ ] Arrow keys work in lightbox
- [ ] Escape closes modals
- [ ] Focus visible on all elements

### Screen Reader (Optional)
- [ ] Images have alt text
- [ ] Buttons have labels
- [ ] Headings are hierarchical
- [ ] Links are descriptive

---

## ✅ FINAL CHECKS

### Content
- [ ] All text in correct language (AR/EN)
- [ ] No "Lorem ipsum" text
- [ ] No placeholder images
- [ ] All links work

### Functionality
- [ ] All buttons work
- [ ] All links work
- [ ] All animations work
- [ ] All modals work

### Polish
- [ ] No visual glitches
- [ ] No console errors
- [ ] No broken images
- [ ] Professional appearance

---

## 🎯 CRITICAL PATH TEST

**This is the most important user journey:**

1. [ ] Open website
2. [ ] Wait for loader to finish
3. [ ] Click "سوشيال" in navigation
4. [ ] Hover to see dropdown
5. [ ] Click "موك أبز"
6. [ ] Wait for liquid ripple animation
7. [ ] See gallery with 319 images
8. [ ] Click first image
9. [ ] Lightbox opens with scale-up animation
10. [ ] Click right arrow
11. [ ] Image slides smoothly to next
12. [ ] Press → key
13. [ ] Image slides smoothly to next
14. [ ] Press ESC
15. [ ] Lightbox closes with scale-down animation
16. [ ] Click "رجوع"
17. [ ] Returns to category selection
18. [ ] Click X at top
19. [ ] Social page closes
20. [ ] Back to main page

**If all 20 steps work perfectly, the website is READY! ✅**

---

## 📝 NOTES

- Test in **incognito/private mode** to avoid cache issues
- Clear browser cache if something doesn't work
- Check console for any error messages
- Take screenshots of any issues found
- Note the browser and device for any issues

---

**Testing Date:** _____________  
**Tested By:** _____________  
**Browser:** _____________  
**Device:** _____________  
**Result:** ⭐⭐⭐⭐⭐ (Rate 1-5 stars)
