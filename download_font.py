import urllib.request
import os

font_url = "https://github.com/google/fonts/raw/main/ofl/cairo/static/Cairo-Bold.ttf"
font_path = r"D:\شغل يوسف\website\Cairo-Bold.ttf"

try:
    urllib.request.urlretrieve(font_url, font_path)
    print("Font downloaded successfully!")
except Exception as e:
    print(f"Error downloading font: {e}")
