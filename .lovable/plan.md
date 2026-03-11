

## Fix: Scale base price so $0.10 is the floor *after* the annual discount

The user wants the price to scale from $0.20 down to a base floor where, after applying the 10% annual discount, the lowest price is exactly $0.10/applicant. That means the base floor = $0.10 / 0.90 ≈ $0.1111.

### Change in `src/pages/Pricing.tsx`

**Update `calcPrice`** (lines 14-19): Scale linearly from $0.20 at 10k to ~$0.1111 at 350k. This is a single linear segment (or we can keep two segments for a curve). The simplest approach is a smooth linear interpolation:

```
$0.20 at 10k → $0.1111 at 350k
```

With the 10% annual discount: $0.1111 × 0.90 = $0.10 — exactly the floor.

```ts
const BASE_FLOOR = 0.10 / (1 - ANNUAL_DISCOUNT); // ~0.1111

function calcPrice(volume: number) {
  const v = Math.min(Math.max(volume, MIN_VOLUME), MAX_VOLUME);
  // Linear interpolation from $0.20 at 10k to ~$0.1111 at 350k
  return 0.20 - ((v - MIN_VOLUME) / (MAX_VOLUME - MIN_VOLUME)) * (0.20 - BASE_FLOOR);
}
```

This ensures:
- Monthly billing: price ranges from $0.20 to ~$0.11
- Annual billing (10% off): price ranges from $0.18 to $0.10

