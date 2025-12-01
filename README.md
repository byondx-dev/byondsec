# byondSEC | Elite Offensive Security Platform

> "We break in before attackers do."

![Project Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech](https://img.shields.io/badge/tech-React%20%7C%20TypeScript%20%7C%20Tailwind-39FF88)

A high-performance, Awwwards-worthy landing page for a premium penetration testing boutique. This project features advanced, physics-based animations, WebGL/Canvas effects, and a highly polished cyberpunk aesthetic designed to convert high-value clients.

## ⚡ Features

### 🎨 Visual & Aesthetic
- **Cyberpunk / SOC Theme**: Dark mode interface with neon green (#39FF88) and cyan accents.
- **Aurora Background**: Fluid, GPU-accelerated background gradients.
- **Threads Animation**: Interactive canvas background that responds to scroll and content height.
- **Terminal Emulator**: Realistic typing simulation with syntax highlighting and mock execution flow.

### 🚀 Animations & Interactions
- **Magnetic Buttons**: Physics-based buttons that gravitate toward the mouse cursor.
- **Tilt Cards**: 3D perspective hover effects for service cards.
- **Spotlight Effects**: Mouse-tracking radial gradients on cards.
- **Decrypted Text**: Matrix-style character shuffling reveal effects.
- **Border Beams**: Animated flowing borders for pricing highlights.
- **Scroll Reveal**: Staggered entrance animations for content.
- **Logo Loop**: Infinite scrolling SVG marquee.
- **Articles Experience**: Blog/Articles overview with category cards, carousel strip on the homepage, mega-dropdown in the header, and detail pages with sticky TOC and related posts.

### 🛠 Architecture
- **Single Page Application (SPA)** with client-side routing.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop (including expansive mobile hero sections).
- **Modular Components**: Clean separation of concerns (UI, Layout, Logical components).

## 🛠️ Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Motion**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Space Grotesk (Headers), Inter (Body)

## 📂 Project Structure

```
.
├── components/            # UI sections
│   ├── ui/                # Reusable animations (Threads, Glitch, etc.)
│   ├── Header.tsx         # Navigation with mega dropdown for Articles
│   ├── Hero.tsx           # Main landing area with Terminal
│   ├── Services.tsx       # Services grid
│   ├── Blog.tsx           # Articles overview section
│   └── ...                # Other sections
├── pages/                 # Full-page views (Articles, Article detail, Contact, Services)
├── data/blogPosts.ts      # Articles data source
├── App.tsx                # Main routing/layout logic
├── index.tsx              # Entry point
├── index.html             # Root HTML & Tailwind config (CDN)
└── ...
```

## 🚀 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/byondSEC.git
    cd byondSEC
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 🎨 Customization

### changing the Color Scheme
The project uses a CSS variable-like structure in the Tailwind config within `index.html`. Modify the `colors` object to change the brand identity:

```javascript
colors: {
  primary: '#39FF88', // Your Brand Color
  accent: '#29E8FF',  // Secondary Color
  background: '#02040A', // Dark Background
}
```

### Adding Blog Posts
Posts live in `data/blogPosts.ts`. Add a new `BlogPost` object with:

- `slug`, `title`, `date`, `author`, `category`, `tags`, `excerpt`, `readTime`, `featured`, `thumbnail`
- `sections`: array of `{ id, title, level: 2|3, paragraphs: string[], bullets?, quote? }`

Homepage strip pulls from this data; the Articles overview supports `?category=<Name>` filtering (e.g. `/blog?category=SaaS`).

### Articles Dropdown
The header has a mega-dropdown under the Articles chevron; click “Articles” to go to `/blog`, click the chevron to open the menu.

## 🤝 Credits

- Design inspiration from React Bits and Awwwards.
- Built by [Your Name/Company].

---
© 2025 byondSEC. Built by hackers, not marketers.
