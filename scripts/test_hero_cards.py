from PIL import Image

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924024562_02fb643f.jpg").convert("RGB")

# Let's find the 3 cards at the bottom of hero_screen:
# y is from ~495 to ~635
# Let's find x boundaries of the 3 cards across y=550
# The cards have borders with gold/white glow or transparency
# Let's check x ranges
# Card 1 (left): ~60 to ~350
# Card 2 (middle): ~365 to ~655
# Card 3 (right): ~670 to ~960

# Let's inspect x at y=550
for x in (60, 65, 350, 360, 370, 650, 660, 670, 960, 970):
    print(f"x={x}: {im.getpixel((x, 550))}")

# Let's test crop the 3 cards:
# Card 1: AlUla
im.crop((60, 495, 352, 638)).save(r"c:\xampp\htdocs\saud_tourism_platform\scripts\hero_card1.png")
# Card 2: The Red Sea
im.crop((367, 495, 657, 638)).save(r"c:\xampp\htdocs\saud_tourism_platform\scripts\hero_card2.png")
# Card 3: Diriyah
im.crop((672, 495, 962, 638)).save(r"c:\xampp\htdocs\saud_tourism_platform\scripts\hero_card3.png")

print("Saved 3 cards from hero_screen")
