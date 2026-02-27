

# SquarePeg Pricing Calculator Page

## Page Structure
- New route `/pricing` with a clean, centered layout
- SquarePeg branding header
- Subtle gradient background, modern card-based design

## Calculator Components

### Billing Toggle
- Monthly / Annual switch (pill-style toggle)
- Annual shows a "Save X%" badge

### Input Mode Toggle
- **Simple mode**: Single slider — "Total Applicants per Year" (10k–350k, step 5k)
- **Advanced mode**: Two sliders — "Jobs per Year" × "Applicants per Job" — product clamped to 10k–350k range

### Volume Slider
- Custom-styled Radix slider with prominent value label above
- Snap to step increments (5k steps)
- Min 10k, max 350k

### Pricing Display
- Smooth linear interpolation: $0.20/applicant at 10k → $0.10/applicant at 350k
- Formula: `price = 0.20 - ((volume - 10000) / 340000) * 0.10`
- Large animated total cost display (monthly or annual)
- Show per-applicant price, total applicants, and savings when annual selected

### Talk to Sales CTA
- When slider is at 350k max, show "Talk to Sales" button replacing price display

### Summary Card
- Applicants/year, cost per applicant, total cost breakdown

## Design Details
- Animated number transitions on value changes
- Mobile-responsive layout
- Clean typography with generous whitespace
- Accent color highlights for pricing and savings

