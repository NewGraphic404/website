import urllib.request

url = 'https://raw.githubusercontent.com/NewGraphic404/website/main/script.js'
response = urllib.request.urlopen(url)
data = response.read()

try:
    text = data.decode('windows-1256')
    if '' not in text:
        print('Windows-1256 decoding works!')
        with open(r'd:\شغل يوسف\website\script.js', 'w', encoding='utf-8') as f:
            f.write(text)
    else:
        print('Still has replacement characters when decoded as windows-1256.')
except Exception as e:
    print('Error:', e)
