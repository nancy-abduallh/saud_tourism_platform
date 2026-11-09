from PIL import Image

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924150554_3e4ee23b.png").convert("RGB")

for y in range(195, 230):
    r, g, b = im.getpixel((330, y))
    print(f"y={y}: ({r},{g},{b})")

for y in range(350, 395):
    r, g, b = im.getpixel((330, y))
    if y % 5 == 0:
        print(f"y={y}: ({r},{g},{b})")
