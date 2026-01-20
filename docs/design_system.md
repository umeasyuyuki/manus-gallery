# Design System: Manus Gallery (Wam-Hasard Style)

Reference: [WAM HASARD](https://wam-hasard.com/)

## 1. Visual Concept

- **Keywords**: Minimalism, Academic, Museum-like, Serenity, "Hasard" (Chance)
- **Atmosphere**: A digital museum where artworks are the protagonists.
- **Key Characteristics**:
  - High contrast text (Black on Off-white)
  - Generous whitespace (Padding/Margin)
  - Elegant typography mix (Serif headings + Sans-serif body)
  - Subtle interactions (Fade-ins, smooth transitions)

## 2. Color Palette

### Light Theme (Default / Home)

- **Background**: `#f8f8f8` (Off-white / Ghost White)
- **Text Primary**: `#1a1a1a` (Almost Black)
- **Text Secondary**: `#666666` (Dark Gray)
- **Border/Divider**: `#e5e5e5` (Light Gray)

### Dark Theme (Viewer / Overlay)

- **Background**: `#1a1a1a` (Dark Charcoal)
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#cccccc` (Light Gray)

## 3. Typography

### Font Families

Using Google Fonts via `next/font`:

- **Headings (Japanese)**: `Noto Serif JP` (Weight: 400, 700)
- **Headings (English)**: `Cormorant Garamond` or `Spectral` (Serif, Elegant) - *Optional addition for that "museum" feel*
- **Body**: `Noto Sans JP` (Weight: 400, 500)

### Type Scale

- **Site Title**: Serif, Large (2rem+), Tracking wide
- **Section Heading**: Serif, Medium (1.5rem), often accompanied by small English subtitle
- **Card Title**: Serif, Bold (1.125rem)
- **Body Text**: Sans-serif, Small (0.875rem - 1rem), Leading loose (1.8)

## 4. Layout & Spacing

- **Container**: Max-width limited (e.g., `max-w-7xl`), centered.
- **Grid**:
  - Mobile: 1 col
  - Tablet: 2 cols
  - Desktop: 3 cols
  - **Gap**: Large (`gap-8` to `gap-12`)
- **Vertical Rhythm**: Significant spacing between sections (`py-24` or `py-32`).

## 5. UI Components

### Navigation

- **Desktop/Mobile**: Minimal header with Logo (left) and Hamburger Menu (right).
- **Menu Overlay**: Full-screen black overlay with centered white text links.

### Project Card

- **Image**: High aspect ratio, clean edges, subtle hover zoom.
- **Info**: Below image.
  - Title (Serif, Bold)
  - Category/Tag (Sans-serif, Small, Oval border or minimalist text)
  - Creator Name (Sans-serif, Muted)

### Animations

- **Enter**: Elements fade in and slide up slightly when scrolling into view (`framer-motion` recommended).
- **Hover**: Images scale up slightly (1.05x), text color shift.
