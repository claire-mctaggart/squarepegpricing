

The per-applicant price shown is the base rate before any billing discount. When switching to annual, the 10% discount effectively lowers the per-applicant cost too, but it's not reflected in the display.

## Changes

1. **Update `src/pages/Pricing.tsx`**: When `billing === "annual"`, show the discounted per-applicant price (`pricePerApplicant * (1 - ANNUAL_DISCOUNT)`) instead of the base `pricePerApplicant`. This applies to both the main pricing display and the summary card's "Cost/Applicant" cell.

