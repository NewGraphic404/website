import json
import re

real_path = r"C:\Users\Technical\.gemini\antigravity-ide\brain\b893a3f5-2d1c-4e48-84e2-68fa5a773f2d\.system_generated\steps\9\content.md"

with open(real_path, "r", encoding="utf-8") as f:
    html = f.read()

print("=== Searching for Caption and Texts ===")
# Find all occurrences of double-quoted strings containing halfmillion
pattern = re.compile(r'"text"\s*:\s*"([^"]+)"')
matches = pattern.findall(html)
for m in matches:
    if any(x in m for x in ["halfmillion", "byahmed", "Space", "ad", "جدة", "عجوز", "هاف", "مليون"]):
        # clean unicode escape characters
        try:
            decoded = bytes(m, "utf-8").decode("unicode_escape")
            print("-", decoded[:300])
        except Exception:
            print("-", m[:300])

print("\n=== Searching for other patterns ===")
# Find anything inside <script> tags that mentions byahmed or halfmillion
script_pattern = re.compile(r'<script[^>]*>(.*?)</script>', re.DOTALL)
scripts = script_pattern.findall(html)
for idx, script in enumerate(scripts):
    if "halfmillion_sa" in script or "byahmed.ai" in script:
        print(f"Script #{idx} contains keywords (len={len(script)}):")
        # print some snippets of text inside it
        for word in re.findall(r'"[^"]+"', script):
            word_clean = word.strip('"')
            if len(word_clean) > 30 and any(x in word_clean for x in ["halfmillion", "byahmed", "Space", "ad", "جدة", "عجوز", "هاف", "مليون"]):
                print("  Word:", word_clean[:150])
