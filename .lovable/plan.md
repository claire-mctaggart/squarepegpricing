

## Changes

1. **Update `calcPrice` in `src/pages/Pricing.tsx`**: Replace the single linear formula with piecewise linear interpolation across three segments:
   - 10k–50k: $0.20 → $0.15
   - 50k–100k: $0.15 → $0.10
   - 100k–350k: $0.10 → $0.08

