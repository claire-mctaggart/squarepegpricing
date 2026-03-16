

## Changes in `src/pages/Pricing.tsx`

1. **Default to annual** -- Change initial state from `"monthly"` to `"annual"` (line 34).

2. **Monthly tab: different slider behavior** -- When `billing === "monthly"` and `inputMode === "simple"`:
   - Label says "Total Applicants per Month" instead of "per Year"
   - Slider range: 0–20,000 (min=0, max=20000)
   - "Talk to Sales" triggers at 20,000 instead of 350k
   - Default monthly applicants state: start at e.g. 5,000

3. **Volume computation** -- For monthly billing, multiply the monthly slider value by 12 to get the annual volume for price calculation. The `isMaxVolume` check becomes billing-dependent: monthly caps at 20k/month, annual caps at 350k/year.

4. **Add monthly-specific state** -- Add a `monthlyApplicants` state (default ~5000) separate from `totalApplicants` (annual). When switching tabs, each retains its own value.

5. **Advanced mode on monthly** -- Labels change to "per Month" context; the advanced inputs could also adapt or be hidden on monthly. I'll keep advanced mode available but adjust labels to say "per month" where relevant.

6. **Summary card adjustments** -- Show "Applicants/Month" vs "Applicants/Year" depending on billing toggle.

### Technical details

- New state: `const [monthlyApplicants, setMonthlyApplicants] = useState(5000)`
- Monthly constants: `MONTHLY_MIN = 0`, `MONTHLY_MAX = 20000`
- Volume derivation: `billing === "monthly" ? monthlyApplicants * 12 : totalApplicants` (simple mode)
- `isMaxVolume`: `billing === "monthly" ? monthlyApplicants >= 20000 : volume >= 350000`
- `calcPrice` stays the same (operates on annual volume)
- Monthly "Talk to Sales" message: "Need more than 20k applicants per month?"

