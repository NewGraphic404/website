import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

def check_brackets(text):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    lines = text.split('\n')
    for line_no, line in enumerate(lines, 1):
        for char_no, char in enumerate(line, 1):
            if char in '({[':
                stack.append((char, line_no, char_no))
            elif char in ')}]':
                if not stack:
                    return f"Unmatched {char} at line {line_no}, col {char_no}"
                top_char, top_line, top_col = stack.pop()
                if pairs[char] != top_char:
                    return f"Mismatched {char} at line {line_no}, col {char_no} (expected match for {top_char} from line {top_line})"
    if stack:
        top_char, top_line, top_col = stack.pop()
        return f"Unclosed {top_char} starting at line {top_line}, col {top_col}"
    return "No bracket errors found"

print(check_brackets(js_content))
