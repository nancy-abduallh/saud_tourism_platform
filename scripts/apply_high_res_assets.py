import os
from PIL import Image, ImageFilter, ImageEnhance

brain_dir = r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95"
images_dir = r"c:\xampp\htdocs\saud_tourism_platform\client\public\images"
os.makedirs(images_dir, exist_ok=True)

# Generated high-res files
f_alula_hero = os.path.join(brain_dir, "alula_luxury_resort_hero_1792928051103.jpg")
f_alula_night = os.path.join(brain_dir, "hero_alula_luxury_night_1792928107662.jpg")
f_redsea_hero = os.path.join(brain_dir, "red_sea_luxury_resort_hero_1792928077475.jpg")
f_diriyah_hero = os.path.join(brain_dir, "diriyah_luxury_hero_1792928088362.jpg")
f_umrah = os.path.join(brain_dir, "royal_vip_umrah_suite_1792927949466.jpg")
f_alula_dest = os.path.join(brain_dir, "alula_destination_1792928665218.jpg")
f_redsea_dest = os.path.join(brain_dir, "red_sea_luxury_destination_1792928686607.jpg")
f_diriyah_dest = os.path.join(brain_dir, "diriyah_atturaif_luxury_1792928759574.jpg")

# Source uploads for crops
f_packages_page = os.path.join(brain_dir, ".user_uploaded", "media_1792924150554_3e4ee23b.png")
f_detail_page = os.path.join(brain_dir, ".user_uploaded", "media_1792924189860_e9bb10d7.png")

def save_optimized(src_path, dst_name, size=(1200, 800), crop_box=None):
    with Image.open(src_path).convert("RGB") as im:
        if crop_box:
            im = im.crop(crop_box)
        # Resize to high resolution
        im_res = im.resize(size, Image.Resampling.LANCZOS)
        # Subtle sharpening
        enh = ImageEnhance.Sharpness(im_res)
        im_res = enh.enhance(1.15)
        dst_path = os.path.join(images_dir, dst_name)
        im_res.save(dst_path, "JPEG", quality=95, optimize=True)
        print(f"Saved {dst_name}: {size[0]}x{size[1]} ({os.path.getsize(dst_path):,} bytes)")

def enhance_and_save(src_path, dst_name, crop_box, size=(1200, 800)):
    with Image.open(src_path).convert("RGB") as im:
        crop = im.crop(crop_box)
        w, h = crop.size
        # Multi-stage upscale
        up = crop.resize((w * 3, h * 3), Image.Resampling.LANCZOS)
        up = ImageEnhance.Sharpness(up).enhance(1.8)
        up = ImageEnhance.Contrast(up).enhance(1.1)
        up = ImageEnhance.Color(up).enhance(1.15)
        up = up.filter(ImageFilter.UnsharpMask(radius=2, percent=160, threshold=2))
        final = up.resize(size, Image.Resampling.LANCZOS)
        dst_path = os.path.join(images_dir, dst_name)
        final.save(dst_path, "JPEG", quality=95, optimize=True)
        print(f"Saved enhanced {dst_name}: {size[0]}x{size[1]} ({os.path.getsize(dst_path):,} bytes)")

# 1. Hero slides (1920x1080 ultra high res)
save_optimized(f_alula_hero, "hero-1.jpg", size=(1920, 1080))
save_optimized(f_alula_night, "hero-2.jpg", size=(1920, 1080))
save_optimized(f_redsea_hero, "hero-3.jpg", size=(1920, 1080))
save_optimized(f_diriyah_hero, "hero-4.jpg", size=(1920, 1080))

# 2. Destinations (1200x800 high res)
save_optimized(f_alula_dest, "alula.jpg", size=(1200, 800))
save_optimized(f_redsea_dest, "red-sea.jpg", size=(1200, 800))
save_optimized(f_diriyah_dest, "diriyah.jpg", size=(1200, 800))
# Asir from packages_page
enhance_and_save(f_packages_page, "asir.jpg", crop_box=(620, 206, 792, 394), size=(1200, 800))

# 3. Packages (1200x800 high res)
save_optimized(f_alula_night, "pkg-1.jpg", size=(1200, 800))
save_optimized(f_redsea_hero, "pkg-2.jpg", size=(1200, 800))
save_optimized(f_diriyah_hero, "pkg-3.jpg", size=(1200, 800))
# pkg-4 is Asir
enhance_and_save(f_packages_page, "pkg-4.jpg", crop_box=(620, 206, 792, 394), size=(1200, 800))
# pkg-5 is Royal Umrah VIP
save_optimized(f_umrah, "pkg-5.jpg", size=(1200, 800))
# pkg-6 is AlUla Desert Camp
save_optimized(f_alula_hero, "pkg-6.jpg", size=(1200, 800))

# 4. Gallery Images (high res for WhyUs, CTA banner, and details)
# gallery-1 (Why Us right card 1 & night dining):
save_optimized(f_alula_night, "gallery-1.jpg", size=(1200, 800))
# gallery-2 (Why Us right card 2 & balloons):
enhance_and_save(f_detail_page, "gallery-2.jpg", crop_box=(811, 81, 1006, 178), size=(1200, 800))
# gallery-3 (Used as full width background for CTA banner! Must be 1920x1080 ultra high res!):
save_optimized(f_alula_hero, "gallery-3.jpg", size=(1920, 1080))
# gallery-4 (Range rover convoy):
enhance_and_save(f_detail_page, "gallery-4.jpg", crop_box=(810, 182, 1007, 280), size=(1200, 800))

print("\nAll high-resolution professional images applied successfully!")
