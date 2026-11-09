import shutil
from PIL import Image

src = r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\royal_vip_umrah_suite_1792927949466.jpg"
dst = r"c:\xampp\htdocs\saud_tourism_platform\client\public\images\pkg-5.jpg"

im = Image.open(src)
im.resize((800, 600), Image.Resampling.LANCZOS).save(dst, quality=95)
print("Copied and resized pkg-5.jpg successfully!")
