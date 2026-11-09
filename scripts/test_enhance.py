from PIL import Image, ImageFilter, ImageEnhance

# Let's inspect enhancing asir and gallery-2 and gallery-4
def enhance(im, scale_factor=3):
    w, h = im.size
    # High-quality Lanczos upscale
    up = im.resize((w * scale_factor, h * scale_factor), Image.Resampling.LANCZOS)
    
    # Sharpness enhancement
    enhancer_s = ImageEnhance.Sharpness(up)
    up = enhancer_s.enhance(1.8)
    
    # Contrast enhancement
    enhancer_c = ImageEnhance.Contrast(up)
    up = enhancer_c.enhance(1.1)
    
    # Color enhancement
    enhancer_col = ImageEnhance.Color(up)
    up = enhancer_col.enhance(1.15)
    
    # Unsharp mask for crisp edge definition
    up = up.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=2))
    
    return up.resize((1200, 800), Image.Resampling.LANCZOS)

print("Enhance function defined")
