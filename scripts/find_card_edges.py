from PIL import Image

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924150554_3e4ee23b.png").convert("RGB")

# Let's inspect column 330 from y=150 to y=450:
for y in range(150, 420):
    r, g, b = im.getpixel((330, y))
    # Check top boundary of the image (above it is white or background)
    # The card background is white, and the image starts at some y
    if y in (170, 180, 185, 190, 195, 200, 350, 355, 360, 365, 370):
        print(f"y={y}: ({r},{g},{b})")

# Let's check x boundaries across row y=270:
for x in range(50, 800, 5):
    r, g, b = im.getpixel((x, 270))
    # print when crossing borders
