from PIL import Image

# Let's inspect packages_page (1024, 571)
im_pkg = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924150554_3e4ee23b.png")
print("packages_page size:", im_pkg.size)

# Let's inspect detail_page (1024, 571)
im_det = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924189860_e9bb10d7.png")
print("detail_page size:", im_det.size)

# Let's inspect hero_screen (1024, 648)
im_hero = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924024562_02fb643f.jpg")
print("hero_screen size:", im_hero.size)

# Let's inspect home_page (571, 1024)
im_home = Image.open(r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924101618_5f654c14.png")
print("home_page size:", im_home.size)
