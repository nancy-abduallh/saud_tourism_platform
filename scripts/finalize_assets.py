import os
from PIL import Image

images_dir = r"c:\xampp\htdocs\saud_tourism_platform\client\public\images"
os.makedirs(images_dir, exist_ok=True)

# 1. High-res Hero Slides
heroes = {
    "hero-1.jpg": r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\alula_luxury_resort_hero_1792928051103.jpg",
    "hero-2.jpg": r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\hero_alula_luxury_night_1792928107662.jpg",
    "hero-3.jpg": r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\red_sea_luxury_resort_hero_1792928077475.jpg",
    "hero-4.jpg": r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\diriyah_luxury_hero_1792928088362.jpg",
}

for name, src in heroes.items():
    dst = os.path.join(images_dir, name)
    with Image.open(src) as im:
        im.resize((1920, 1080), Image.Resampling.LANCZOS).save(dst, quality=95)
    print(f"Saved {name} (1920x1080)")

# 2. Package 5 (Royal VIP Umrah)
with Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\royal_vip_umrah_suite_1792927949466.jpg") as im:
    im.resize((800, 600), Image.Resampling.LANCZOS).save(os.path.join(images_dir, "pkg-5.jpg"), quality=95)
print("Saved pkg-5.jpg (800x600)")

# Verify all required files exist
required = [
    "hero-1.jpg", "hero-2.jpg", "hero-3.jpg", "hero-4.jpg",
    "alula.jpg", "red-sea.jpg", "diriyah.jpg", "asir.jpg",
    "pkg-1.jpg", "pkg-2.jpg", "pkg-3.jpg", "pkg-4.jpg", "pkg-5.jpg", "pkg-6.jpg",
    "gallery-1.jpg", "gallery-2.jpg", "gallery-3.jpg", "gallery-4.jpg"
]

all_ok = True
for r in required:
    p = os.path.join(images_dir, r)
    if os.path.exists(p) and os.path.getsize(p) > 1000:
        print(f"OK: {r} ({os.path.getsize(p):,} bytes)")
    else:
        print(f"MISSING: {r}")
        all_ok = False

logo_path = r"c:\xampp\htdocs\saud_tourism_platform\client\public\logo.png"
if os.path.exists(logo_path) and os.path.getsize(logo_path) > 1000:
    print(f"OK: logo.png ({os.path.getsize(logo_path):,} bytes)")
else:
    print("MISSING: logo.png")
    all_ok = False

print("\nStatus:", "ALL VERIFIED" if all_ok else "INCOMPLETE")
