import codecs
import re

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

def check_quotes(text):
    lines = text.split('\n')
    for line_no, line in enumerate(lines, 1):
        # Very simple check: remove escaped quotes, then count parity
        # This is not perfect but catches obvious single-line unclosed quotes
        line = re.sub(r'\\.', '', line)
        
        sq = line.count("'")
        dq = line.count('"')
        bq = line.count('`')
        
        if bq % 2 != 0:
            # Backticks can span multiple lines, so we can't easily check line by line
            pass
        if sq % 2 != 0 and '//' not in line and '/*' not in line:
            return f"Possible unmatched single quote at line {line_no}: {line.strip()}"
        if dq % 2 != 0 and '//' not in line and '/*' not in line:
            return f"Possible unmatched double quote at line {line_no}: {line.strip()}"
            
    return "No obvious quote errors found"

print(check_quotes(js_content))
