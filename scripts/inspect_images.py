from PIL import Image

images = {
    "hero_screen": r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924024562_02fb643f.jpg",
    "home_page": r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924101618_5f654c14.png",
    "packages_page": r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924150554_3e4ee23b.png",
    "detail_page": r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924189860_e9bb10d7.png",
    "logo": r"C:\Users\newshop\.gemini\antigravity\brain\93ddeeba-45c9-4ee2-a90c-e913a8584c95\.user_uploaded\media_1792924242063_dedd6e15.jpg",
}

for name, path in images.items():
    with Image.open(path) as im:
        print(f"{name}: {im.size}, mode={im.mode}")
