import codecs

js_path = r'd:\شغل يوسف\website\script.js'
with codecs.open(js_path, 'r', 'utf-8') as f:
    js_content = f.read()

# Replace the specific unbalanced }); 
js_content = js_content.replace('''            if (window._galleryObserver) {
                window._galleryObserver.disconnect();
            }
        });
    }
});

/* ================================================================
   SOCIAL PAGE''', '''            if (window._galleryObserver) {
                window._galleryObserver.disconnect();
            }
        });
    }

/* ================================================================
   SOCIAL PAGE''')

with codecs.open(js_path, 'w', 'utf-8') as f:
    f.write(js_content)

print("Removed stray });")
