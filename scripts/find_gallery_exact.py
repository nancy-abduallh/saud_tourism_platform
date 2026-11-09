from PIL import Image

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924189860_e9bb10d7.png").convert("RGB")

# Big image on the left:
# Scan x from 0 to 50 at y=200 to find left edge
for x in range(0, 50):
    r, g, b = im.getpixel((x, 200))
    if not (r > 250 and g > 250 and b > 250):
        left_x = x
        break

for x in range(550, 650):
    r, g, b = im.getpixel((x, 200))
    if r > 250 and g > 250 and b > 250:
        right_x = x
        break

for y in range(50, 150):
    r, g, b = im.getpixel((200, y))
    if not (r > 250 and g > 250 and b > 250):
        top_y = y
        break

for y in range(280, 360):
    r, g, b = im.getpixel((200, y))
    if r > 250 and g > 250 and b > 250:
        bottom_y = y
        break

print(f"Big Image: x=({left_x}, {right_x}), y=({top_y}, {bottom_y})")

# Gallery grid (top-left, top-right, bottom-left, bottom-right)
# Let's find top-left gallery image:
# x=right_x + gap to center
# Let's inspect x from 590 to 1020 at y=130:
g_top_row = []
in_g = False
start = 0
for x in range(590, 1020):
    r, g, b = im.getpixel((x, 130))
    is_w = (r > 248 and g > 248 and b > 248)
    if not is_w and not in_g:
        in_g = True
        start = x
    elif is_w and in_g:
        in_g = False
        g_top_row.append((start, x))
if in_g: g_top_row.append((start, 1020))

print("Gallery top row x:", g_top_row)

# Let's inspect y for gallery top row at x=700:
for y in range(60, 120):
    r, g, b = im.getpixel((700, y))
    if not (r > 248 and g > 248 and b > 248):
        g_top_y1 = y
        break

for y in range(150, 200):
    r, g, b = im.getpixel((700, y))
    if r > 248 and g > 248 and b > 248:
        g_bot_y1 = y
        break

print(f"Gallery Row 1 y: ({g_top_y1}, {g_bot_y1})")

# Let's inspect y for gallery bottom row at x=700:
for y in range(g_bot_y1, 230):
    r, g, b = im.getpixel((700, y))
    if not (r > 248 and g > 248 and b > 248):
        g_top_y2 = y
        break

for y in range(250, 330):
    r, g, b = im.getpixel((700, y))
    if r > 248 and g > 248 and b > 248:
        g_bot_y2 = y
        break

print(f"Gallery Row 2 y: ({g_top_y2}, {g_bot_y2})")

# Gallery bottom row x ranges:
g_bot_row = []
in_g = False
for x in range(590, 1020):
    r, g, b = im.getpixel((x, 230))
    is_w = (r > 248 and g > 248 and b > 248)
    if not is_w and not in_g:
        in_g = True
        start = x
    elif is_w and in_g:
        in_g = False
        g_bot_row.append((start, x))
if in_g: g_bot_row.append((start, 1020))

print("Gallery bottom row x:", g_bot_row)
