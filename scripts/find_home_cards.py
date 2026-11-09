from PIL import Image

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924101618_5f654c14.png").convert("RGB")
w, h = im.size
print("home_page size:", w, h)

# Let's inspect where Curated Luxury Packages are in home_page:
# There are 3 cards side by side:
# Card 1 (left), Card 2 (middle), Card 3 (right)
# Let's scan y around 400..600 at x=100, x=280, x=450:
for y in range(400, 600, 10):
    c1 = im.getpixel((100, y))
    c2 = im.getpixel((285, y))
    c3 = im.getpixel((450, y))
    print(f"y={y}: c1={c1}, c2={c2}, c3={c3}")
