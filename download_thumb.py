import urllib.request

url = "https://scontent-sjc6-1.cdninstagram.com/v/t51.82787-15/669838969_18575838484045982_8906874877295140424_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=101&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=Um7iRf2eQosQ7kNvwEJ_820&_nc_oc=AdpHhBnV3v8MxFKbOVVI_XEh2eJEPlLAr7N62VYVGCyjpGHNh5pUIqgSmr2kxAxcH7w&_nc_zt=23&_nc_ht=scontent-sjc6-1.cdninstagram.com&_nc_gid=I26VBhMmIW7r8RkjeOyJTw&_nc_ss=7b60f&oh=00_Af9xqkuotBUPn8iESwTBw0tOn-dLfIw1bQVPCz-D3flPMQ&oe=6A2DAE91"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        with open("d:\\شغل يوسف\\website\\assets\\thumbnail.jpg", "wb") as f:
            f.write(response.read())
    print("Success")
except Exception as e:
    print("Error:", e)
