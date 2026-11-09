from PIL import Image

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924101618_5f654c14.png").convert("RGB")

# Let's inspect x from 50 to 520 at y=500
# There are 3 cards, each ~140px wide with ~15px gaps
# Let's sample x across y=500:
# Card 1 is ~60 to 205
# Card 2 is ~215 to 360
# Card 3 is ~370 to 515
# Let's crop and save to test:
im.crop((60, 450, 206, 557)).save(r"c:\xampp\htdocs\saud_tourism_platform\scripts\h_card1.png")
im.crop((213, 450, 359, 557)).save(r"c:\xampp\htdocs\saud_tourism_platform\scripts\h_card2.png")
im.crop((367, 450, 513, 557)).save(r"c:\xampp\htdocs\saud_tourism_platform\scripts\h_card3.png")

print("Saved 3 cards from home_page")
