import zlib, struct, math

def make_png(width, height, rgba_data):
    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)
    
    ihdr = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    raw = bytearray()
    for y in range(height):
        raw.append(0) # filter none
        raw.extend(rgba_data[y * width * 4 : (y + 1) * width * 4])
    
    idat = zlib.compress(bytes(raw), 9)
    return b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', ihdr) + chunk(b'IDAT', idat) + chunk(b'IEND', b'')

# 16x16 exact pixel map matching the user's uploaded pack_icon.png
# Device colors:
# Body outer: #22232a -> (34, 35, 42)
# Notch ear buttons: #5b6275 -> (91, 98, 117)
# Bezel inner: #121318 -> (18, 19, 24)
# Screen white glare: #ffffff -> (255, 255, 255)
# Screen cyan top: #40b0ff -> (64, 176, 255)
# Screen cyan light: #6cd0ff -> (108, 208, 255)
# Screen eye grey-blue: #b9cadc -> (185, 202, 220)
# Screen blue mid: #308ee8 -> (48, 142, 232)
# Screen yellow status: #ffd541 -> (255, 213, 65)
# Screen blue dark: #2777d8 -> (39, 119, 216)
# Screen blue-purple: #4655b7 -> (70, 85, 183)
# Screen purple: #7444ad -> (116, 68, 173)
# Home button: #747b8f -> (116, 123, 143)

grid_16 = [
    # Row 0
    [None]*16,
    # Row 1
    [None]*16,
    # Row 2 (Device top border)
    [None]*5 + ['D']*6 + [None]*5,
    # Row 3 (Notch / ear accents)
    [None]*5 + ['E1', 'E2', 'D', 'D', 'E2', 'E1'] + [None]*5,
    # Row 4 (Upper bezel)
    [None]*4 + ['D', 'B', 'B', 'B', 'B', 'B', 'B', 'D'] + [None]*4,
    # Row 5 (Screen top row)
    [None]*4 + ['D', 'B', 'W', 'W', 'C1', 'C2', 'B', 'D'] + [None]*4,
    # Row 6 (Screen eyes row)
    [None]*4 + ['D', 'B', 'EYE', 'S1', 'S1', 'EYE', 'B', 'D'] + [None]*4,
    # Row 7 (Screen yellow bar)
    [None]*4 + ['D', 'B', 'S2', 'YEL', 'YEL', 'S2', 'B', 'D'] + [None]*4,
    # Row 8 (Screen blue-purple)
    [None]*4 + ['D', 'B', 'P1', 'P1', 'P1', 'P1', 'B', 'D'] + [None]*4,
    # Row 9 (Screen purple)
    [None]*4 + ['D', 'B', 'P2', 'P2', 'P2', 'P2', 'B', 'D'] + [None]*4,
    # Row 10 (Lower bezel)
    [None]*4 + ['D', 'B', 'B', 'B', 'B', 'B', 'B', 'D'] + [None]*4,
    # Row 11 (Home button top)
    [None]*4 + ['D', 'D', 'D', 'BTN', 'BTN', 'D', 'D', 'D'] + [None]*4,
    # Row 12 (Home button bottom)
    [None]*4 + ['D', 'D', 'D', 'BTN', 'BTN', 'D', 'D', 'D'] + [None]*4,
    # Row 13 (Device bottom border)
    [None]*5 + ['D']*6 + [None]*5,
    # Row 14
    [None]*16,
    # Row 15
    [None]*16,
]

color_map = {
    'D': (34, 35, 42),
    'E1': (34, 35, 42),
    'E2': (91, 98, 117),
    'B': (18, 19, 24),
    'W': (255, 255, 255),
    'C1': (64, 176, 255),
    'C2': (108, 208, 255),
    'EYE': (185, 202, 220),
    'S1': (48, 142, 232),
    'S2': (39, 119, 216),
    'YEL': (255, 213, 65),
    'P1': (70, 85, 183),
    'P2': (116, 68, 173),
    'BTN': (116, 123, 143),
}

# Scale up to 256x256 using nearest-neighbor (16x per pixel)
SCALE = 16
WIDTH = 16 * SCALE
HEIGHT = 16 * SCALE
rgba = bytearray()

for y in range(HEIGHT):
    grid_y = y // SCALE
    # Compute smooth background gradient for this pixel
    # Top-left has more purple-blue, bottom-right has deeper cobalt
    diag = (y / HEIGHT * 0.7) + (0.3)
    bg_r = int(45 * (1 - diag * 0.3) + 30 * diag)
    bg_g = int(65 * (1 - diag * 0.35) + 40 * diag)
    bg_b = int(140 * (1 - diag * 0.3) + 90 * diag)

    for x in range(WIDTH):
        grid_x = x // SCALE
        cell = grid_16[grid_y][grid_x]
        if cell is None:
            # Gradient background
            # Add subtle corner vignette
            dx = (x / WIDTH) - 0.5
            dy = (y / HEIGHT) - 0.5
            dist = math.sqrt(dx*dx + dy*dy)
            factor = 1.0 - (dist * 0.25)
            r = int(min(255, max(0, bg_r * factor)))
            g = int(min(255, max(0, bg_g * factor)))
            b = int(min(255, max(0, bg_b * factor)))
            rgba.extend([r, g, b, 255])
        else:
            c = color_map[cell]
            rgba.extend([c[0], c[1], c[2], 255])

png_bytes = make_png(WIDTH, HEIGHT, rgba)

with open('public/pack_icon.png', 'wb') as f:
    f.write(png_bytes)

with open('public/pack_icon.jpg', 'wb') as f:
    f.write(png_bytes)

with open('src/assets/images/pack_icon.png', 'wb') as f:
    f.write(png_bytes)

print('Exact unedited pack_icon.png generated successfully')
