from PIL import Image

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924024562_02fb643f.jpg").convert("RGB")

# Let's inspect where the 3 cards start at the bottom of hero_screen:
# Let's find border lines at y=480..520
for y in range(480, 520):
    r, g, b = im.getpixel((500, y))
    print(f"hero_screen y={y}: ({r},{g},{b})")

# Let's also check the bottom of the 3 cards:
for y in range(600, 648):
    r, g, b = im.getpixel((500, y))
    if y % 2 == 0:
        print(f"hero_screen bot y={y}: ({r},{g},{b})")
