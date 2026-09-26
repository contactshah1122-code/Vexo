# VEXO — Premium WordPress Theme for Fine Art Adult Photography & Video Discovery

VEXO is an installable, modern WordPress theme architected for lawful, consensual, appropriately licensed 18+ adult fine art photography, monochrome chiaroscuro portfolios, and cinematic video discovery.

---

## 1. Theme Architecture & File Map

```
vexo/
├── style.css               # Theme declaration, typography, and dark-mode styles
├── functions.php           # Post Types (vexo_album, vexo_video), Taxonomies, Nonces, AJAX
├── header.php              # 18+ Age verification gate, brand navigation, live search
├── footer.php              # Regulatory 18 U.S.C. 2257 statement, links, lightbox modal
├── front-page.php          # Split-screen hero, recent albums, and video reels strip
├── index.php               # Fallback feed
├── archive.php             # Category and custom post type archive template
├── single.php              # Single Photo Album & Video discovery view
├── page.php                # Standard pages (About, Terms, Privacy, Report, Takedown)
├── search.php              # Real-time search results template
├── 404.php                 # Elegant 404 unexposed plate error page
├── screenshot.png          # WordPress Theme Dashboard screenshot preview
├── assets/
│   ├── css/                # Supplemental styles
│   ├── js/                 # main.js (Age gate, Lightbox, EXIF, Favorites)
│   └── images/             # Visual image assets and plate photography
└── template-parts/
    ├── card-album.php      # Reusable photo album card
    └── card-video.php      # Reusable video card with duration and rating
```

---

## 2. Installation Instructions

### Option A: WordPress Admin Upload (Recommended)
1. Download `vexo-theme.zip`.
2. In your WordPress Admin, go to **Appearance > Themes > Add New Theme**.
3. Click **Upload Theme** at the top.
4. Select `vexo-theme.zip` and click **Install Now**.
5. Once uploaded, click **Activate**.

### Option B: Manual FTP / SFTP Upload
1. Extract `vexo-theme.zip` into `wp-content/themes/vexo/`.
2. In your WordPress dashboard, navigate to **Appearance > Themes**.
3. Locate **VEXO** and click **Activate**.

---

## 3. Recommended Pages & Slugs

Create the following WordPress Pages under **Pages > Add New**:
- **Home** (Set as static front page under *Settings > Reading*)
- **Photos** (`/photos`) - Shows Photo Albums archive
- **Videos** (`/videos`) - Shows Video Reels archive
- **Categories** (`/categories`) - Aesthetic taxonomies
- **Trending** (`/trending`)
- **Recently Added** (`/recent`)
- **Favorites** (`/favorites`)
- **Report Content** (`/report`)
- **Takedown & DMCA** (`/takedown`)
- **About the Archive** (`/about`)
- **Terms of Service** (`/terms`)
- **Privacy Policy** (`/privacy`)
- **Contact** (`/contact`)

---

## 4. Content Models & Custom Meta Fields

### Photo Albums (`vexo_album`)
- `_vexo_photographer`: Full name of photographer/artist
- `_vexo_model_names`: Names and ages of depicted adult models (e.g. `Camille Durand (24)`)
- `_vexo_release_id`: 18 U.S.C. 2257 release ID (e.g. `MR-2026-7841A`)
- `_vexo_resolution`: Visual resolution (e.g. `4K`)
- `_vexo_photos_count`: Number of plates in collection

### Videos (`vexo_video`)
- `_vexo_director`: Director name
- `_vexo_duration`: MM:SS (e.g. `14:28`)
- `_vexo_rating`: Critical rating (e.g. `4.96`)
- `_vexo_video_url`: Direct video MP4/HLS URL or streaming embed
- `_vexo_resolution`: 4K / Cinema 2K / 1080p

---

## 5. Security & Statutory Compliance (18 U.S.C. § 2257)
- **Zero Profiling**: All user favorites and age confirmation states are stored locally on the client's browser.
- **CSRF Protection**: All reporting and takedown forms use secure `wp_create_nonce('vexo_security_nonce')` validation.
- **Sanitized Inputs**: All server endpoints apply `sanitize_text_field`, `sanitize_textarea_field`, and `sanitize_email`.
