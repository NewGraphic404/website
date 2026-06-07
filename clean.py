import codecs
with codecs.open('index.html', 'r', 'utf-8') as f:
    html = f.read()

bad_chunk = """    <!-- Back to Top Button -->
    <button id="backToTop" class="back-to-top" aria-label="Back to top">
    </div>
    </div>"""
html = html.replace(bad_chunk, "")

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(html)
