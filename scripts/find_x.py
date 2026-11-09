from PIL import Image

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924150554_3e4ee23b.png").convert("RGB")

# Let's find card left/right edges
# The background between cards is white (255, 255, 255)
# Inside card images, it's non-white
cards = []
in_card = False
start_x = 0

for x in range(50, 850):
    r, g, b = im.getpixel((x, 300))
    is_white = (r > 240 and g > 240 and b > 240)
    if not is_white and not in_card:
        in_card = True
        start_x = x
    elif is_white and in_card:
        in_card = False
        cards.append((start_x, x))

if in_card:
    cards.append((start_x, 850))

print("Cards x ranges:", cards)
