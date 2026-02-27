

## Changes

1. **Update `src/pages/Pricing.tsx`**:
   - Change `ANNUAL_DISCOUNT` from 0.15 to 0.10
   - Update "Save 15%" badge to "Save 10%"
   - Fix `formatNumber` to never show more than 1 decimal place, round up
   - Show both monthly AND annual totals in the summary card at the bottom (not just the selected one)

2. **Update `src/index.css`**:
   - Force dark mode on body or set dark class
   - Replace color scheme with cool blues, turquoise, purple, and greens
   - Import Mulish from Google Fonts and set as default font

3. **Update `index.html`**:
   - Add Google Fonts link for Mulish

4. **Update `tailwind.config.ts`**:
   - Add Mulish as the default font family

