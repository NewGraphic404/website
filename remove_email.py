import codecs
import re

def remove_from_file(filepath):
    with codecs.open(filepath, 'r', 'utf-8') as f:
        content = f.read()

    # Match the button blocks containing the specific email
    # It looks for <button ... data-email="yousefwalled33@gmail.com"> ... </button>
    pattern = r'\s*<button[^>]*data-email="yousefwalled33@gmail\.com"[^>]*>[\s\S]*?</button>'
    
    new_content = re.sub(pattern, '', content)
    
    with codecs.open(filepath, 'w', 'utf-8') as f:
        f.write(new_content)

remove_from_file('index.html')
remove_from_file('script.js')
