from PIL import Image
import os

det = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924189860_e9bb10d7.png").convert("RGB")
pkg = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924150554_3e4ee23b.png").convert("RGB")
hero = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924024562_02fb643f.jpg").convert("RGB")
home = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924101618_5f654c14.png").convert("RGB")

out_dir = r"c:\xampp\htdocs\saud_tourism_platform\client\public\images"
os.makedirs(out_dir, exist_ok=True)

# 1. Gallery images from detail_page
# Gallery 1: Night dinner under stars (top left)
g1 = det.crop((611, 81, 807, 178))
g1.resize((800, 600), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "gallery-1.jpg"), quality=95)

# Gallery 2: Hot air balloons in AlUla (top right)
g2 = det.crop((811, 81, 1006, 178))
g2.resize((800, 600), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "gallery-2.jpg"), quality=95)

# Gallery 3: Luxury outdoor cabana / spa pavilion (bottom left)
g3 = det.crop((611, 182, 808, 280))
g3.resize((800, 600), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "gallery-3.jpg"), quality=95)

# Gallery 4: Range Rover convoy in desert (bottom right)
g4 = det.crop((810, 182, 1007, 280))
g4.resize((800, 600), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "gallery-4.jpg"), quality=95)

print("Saved gallery-1 to gallery-4")

# 2. Destinations from packages_page
# alula.jpg: Card 1 (AlUla Maraya reflection & stars)
alula = pkg.crop((76, 206, 249, 394))
alula.resize((800, 600), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "alula.jpg"), quality=95)

# red-sea.jpg: Card 2 (Red Sea overwater bungalows in turquoise water)
red_sea = pkg.crop((257, 206, 430, 394))
red_sea.resize((800, 600), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "red-sea.jpg"), quality=95)

# diriyah.jpg: Card 3 (Diriyah historical palace at night)
diriyah = pkg.crop((439, 206, 612, 394))
diriyah.resize((800, 600), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "diriyah.jpg"), quality=95)

# asir.jpg: Card 4 (Asir green foggy mountain peaks)
asir = pkg.crop((620, 206, 792, 394))
asir.resize((800, 600), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "asir.jpg"), quality=95)

print("Saved alula, red-sea, diriyah, asir")

# 3. Packages:
# pkg-1.jpg: AlUla stars heritage journey (AlUla Maraya / Night Stars)
alula.resize((800, 600), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "pkg-1.jpg"), quality=95)

# pkg-2.jpg: Red Sea water villas & yachts
red_sea.resize((800, 600), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "pkg-2.jpg"), quality=95)

# pkg-3.jpg: Diriyah kings route
diriyah.resize((800, 600), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "pkg-3.jpg"), quality=95)

# pkg-4.jpg: Asir clouds & peaks
asir.resize((800, 600), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "pkg-4.jpg"), quality=95)

# pkg-6.jpg: AlUla luxury desert camp (from home_page card 3: desert tent with pool)
pkg6 = home.crop((367, 450, 513, 557))
pkg6.resize((800, 600), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "pkg-6.jpg"), quality=95)

print("Saved pkg-1, pkg-2, pkg-3, pkg-4, pkg-6")

# 4. Hero slides:
# hero-1.jpg: The full hero landscape view from hero_screen (clean crop of the luxury resort & camels at sunset)
# In hero_screen (1024, 648), crop from y=50 to 520, or full width and height
# Let's crop hero-1 so it captures the full majestic resort, pool, and canyon
h1 = hero.crop((0, 50, 1024, 520))
h1.resize((1920, 1080), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "hero-1.jpg"), quality=95)

# hero-2.jpg: AlUla ancient wonders (from detail_page left big image or AlUla Maraya)
h2 = det.crop((17, 81, 609, 280))
h2.resize((1920, 1080), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "hero-2.jpg"), quality=95)

# hero-3.jpg: The Red Sea pristine archipelago (from Red Sea card, enhanced wide)
h3 = red_sea.resize((1920, 1080), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "hero-3.jpg"), quality=95)

# hero-4.jpg: Diriyah cradle of culture (from Diriyah card, enhanced wide)
h4 = diriyah.resize((1920, 1080), Image.Resampling.LANCZOS).save(os.path.join(out_dir, "hero-4.jpg"), quality=95)

print("Saved hero-1 to hero-4")
