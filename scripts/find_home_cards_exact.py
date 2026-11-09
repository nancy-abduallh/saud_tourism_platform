from PIL import Image

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924101618_5f654c14.png").convert("RGB")

cards = []
in_card = False
start_x = 0
for x in range(30, 550):
    r, g, b = im.getpixel((x, 500))
    is_w = (r > 240 and g > 240 and b > 240)
    if not is_w and not in_card:
        in_card = True
        start_x = x
    elif is_w and in_card:
        in_card = False
        cards.append((start_x, x))
if in_card: cards.append((start_x, 550))

print("home_page package cards x ranges:", cards)

# Let's find exact y top and bottom at x=100
for y in range(440, 460):
    r, g, b = im.getpixel((100, y))
    if not (r > 240 and g > 240 and b > 240):
        y_top = y
        break

for y in range(540, 565):
    r, g, b = im.getpixel((100, y))
    if (r > 245 and g > 245 and b > 245):
        y_bot = y
        break

print(f"home_page package images y: ({y_top}, {y_bot})")
