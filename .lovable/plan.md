
The pricing page exists at `/pricing` but you're viewing `/` which shows a blank placeholder. You want the pricing calculator to be the default page.

## Plan

1. **Update `src/App.tsx`**: Change the `/` route to render `<Pricing />` instead of `<Index />`
