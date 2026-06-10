"""
Fix the corrupted script.js file by replacing the damaged region (lines 3346-3548)
with the correct original code + the video poster fix.
"""

import os

filepath = r"D:\شغل يوسف\website\script.js"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines before fix: {len(lines)}")

# The correct code that should replace lines 3346-3548 (0-indexed: 3345-3547)
# This is the original code with only the video poster fix applied
correct_code = """        triggerTransition(() => {
            socialPage.classList.add('active');
            document.body.style.overflow = 'hidden';
            resetSocialView();
            if (directCatKey) showCategoryDetails(directCatKey, directSubdirKey);
        });
    };

    const closePage = (skipHash) => {
        if (!socialPage.classList.contains('active')) return;
        const shouldClearHash = skipHash !== true;
        triggerTransition(() => {
            socialPage.classList.remove('active');
            document.body.style.overflow = '';
            resetSocialView();
            if (shouldClearHash) {
                window.history.replaceState(null, '', window.location.pathname);
            }
        });
    };

    function handleSocialHash() {
        const hash = window.location.hash;

        if (hash.endsWith('-lb')) return;

        if (window.lbSessionClose && document.querySelector('.gallery-lightbox-global') && document.querySelector('.gallery-lightbox-global').style.display === 'flex') {
            window.lbSessionClose(true);
            return;
        }

        if (hash === '#social-page') {
            openPage(null, null, true);
        } else if (hash.startsWith('#portfolio-')) {
            const portfolioPath = hash.replace('#portfolio-', '');
            const [catKey, encodedSubdirKey] = portfolioPath.split('/');
            const directSubdirKey = encodedSubdirKey ? decodeURIComponent(encodedSubdirKey) : pendingDirectSubdirKey;
            pendingDirectSubdirKey = null;
            openPage(catKey, directSubdirKey, true);
        } else if (socialPage.classList.contains('active') && !hash.startsWith('#social') && !hash.startsWith('#portfolio')) {
            closePage(true);
        }
    }

    window.addEventListener('hashchange', handleSocialHash);
    setTimeout(handleSocialHash, 2900);

    function resetSocialView() {
        clearGalleryScrollLoader();
        socialPage.style.background = '';
        currentViewLevel = 'categories';
        currentCategoryKey = null;
        currentSubcategoryName = null;
        
        if (window.socialGalleryObserver) window.socialGalleryObserver.disconnect();
        if (socialDetailView) {
            socialDetailView.classList.remove('active');
            socialDetailView.style.display = 'none';
        }
        if (socialGrid) {
            socialGrid.style.display = 'grid';
            socialGrid.style.opacity = '1';
        }
    }

    // 3. Render Portfolio Categories & Details
    function renderPortfolioCategory(catKey, cardElement, clickEvent) {
        const data = portfolioData[catKey];
        if (!data) return;

        currentCategoryKey = catKey;
        const lang = document.documentElement.lang || 'ar';
        const categoryName = lang === 'ar' ? data.name_ar : data.name_en;
        const color = '#0f0c1b'; // premium dark theme

        // Perform ripple animation if clicked from grid card
        if (cardElement && !socialPage.classList.contains('expanding')) {
            window.isAnimatingRipple = true;
            window.location.hash = "#portfolio-" + catKey;
            let startX, startY;
            if (clickEvent && clickEvent.clientX) {
                startX = clickEvent.clientX;
                startY = clickEvent.clientY;
            } else {
                const rect = cardElement.getBoundingClientRect();
                startX = rect.left + rect.width / 2;
                startY = rect.top + rect.height / 2;
            }

            const ripple = document.createElement('div');
            ripple.className = 'liquid-ripple';
            Object.assign(ripple.style, {
                top: startY + 'px',
                left: startX + 'px',
                width: '300vmax',
                height: '300vmax',
                backgroundColor: color,
                borderRadius: '50%'
            });
            document.body.appendChild(ripple);
            socialPage.classList.add('expanding');

            requestAnimationFrame(() => {
                ripple.classList.add('active');
                setTimeout(() => {
                    window.isAnimatingRipple = false;
                    showCategoryDetails(catKey);
                    ripple.style.opacity = '0';
                    setTimeout(() => {
                        ripple.remove();
                        socialPage.classList.remove('expanding');
                    }, 400);
                }, 750);
            });
        } else {
            showCategoryDetails(catKey);
        }
    }

    function showCategoryDetails(catKey, directSubdirKey = null) {
        currentCategoryKey = catKey;
        const data = portfolioData[catKey];
        if (!data) return;

        socialPage.style.background = '#080412'; // beautiful dark cosmic theme
        const lang = document.documentElement.lang || 'ar';
        const categoryName = lang === 'ar' ? data.name_ar : data.name_en;
        if (socialCategoryName) socialCategoryName.textContent = categoryName;

        if (data.has_subdirs) {
            if (directSubdirKey && data.subdirs[directSubdirKey]) {
                currentViewLevel = 'gallery';
                currentSubcategoryName = directSubdirKey;
                const displaySubdir = translations[currentLang][directSubdirKey] || directSubdirKey;
                if (socialCategoryName) {
                    socialCategoryName.textContent = `${categoryName} \u203a ${displaySubdir}`;
                }
                renderGallery(data.subdirs[directSubdirKey], `${categoryName} \u203a ${displaySubdir}`);
            } else {
                // Render subdirectories list
                renderSubdirectories(catKey);
            }
        } else {
            // Render flat gallery files
            renderGallery(data.files, categoryName);
        }

        if (socialGrid) socialGrid.style.display = 'none';
        socialDetailView.style.display = 'block';

        requestAnimationFrame(() => {
            socialDetailView.classList.add('active');
        });
    }

    // 4. Render Subdirectories Grid
    function renderSubdirectories(catKey) {
        clearGalleryScrollLoader();
        currentViewLevel = 'subcategories';
        const catData = portfolioData[catKey];
        if (!catData || !socialGalleryGrid) return;

        socialGalleryGrid.innerHTML = '';
        socialGalleryGrid.className = 'portfolio-gallery-grid subdirs-view-grid';

        const subdirs = Object.keys(catData.subdirs);
        subdirs.forEach(subdirName => {
            const files = catData.subdirs[subdirName];
            // Find first image as cover (not a video)
            const coverImage = files.find(f => !f.toLowerCase().endsWith('.mp4') && !f.toLowerCase().endsWith('.mp4')) || files[0];

            const isVideo = coverImage.toLowerCase().endsWith('.mp4') || coverImage.toLowerCase().endsWith('.mp4');
            const card = document.createElement('div');
            card.className = 'subdir-card reveal-up';
            
            let bgHtml = '';
            if (isVideo) {
                bgHtml = `
                    <video src="${coverImage}" class="subdir-video" autoplay muted loop playsinline style="
                        position: absolute;
                        inset: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        z-index: 0;
                        pointer-events: none;
                        filter: brightness(0.65);
                        transition: filter 0.4s ease;
                    "></video>
                `;
"""

# Find the line that starts with "        triggerTransition(() => {" after openPage
# That's line 3346 (1-indexed), so 3345 (0-indexed)
# Find where the correct code should end - at the `;` closing the bgHtml template literal
# which is around line 3559

# Let's find exact boundaries
start_idx = None
end_idx = None

for i, line in enumerate(lines):
    # Find the first triggerTransition after line 3340 
    if i >= 3345 and start_idx is None:
        if 'triggerTransition' in line:
            start_idx = i
            break

print(f"Start of replacement at line {start_idx + 1}")

# Now find where the GOOD code resumes after the corruption
# Look for the line with "} else {" followed by "// Use thumbnail for card cover"
for i, line in enumerate(lines):
    if i > start_idx and '// Use thumbnail for card cover' in line:
        # The line before this should be "} else {"
        # We want to end our replacement right before the "} else {" 
        end_idx = i - 1  # the "} else {" line
        break

print(f"End of replacement at line {end_idx + 1}")
print(f"Will replace lines {start_idx + 1} to {end_idx + 1}")

# Preview lines around end boundary
print("\n--- Lines around end boundary ---")
for i in range(max(0, end_idx - 3), min(len(lines), end_idx + 5)):
    print(f"{i+1}: {lines[i].rstrip()}")

# Now rebuild the file
correct_lines = correct_code.split('\n')
# Add proper line endings
correct_lines = [line + '\n' for line in correct_lines]

new_lines = lines[:start_idx] + correct_lines + lines[end_idx:]

print(f"\nTotal lines after fix: {len(new_lines)}")

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("File fixed successfully!")
