from PIL import Image

im = Image.open(r"c:\xampp\htdocs\saud_tourism_platform\client\public\images\hero-1.jpg")
print("hero-1.jpg size:", im.size)

# The left image in detail_page (17, 81, 609, 280) is CLEAN without the booking form!
det = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924189860_e9bb10d7.png").convert("RGB")
clean_hero = det.crop((17, 81, 609, 280))
clean_hero.resize((1920, 1080), Image.Resampling.LANCZOS).save(r"c:\xampp\htdocs\saud_tourism_platform\client\public\images\hero-1-clean.jpg", quality=95)
print("Saved clean_hero without booking form")
