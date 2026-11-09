from PIL import Image

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924024562_02fb643f.jpg").convert("RGB")
w, h = im.size
print("hero_screen dimensions:", w, h)

# Top navbar: usually y=0 to y=60
# Bottom 3 cards: usually around y=480 to y=630
# Let's inspect bottom cards in hero_screen:
# Card 1 (AlUla), Card 2 (Red Sea), Card 3 (Diriyah)
for y in range(450, 640, 10):
    r, g, b = im.getpixel((500, y))
    # print
for y in range(460, 520):
    r, g, b = im.getpixel((500, y))
    # print when border of card 2 starts

# Let's check card 1 (AlUla), card 2 (Red Sea), card 3 (Diriyah)
# in hero_screen at y=550
row = [im.getpixel((x, 550)) for x in range(50, 950, 10)]
print("Sample at y=550 done")
