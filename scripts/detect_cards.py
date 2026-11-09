from PIL import Image
import numpy as np

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924150554_3e4ee23b.png").convert("RGB")
arr = np.array(im)

# Find where the 4 package card images are located
# Look at packages_page:
# There is a header, then filter buttons (All, AlUla, Red Sea, etc.)
# Then the 4 cards and the filter sidebar.
# Let's inspect vertical slice at x=150 (center of Card 1):
for y in range(100, 500, 10):
    r, g, b = arr[y, 150]
    # check color variations

# Let's find columns with card images
# In Card 1, it's night sky (dark blue / black / stars), Card 2 is cyan ocean (high G and B)
# Let's find cyan ocean around x=330:
for y in range(150, 450, 10):
    r, g, b = arr[y, 330]
    if b > 180 and g > 150 and r < 100:
        print(f"Cyan water at y={y}, color=({r},{g},{b})")

# Let's find the card images bounding box
