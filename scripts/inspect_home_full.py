from PIL import Image

home = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924101618_5f654c14.png").convert("RGB")
print("home_page height:", home.height)

# What sections exist?
# 0..380: Hero and 3 destination cards
# 380..590: Curated Luxury Packages (3 cards)
# 590..750: Bespoke VIP Travel Services
# 750..870: Guest Impressions
# 870..1024: Footer
#
# Let's inspect the 3 destination cards in home_page:
# In home_page around y=310 to y=380:
# There are 3 cards: ALULA: Ancient Wonders, THE RED SEA: Pristine Archipelago, DIRIYAH: Cradle of Culture
# Let's check their y coordinates:
for y in range(300, 390, 10):
    print(f"y={y}: x=100={home.getpixel((100, y))}, x=280={home.getpixel((280, y))}, x=450={home.getpixel((450, y))}")
