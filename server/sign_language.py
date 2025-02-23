import urllib.parse

def translate_sign_language(text="hello world"):
    # Simple mapping from words to placeholder image URLs.
    SIGN_MAP = {
        "hello": "https://via.placeholder.com/100?text=HELLO",
        "world": "https://via.placeholder.com/100?text=WORLD",
        "i": "https://via.placeholder.com/100?text=I",
        "am": "https://via.placeholder.com/100?text=AM",
        "your": "https://via.placeholder.com/100?text=YOUR",
        "translator": "https://via.placeholder.com/100?text=TRANSLATOR"
    }
    
    words = text.lower().split()
    translation_images = []
    for word in words:
        # Use the mapped URL if available; otherwise, use a generic unknown placeholder.
        image_url = SIGN_MAP.get(word, "https://via.placeholder.com/100?text=?")
        translation_images.append(image_url)
    
    # Generate an AI avatar URL using DiceBear Avatars v6 API (for demo purposes).
    seed = urllib.parse.quote_plus(text)
    avatar_url = f"https://api.dicebear.com/6.x/bottts/svg?seed={seed}"
    
    return translation_images, avatar_url
