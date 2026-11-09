import os
from PIL import Image

brain = r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95"
images_dir = r"c:\xampp\htdocs\saud_tourism_platform\client\public\images"
os.makedirs(images_dir, exist_ok=True)

# Sources
f_alula_resort = os.path.join(brain, "alula_luxury_resort_hero_1792928051103.jpg")
f_alula_night  = os.path.join(brain, "hero_alula_luxury_night_1792928107662.jpg")
f_redsea_hero  = os.path.join(brain, "red_sea_luxury_resort_hero_1792928077475.jpg")
f_diriyah_hero = os.path.join(brain, "diriyah_luxury_hero_1792928088362.jpg")
f_alula_dest   = os.path.join(brain, "alula_destination_1792928665218.jpg")
f_redsea_dest  = os.path.join(brain, "red_sea_luxury_destination_1792928686607.jpg")
f_diriyah_dest = os.path.join(brain, "diriyah_atturaif_luxury_1792928759574.jpg")
f_asir         = os.path.join(brain, "asir_mountains_clouds_1792930005051.jpg")
f_balloons     = os.path.join(brain, "alula_hot_air_balloons_1792930024573.jpg")
f_rover        = os.path.join(brain, "luxury_vip_transport_desert_1792930055099.jpg")
f_umrah        = os.path.join(brain, "royal_vip_umrah_suite_1792927949466.jpg")

mapping = {
    # 1. Hero slides (1920x1080)
    "hero-1.jpg": (f_alula_resort, (1920, 1080)),
    "hero-2.jpg": (f_alula_night,  (1920, 1080)),
    "hero-3.jpg": (f_redsea_hero,  (1920, 1080)),
    "hero-4.jpg": (f_diriyah_hero, (1920, 1080)),

    # 2. Destination cards (1200x800)
    "alula.jpg":   (f_alula_dest,   (1200, 800)),
    "red-sea.jpg": (f_redsea_dest,  (1200, 800)),
    "diriyah.jpg": (f_diriyah_dest, (1200, 800)),
    "asir.jpg":    (f_asir,         (1200, 800)),

    # 3. Featured packages (1200x800)
    "pkg-1.jpg": (f_alula_night,  (1200, 800)), # AlUla stars heritage journey
    "pkg-2.jpg": (f_redsea_hero,  (1200, 800)), # Red Sea water villas & yachts
    "pkg-3.jpg": (f_diriyah_hero, (1200, 800)), # Diriyah kings route
    "pkg-4.jpg": (f_asir,         (1200, 800)), # Asir & Abha clouds & peaks
    "pkg-5.jpg": (f_umrah,        (1200, 800)), # Royal VIP Umrah
    "pkg-6.jpg": (f_alula_resort, (1200, 800)), # AlUla luxury desert camp

    # 4. Gallery images
    "gallery-1.jpg": (f_alula_night,  (1200, 800)),  # Why Us card 1 & night dining
    "gallery-2.jpg": (f_balloons,     (1200, 800)),  # Why Us card 2 & AlUla hot air balloons
    "gallery-3.jpg": (f_alula_resort, (1920, 1080)), # CTA Banner full-width background
    "gallery-4.jpg": (f_rover,        (1200, 800)),  # Luxury VIP transport (Range Rover)
}

for filename, (src, size) in mapping.items():
    dst = os.path.join(images_dir, filename)
    with Image.open(src).convert("RGB") as im:
        im.resize(size, Image.Resampling.LANCZOS).save(dst, "JPEG", quality=96, optimize=True)
    print(f"Applied {filename}: {size[0]}x{size[1]} ({os.path.getsize(dst):,} bytes)")

print("\nAll 18 images successfully written from native 4K luxury photography!")
