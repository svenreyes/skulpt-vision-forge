# SKULPT 

**SKULPT** is a branding studio built for visionary startups. We invest sweat equity to help bring ambitious ideas to life through compelling brand identity. This website serves as our digital presence and showcase.

> "Your vision, our expertise, shared success."

---

## 🔧 Tech Stack

- **React + TypeScript**
- **Vite** – fast dev environment
- **TailwindCSS** – utility-first styling
- **Lucide-react** – for modern iconography
- **Custom fonts** – Nersans Two, Sohne Kraftig, Sohne Breit
- **ShadCN (optional)** – for styled components if used
- **GitHub Pages** – for deployment

---

## Brand & Visual Direction

- **Monochromatic gradient theme**: deep navy to black
- **Interactive 3D visual sections**: stemplayer-inspired carousel and soft-edged video mask
- **Neumorphic buttons**: soft, tactile UI for play and interaction
- **Typography**:
    - `Nersans Two`: headings and logo
    - `Sohne Kraftig`: subheadings and buttons
    - `Sohne Breit`: body text

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/skulpt.git
cd skulpt
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the dev server

```bash
npm run dev
```

App will run on [http://localhost:5173](http://localhost:5173).

---

## Fonts Setup

Drop your font `.otf` files into `src/fonts/` and import them in `index.css` or via `@font-face`. Tailwind is configured to use:

```js
fontFamily: {
    heading: ['Nersans Two', 'sans-serif'],
    subheading: ['Sohne Kraftig', 'sans-serif'],
    body: ['Sohne Breit', 'sans-serif'],
}
```

---

## Deployment

This project can be deployed to GitHub Pages or Vercel.

### GitHub Pages

```bash
npm run build
```

Then push the `dist/` folder to your `gh-pages` branch, or use a GitHub Action for auto-deploy.

---

## Inspiration

The visual design is inspired by the digital aesthetic of [stemplayer.com](https://stemplayer.com) and minimalist tactile interfaces.

---

## License

© 2024 SKULPT. All rights reserved.
