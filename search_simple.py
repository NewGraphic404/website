real_path = r"C:\Users\Technical\.gemini\antigravity-ide\brain\b893a3f5-2d1c-4e48-84e2-68fa5a773f2d\.system_generated\steps\9\content.md"

with open(real_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

print("Total lines:", len(lines))
for idx, line in enumerate(lines):
    if "byahmed.ai" in line or "halfmillion_sa" in line:
        print(f"Line {idx+1}:")
        # Print a chunk of the line (e.g. 500 characters around the match)
        pos = line.find("byahmed.ai")
        if pos == -1:
            pos = line.find("halfmillion_sa")
        start = max(0, pos - 200)
        end = min(len(line), pos + 400)
        print(line[start:end])
        print("-" * 50)
