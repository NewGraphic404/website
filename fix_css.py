import codecs

with codecs.open('styles.css', 'r', 'utf-8') as f:
    css = f.read()

bad_css = """html[lang="en"] body.menu-open > *:not(.mobile-menu):not(.menu-toggle-fixed):not(#customCursor):not(.page-transition-overlay):not(.email-modal-overlay):not(script) {
    transform: translateX(-100vw);
}
@media (min-width: 1341px) {
    html[lang="en"] body.menu-open > *:not(.mobile-menu):not(.menu-toggle-fixed):not(#customCursor):not(.page-transition-overlay):not(.email-modal-overlay):not(script) {
        transform: translateX(-320px);
    }
}"""

css = css.replace(bad_css, '')

with codecs.open('styles.css', 'w', 'utf-8') as f:
    f.write(css)
