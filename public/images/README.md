# Yukako image assets

This folder contains image assets for the Yoshii Yukako fan portal.

Main paths:

- `yukako-hero-hall.jpg`
- `yukako-portrait.jpg`
- `yukako-profile.jpg`
- `yukako-gojet-poster.jpg`
- `yukako-gojet-detail.jpg`
- `yukako-gojet-goods.jpg`
- `showroom-card.jpg`

Gallery paths:

- `gallery/yukako-*.jpg`

When adding or replacing images:

1. Use a new filename instead of overwriting an existing one.
2. Run `node scripts/generate-responsive-images.mjs`.
3. Reference images through `getResponsiveImageProps`.
4. Keep mobile photos naturally visible; avoid mobile-only cropping.
