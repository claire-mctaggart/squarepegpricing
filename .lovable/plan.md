

## Bug: Annual discount not reflected in summary card's monthly total

The `monthlyCost` variable is always `annualCost / 12` (no discount applied). When the user switches to annual billing, the summary card's "Monthly Total" still shows the undiscounted monthly cost, making it look identical to the monthly billing option.

## Changes

1. **Update `src/pages/Pricing.tsx`**: In the summary card, when `billing === "annual"`, show `discountedAnnual / 12` for the Monthly Total instead of the undiscounted `monthlyCost`. This way the user can clearly see the monthly equivalent is lower on annual billing.

2. **Also update the main pricing display**: When annual billing is selected, show the monthly equivalent (`discountedAnnual / 12`) instead of the full annual amount, so the user can directly compare monthly vs annual pricing. Alternatively, keep showing annual but make the distinction clearer.

## Technical Detail

- Line 243: Change `monthlyCost` to `billing === "annual" ? discountedAnnual / 12 : monthlyCost`
- Line 248: Already correctly shows discounted annual — no change needed there

