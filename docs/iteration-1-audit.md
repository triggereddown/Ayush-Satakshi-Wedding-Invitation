# Iteration 1 Audit

## Current project structure

- `Assets/`
- `docs/`
- `index.html`
- `package.json`
- `src/`
- `vite.config.js`

## Current stack and dependencies

- Vite
- React
- React DOM
- No animation library added for Iteration 1
- CSS-driven motion only

## Existing relevant components

- None before this iteration
- Added `src/components/opening/OpeningInvitation.jsx`

## Actual asset directories

- `Assets/wedding-assets-generated/backgrounds`
- `Assets/wedding-assets-generated/branding`
- `Assets/wedding-assets-generated/characters`
- `Assets/wedding-assets-generated/decorative`
- `Assets/wedding-assets-generated/indian-elements`
- `Assets/wedding_flower_assets_clean`

## Confirmed assets usable for Iteration 1

- Opening card:
  `Assets/wedding-assets-generated/closedCard.jpg`
  1696x2528 JPG
  visually strong premium wedding-card artwork
  checkerboard baked into image background, so used as a framed hero art rather than assumed transparent

- Paper backdrop:
  `Assets/wedding-assets-generated/backgrounds/ivory-paper.png`
  170x290 PNG
  floral paper texture
  no alpha detected
  usable as inset ornamental layer

- Monogram:
  `Assets/wedding-assets-generated/branding/couple-monogram.png`
  410x334 PNG
  premium gold monogram artwork
  no alpha detected but composition is still usable over light paper

- Toran:
  `Assets/wedding-assets-generated/indian-elements/toran.png`
  280x210 PNG
  marigold hanging decor
  no alpha detected
  usable as top accent

- Gold arch:
  `Assets/wedding-assets-generated/indian-elements/gold-arch.png`
  330x425 PNG
  ornate floral arch
  no alpha detected
  usable as faint backdrop

- Decorative leaves:
  `Assets/wedding-assets-generated/decorative/decorative-leaves.png`
  250x390 PNG
  watercolor leaves
  no alpha detected
  usable as supporting accent

- Floral PNGs with transparency:
  examples include
  `Assets/wedding_flower_assets_clean/floral_asset_44.png`
  `Assets/wedding_flower_assets_clean/floral_asset_52.png`
  `Assets/wedding_flower_assets_clean/floral_asset_55.png`
  `Assets/wedding_flower_assets_clean/floral_asset_71.png`
  all `Format32bppArgb`
  confirmed transparent
  best suited for floating decorative layers

## Missing assets for a true physical flap/seal simulation

- No separate envelope flap layer
- No separate wax seal with transparency
- No dedicated inner-card front/back layers
- No Bengali-specific calligraphy asset for names

## Iteration 1 implementation plan

- Build a centralized asset map in `src/config/assets.js`
- Keep invitation copy in `src/config/weddingConfig.js`
- Create a single opening scene with:
  closed premium card,
  wax-seal inspired interaction,
  layered floral atmosphere,
  CSS-only open transition,
  revealed inner invitation mood panel
- Preserve mobile-first layout and reduced-motion support
- Stop after the opening experience without implementing later sections
