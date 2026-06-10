import ast
import traceback
import codecs
js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Instead of full JS parser, let's just count ALL brackets, but IGNORE brackets in strings and comments!
def validate_js_brackets(code):
    stack = []
    in_string = False
    string_char = ''
    in_line_comment = False
    in_block_comment = False
    escape = False

    i = 0
    while i < len(code):
        char = code[i]

        if in_line_comment:
            if char == '\n':
                in_line_comment = False
            i += 1
            continue

        if in_block_comment:
            if char == '*' and i + 1 < len(code) and code[i+1] == '/':
                in_block_comment = True # wait, it ends
                in_block_comment = False
                i += 2
                continue
            i += 1
            continue

        if in_string:
            if escape:
                escape = False
            elif char == '\\':
                escape = True
            elif char == string_char:
                in_string = False
            i += 1
            continue

        if char in ["'", '"', '`']:
            in_string = True
            string_char = char
            i += 1
            continue

        if char == '/' and i + 1 < len(code):
            next_char = code[i+1]
            if next_char == '/':
                in_line_comment = True
                i += 2
                continue
            elif next_char == '*':
                in_block_comment = True
                i += 2
                continue

        if char in '({[':
            stack.append((char, i))
        elif char in ')}]':
            if not stack:
                return f"Unmatched closing bracket '{char}' at index {i}"
            top_char, top_i = stack.pop()
            pairs = {')': '(', '}': '{', ']': '['}
            if pairs[char] != top_char:
                return f"Mismatched bracket '{char}' at index {i}, expects match for '{top_char}' at {top_i}"

        i += 1

    if stack:
        top_char, top_i = stack.pop()
        line_num = code[:top_i].count('\n') + 1
        return f"Unclosed bracket '{top_char}' at index {top_i} (line {line_num})"
    return "All brackets match!"

print(validate_js_brackets(js_content))
