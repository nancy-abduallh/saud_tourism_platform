from PIL import Image

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924150554_3e4ee23b.png")
w, h = im.size

# Let's check y coordinates of cards:
# Usually cards start around y=350 to y=500 in packages_page
# Let's inspect rows around y=360..500
# In packages_page (1024, 571), the 4 cards are in the middle-bottom area.
# Let's sample pixels or crop approximate regions to find exact borders.

# In packages_page, the cards have images at top of each card.
# Card 1: AlUla Maraya
# Card 2: Red Sea
# Card 3: Diriyah
# Card 4: Asir
# The sidebar "Luxury Booking Filter" is on the right side.
# Let's find card bounds:
for y in range(180, 400, 20):
    row = [im.getpixel((x, y)) for x in range(50, 800, 50)]
    # print sample

# Let's crop candidate regions and check
# Cards x bounds: roughly x=70..250 (card 1), 250..430 (card 2), 430..610 (card 3), 610..790 (card 4)
# y bounds: roughly y=350..500 or so
im.crop((70, 350, 790, 500)).save(r"c:\xampp\htdocs\saud_tourism_platform\scripts\test_row.png")
print("Saved test_row.png")
