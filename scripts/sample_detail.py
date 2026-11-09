from PIL import Image

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924189860_e9bb10d7.png").convert("RGB")

# Let's inspect detail_page layout
# Let's sample colors along the top row across the full width at y=200:
# Big image on left, gallery on right
print("Colors across x at y=200:")
for x in range(0, 1024, 40):
    print(f"x={x}: {im.getpixel((x, 200))}")

# And at y=100, 150, 200, 250, 300, 350
print("Colors down y at x=300 (big image):")
for y in range(100, 400, 30):
    print(f"y={y}: {im.getpixel((300, y))}")

print("Colors down y at x=700 (gallery top left):")
for y in range(100, 350, 20):
    print(f"y={y}: {im.getpixel((700, y))}")

print("Colors down y at x=900 (gallery top right):")
for y in range(100, 350, 20):
    print(f"y={y}: {im.getpixel((900, y))}")
