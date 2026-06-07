import codecs

with codecs.open('index.html', 'r', 'utf-8') as f:
    html = f.read()

# 1. Restore identityDetailView wrapper
missing_identity = '''
            <!-- 2. Case Study / Detail View (Baianat Style) -->
            <div id="identityDetailView" class="identity-detail-view" style="display: none;">
                <!-- Floating Motion Graphics / Abstract Shapes (Baianat Style) -->
                <div class="identity-bg-shapes">
                    <svg class="motion-shape shape-wave-1" viewBox="0 0 1440 320" fill="none">
                        <path d="M0,160 C320,300 640,20 960,180 C1280,340 1380,120 1440,100" stroke="rgba(245,166,35,0.12)" stroke-width="6" stroke-linecap="round"/>
                    </svg>
                    <svg class="motion-shape shape-wave-2" viewBox="0 0 1440 320" fill="none">
                        <path d="M0,80 C240,240 720,0 1100,200 C1300,300 1380,120 1440,60" stroke="rgba(26,58,255,0.08)" stroke-width="4" stroke-linecap="round"/>
                    </svg>
                    <svg class="motion-shape shape-circle-1" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="80" stroke="rgba(245,166,35,0.06)" stroke-width="2" stroke-dasharray="10 5" fill="none"/>
                    </svg>
                    <svg class="motion-shape shape-badge" viewBox="0 0 120 120">
                        <path d="M60,10 L75,35 L105,35 L85,55 L95,85 L60,70 L25,85 L35,55 L15,35 L45,35 Z" fill="rgba(245,166,35,0.03)" stroke="rgba(245,166,35,0.08)" stroke-width="1.5"/>
                    </svg>
                </div>
                <div class="detail-view-header" style="margin-bottom: 2rem; display: flex; justify-content: flex-end;">'''

target_1 = '                <div class="detail-view-header" style="margin-bottom: 2rem; display: flex; justify-content: flex-end;">'
if target_1 in html:
    html = html.replace(target_1, missing_identity)
    print('Restored identityDetailView')
else:
    print('Failed to restore identityDetailView')

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(html)
print('Saved index.html')
