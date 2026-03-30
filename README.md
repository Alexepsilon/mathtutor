# Math Tutor PWA — T192/T193

A Progressive Web App for engineering mathematics practice, designed for T192/T193 Open University modules.

## Features

- **15 Topic Areas**: BIDMAS, Fractions, Percentages, Powers & Indices, Logarithms, Exponentials, Trigonometry, Vectors, Algebra, Simultaneous Equations, Quadratics, Differentiation, Stationary Points, Integration, Units & Prefixes
- **Mastery System**: 10 correct answers at 80%+ accuracy to master each topic
- **Spaced Repetition (SRS)**: Cards are scheduled for review based on performance
- **Test Mode**: Create custom quizzes with selectable topics
- **3 Difficulty Levels**: Easy, Medium, Hard — each level generates genuinely different questions
- **Topic Explanations**: Theory reference for each topic
- **Detailed Statistics**: Per-topic accuracy, mistake analysis, activity tracking
- **Offline Support**: Works without internet after first load (PWA with service worker)
- **Dark Theme**: Easy on the eyes for evening study
- **Mobile-First**: Responsive design, "Add to Home Screen" support

## Installation

### GitHub Pages (Hosted)
Visit: https://alexepsilon.github.io/mathtutor/

### Add to Home Screen
1. Open the URL in Chrome/Safari
2. Tap the share/menu button
3. Select "Add to Home Screen" or "Install App"
4. The app will appear like a native app

## Files

- `index.html` — Main application (single-file PWA)
- `manifest.json` — PWA manifest for "Add to Home Screen"
- `sw.js` — Service worker for offline caching
- `icon-192.png` / `icon-512.png` — App icons

## Data Storage

All progress is stored in localStorage:
- `mathtutor_progress` — Per-topic correct/total counts
- `mathtutor_srs` — Spaced repetition card data
- `mathtutor_attempts` — Recent attempt history (last 500)
- `mathtutor_mistakes` — Mistake type counts

## Math Rendering

Uses KaTeX for LaTeX math rendering, loaded from CDN.

## License

MIT
