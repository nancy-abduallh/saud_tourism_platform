from PIL import Image

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924189860_e9bb10d7.png").convert("RGB")
w, h = im.size

# Let's find gallery grid on right side
# The gallery has 4 images in a 2x2 grid
# Top left: Night dinner under stars
# Top right: Hot air balloons in AlUla
# Bottom left: Luxury outdoor cabana
# Bottom right: Range Rover convoy in desert

# Let's inspect x from 550 to 1020, y from 120 to 350
# Let's scan y=180 across x from 580 to 1000:
row = []
for x in range(580, 1020, 2):
    r, g, b = im.getpixel((x, 180))
    is_white = (r > 240 and g > 240 and b > 240)
    row.append((x, is_white))

# Let's find bounds of top 2 images in gallery:
# Also big hero image on the left:
hero_row = []
for x in range(10, 600, 5):
    r, g, b = im.getpixel((x, 250))
    hero_row.append((x, r, g, b))

# Let's print gallery top row boundaries
in_img = False
g_top_x = []
start = 0
for x, white in row:
    if not white and not in_img:
        in_img = True
        start = x
    elif white and in_img:
        in_img = False
        g_top_x.append((start, x))
if in_img: g_top_x.append((start, 1020))
print("Gallery top x bounds:", g_top_x)

# Let's find gallery y bounds
# At x=650 (inside top-left gallery image)
for y in range(120, 320, 5):
    r, g, b = im.getpixel((650, y))
    # print
