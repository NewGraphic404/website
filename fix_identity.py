import os
import shutil
import re
from PIL import Image

def fix_identity():
    # 1. Clean up wrong portfolio folder
    wrong_dir = r"d:\شغل يوسف\website\assets\portfolio\identity"
    if os.path.exists(wrong_dir):
        shutil.rmtree(wrong_dir, ignore_errors=True)
        
    # 2. Clean up portfolio-data.js
    data_file = r"d:\شغل يوسف\website\assets\portfolio-data.js"
    with open(data_file, 'r', encoding='utf-8') as f:
        js_data = f.read()
    
    # Remove the "identity" block
    new_js_data = re.sub(r'\s*"identity":\s*\{.*?"social":\s*\{', '\n    "social": {', js_data, flags=re.DOTALL)
    with open(data_file, 'w', encoding='utf-8') as f:
        f.write(new_js_data)
        
    # 3. Create pdf-pages directory for emar_rk
    source_img = r"D:\شغل يوسف\موكب مطبوعات\مطبوعات\صور\sorted\الهوية البصرية\Emar rk.jpg"
    target_dir = r"d:\شغل يوسف\website\assets\pdf-pages\emar_rk"
    os.makedirs(target_dir, exist_ok=True)
    
    target_page = os.path.join(target_dir, "page-1.jpg")
    target_thumb = os.path.join(target_dir, "page-1-thumb.jpg")
    
    # Compress and save full page
    if os.path.exists(source_img):
        with Image.open(source_img) as img:
            if img.mode in ("RGBA", "P"): img = img.convert("RGB")
            # For the main page, keep a reasonable max width
            max_w = 1920
            if img.width > max_w:
                ratio = max_w / float(img.width)
                new_h = int(img.height * ratio)
                img = img.resize((max_w, new_h), Image.Resampling.LANCZOS)
            img.save(target_page, 'JPEG', quality=85, optimize=True)
            
            # For thumbnail
            max_w_thumb = 800
            if img.width > max_w_thumb:
                ratio = max_w_thumb / float(img.width)
                new_h = int(img.height * ratio)
                thumb = img.resize((max_w_thumb, new_h), Image.Resampling.LANCZOS)
                thumb.save(target_thumb, 'JPEG', quality=80, optimize=True)
            else:
                img.save(target_thumb, 'JPEG', quality=80, optimize=True)

    # 4. Update index.html
    html_file = r"d:\شغل يوسف\website\index.html"
    with open(html_file, 'r', encoding='utf-8') as f:
        html = f.read()
        
    if "emar_rk" not in html:
        card_html = """
                    <!-- Emar rk -->
                    <div class="choice-card animate-fade-in" data-identity-client="emar_rk">
                        <div class="choice-card-bg" style="background-image: url('assets/pdf-pages/emar_rk/page-1-thumb.jpg')"></div>
                        <div class="choice-card-overlay"></div>
                        <div class="choice-card-content">
                            <h3 class="choice-title">Emar rk</h3>
                            <span class="choice-arrow"></span>
                        </div>
                    </div>"""
        html = html.replace('<!-- Promise Mall -->', card_html + '\n                    <!-- Promise Mall -->')
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(html)

    # 5. Update script.js
    script_file = r"d:\شغل يوسف\website\script.js"
    with open(script_file, 'r', encoding='utf-8') as f:
        script = f.read()
        
    if "emar_rk:" not in script:
        js_block = """
        emar_rk: {
            name_ar: 'Emar rk',
            name_en: 'Emar rk',
            desc_ar: 'تصميم الهوية البصرية، الشعار، ودليل العلامة التجارية لشركة Emar rk.',
            desc_en: 'Visual identity, logo design, and brand guidelines for Emar rk.',
            pdf: '',
            color_primary: '#0a633d',
            color_secondary: '#1c352d',
            pages: 1,
            meta: {
                services_ar: 'تصميم الهوية البصرية',
                services_en: 'Visual Identity',
                year: '2026',
                sector_ar: 'التطوير العقاري',
                sector_en: 'Real Estate'
            },
            layout: [
                { type: 'full-bleed', pages: [1] }
            ]
        },"""
        # Insert after arkan: { ... }
        # find the end of velora or just insert before velora: {
        script = script.replace('velora: {', js_block.strip() + '\n        velora: {')
        with open(script_file, 'w', encoding='utf-8') as f:
            f.write(script)
            
    print("Successfully fixed Emar rk identity!")

if __name__ == "__main__":
    fix_identity()
