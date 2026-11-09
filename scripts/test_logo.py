from PIL import Image

im = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924242063_dedd6e15.jpg").convert("RGB")
w, h = im.size
print("logo size:", w, h)

# Center is roughly (w/2, h/2) = (496, 512)
# Let's crop square around center
size = min(w, h)
left = (w - size) // 2
top = (h - size) // 2
right = left + size
bottom = top + size
sq = im.crop((left, top, right, bottom))
print("Cropped square size:", sq.size)
sq.resize((512, 512), Image.Resampling.LANCZOS).save(r"c:\xampp\htdocs\saud_tourism_platform\client\public\logo.png")
print("Saved client/public/logo.png successfully")
