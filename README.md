# 67studio 🎬
**High-Fidelity Netflix Web Client & Pluggable Streaming Platform**

🌐 **Live Website**: [https://67studio-five.vercel.app](https://67studio-five.vercel.app)  
📦 **GitHub Repository**: [https://github.com/dusk-futile/67studio](https://github.com/dusk-futile/67studio)  
🚀 **Vercel Dashboard**: [Inspect Deployment](https://vercel.com/omarelkabbaney2010-3919s-projects/67studio)

---

## 🌟 Overview

**67studio** is a pixel-perfect, production-ready reproduction of the Netflix web platform, engineered using screenshot-to-code reverse design methodologies. It captures Netflix's exact visual system, color tokens, fluid micro-interactions, responsive carousel sliders, iconic hover-expanding preview cards, deep-dive modal dialogues with episode lists, and a custom fullscreen cinema video player.

Built on **Next.js 14**, **TypeScript**, and **Tailwind CSS**, with a pluggable architecture allowing instantaneous swap-in of real streaming APIs or TMDB.

---

## 🎨 Netflix Design Tokens & Palette

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Primary Red** | `#E50914` | Brand logo, CTAs, Top 10 badges, progress bars |
| **Canvas Black** | `#141414` | Background of content shelves and main feeds |
| **Void Deep** | `#000000` | Header scroll tint, cinema player background |
| **Surface Base** | `#181818` | Movie cards, modal containers |
| **Surface Hover** | `#242424` / `#2F2F2F` | Expanded hover drawer, interactive pills |
| **Match Green** | `#46D369` | "99% Match" affinity recommendation score |
| **Text Primary** | `#FFFFFF` | Headings, active nav, primary text |
| **Text Muted** | `#808080` / `#A3A3A3` | Metadata, year, genres, audio tags |

---

## 🚀 Key Features

### 1. Dynamic Billboard Hero
- Full-viewport cinematic spotlight featuring 3-way vignette gradient overlays.
- Seamless video trailer playback with auto-play and mute/unmute audio control.
- Instant "Play" button and frosted-glass "More Info" dialog trigger.
- Pinned age maturity rating badge (`18+`, `TV-MA`).

### 2. Iconic Netflix Hover Expansion Card
- **320ms intentional hover delay** to prevent erratic triggers during rapid scrolling.
- **1.35x zoom scale** with intelligent edge detection (prevents clipping on screen borders).
- Live looping video preview on hover.
- Quick action drawer: Play, Add/Remove from My List (`+` / `✓`), Thumbs Up, and Chevron info toggle.
- Full metadata line: Match %, maturity badge, duration, 4K/HD tag, and dot-separated genre pills.

### 3. Deep Detail Modal & Episode Browser
- Large video banner with volume toggle.
- Comprehensive synopsis, content advisory, starring cast, and director credits.
- Multi-season episode explorer: Season dropdown, episode cards with thumbnails, runtime, summaries, and individual play triggers.
- "More Like This" 3-column recommendation grid.

### 4. Custom Cinema Video Player
- Auto-hiding control HUD after 3 seconds of inactivity.
- Precision scrubbing bar with red progress track and timecode.
- Play/Pause, 10s Skip Forward/Backward, Volume slider, and Fullscreen toggle.
- Playback speed selector (`0.5x` to `2.0x`) and Audio/Subtitle language menu.
- Keyboard shortcuts: `Space` / `k` (Play/Pause), `f` (Fullscreen), `m` (Mute), `ArrowLeft/Right` (10s seek), `Esc` (Close).

### 5. Live Debounced Instant Search & Free Movie DB API Integration
- Live API integration with Free Movie DB & JustWatch (`https://imdb.iamidiotareyoutoo.com/justwatch?q=...`).
- Real-time search across titles, genres, directors, and cast members.
- Instant responsive grid layout with filter pills (All, Movies, TV Shows).

### 6. Persistent "My List" & Profile Switcher
- Instant bookmarking stored in `localStorage` (`67studio_my_list`).
- Generates a dedicated "My List" content shelf on the home feed.
- Multi-profile selector (Omar, Kids, Studio VIP).

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/dusk-futile/67studio.git
cd 67studio

# Install dependencies
npm install

# Start development server
npm run dev

# Run production build
npm run build
npm run start
```
