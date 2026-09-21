# RUNA Design System

> Derived from `prompt.txt` (1472 lines) + `RUNA_Technical_PRD.pdf` p.1-16. Mobile-first PWA, 375px base, venture-backed Nigerian campus marketplace for **LASUSTECH**.

---

## 1. Brand & Philosophy

- **Vibe:** Premium Nigerian fintech + modern food delivery + campus marketplace + playful consumer PWA. Fast, young, premium, friendly, trustworthy.
- **Rule:** White dominates (`#FFFFFF` bg), black for typography, greens used intelligently - never all-green.
- **Anti-patterns:** No glassmorphism, no huge shadows, no excessive gradients/rounded, no emoji-as-icons, no Bootstrap/SaaS dashboard, no stock/cheesy promo.

### Palette
```ts
const colors = {
  ink:      "#0C231D", // nav, headings, wallet/premium surfaces, high-contrast moments
  primary:  "#1EB95E", // CTA, active, success, selected filter, delivery status
  support:  "#1B9A4D", // gradients, hover, active indicator, secondary actions
  white:    "#FFFFFF", // dominant bg, PWA background
  black:    "#000000", // typography
  // neutrals derived
  muted:    "#6B7280", // metadata
  border:   "#E5E7EB", // subtle borders
  surface:  "#F9FAFB", // cards/sections whitespace
}
```

**Usage matrix** (`prompt.txt:65-95`):
- `#0C231D` → Header, BottomNav (or floating pill premium), WalletCard, promo card `Hungry?`, section headings.
- `#1EB95E` → Primary button, active nav icon+label, filter pill selected, status `Delivered`, add-to-cart, price highlight.
- `#1B9A4D` → Button hover/gradient (`from-[#1EB95E] to-[#1B9A4D]`), secondary outline.
- White → Main canvas, card bg, sheet bg.

### Typography
- **Font:** Single choice from `Inter / Manrope / Plus Jakarta Sans / DM Sans` - **pick Inter** (default Next.js `next/font/google`).
- **Scale:**
```
Display: 24-28px / 700 / tight  - page title (Home greeting, Wallet balance)
H2:      18px / 600             - section header (Stores near you)
H3:      16px / 600             - card title
Body:    14-15px / 400           - description, price
Meta:    12px / 500 muted        - rating, ETA, category
```
- Hierarchy: large bold headings, medium section headings, comfortable body, small muted metadata (`prompt.txt:161`).

### Radii, Shadows, Spacing
- **Radii:** `8-16px` cards, `12px` buttons, `24px` bottom sheets/pill nav, `999px` badges. No exaggerated capsules everywhere.
- **Shadows:** `0 1px 2px rgba(0,0,0,0.04)` + `0 4px 12px rgba(0,0,0,0.06)` max. Cards breathe via border + whitespace, not shadow.
- **Spacing:** 4pt grid. Section gap 24px mobile / 32px desktop. Card padding 12-16px. BottomNav height 64-72px including safe-area.
- **Icons:** `lucide-react` only, stroke 1.5-2px, consistent size. Never emoji as functional icons (`prompt.txt:1343`).

---

## 2. PWA & App Shell

### `manifest.webmanifest`
```json
{
  "name": "RUNA - Campus Marketplace",
  "short_name": "RUNA",
  "description": "Food, groceries, printing & campus services at LASUSTECH. Student-powered delivery.",
  "theme_color": "#0C231D",
  "background_color": "#FFFFFF",
  "display": "standalone",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" },
    { "src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ]
}
```
Icons generated from `icon.png` (3388x3100) on white background. Favicon + Apple touch.

### Architecture
- Prepare **offline-ready** shell: cached browsing + queued non-financial actions, but **financial is authoritative** (`prompt.txt:239`). Do not fake wallet balances - local journals + reconcile.
- **AppShell** (`prompt.txt:246`):
  ```
  Mobile:   Compact Header | Main Content (scroll) | BottomNav (floating pill) | Sticky Cart Bar
  Desktop:  Header (full) | Main Content (max 1280 centered) | Optional sidebar / desktop nav
  ```
- Safe-area insets for pill nav, search sticky.

---

## 3. Global Components (single source of truth - `prompt.txt:1171`)

| Component | Spec |
|---|---|
| **Button** | Variants: primary (`#1EB95E` solid, white text), secondary (outline `#0C231D`), ghost, destructive. Sizes: `sm 32px, md 40px, lg 44-48px` (thumb >=44). States: hover (`#1B9A4D`), active scale 0.97, focus ring `2px #1EB95E` offset. |
| **IconButton** | 40px circle, border-subtle |
| **SearchBar** | Large premium: search icon left, placeholder `Search food, stores or services`, filter button right. Focus: subtle ring + scale. Supports products/stores/services tabs (future). |
| **BottomNav** | `Home | Explore | Orders | Wallet | Profile` lucide icons. Active = `#1EB95E` fill+label. Subtle transition. Consider pill floating (`bottom-4 mx-4 rounded-full`). Label always visible. |
| **ProductCard** | Image 1:1 or 4:3, name, store, `₦2,500`, rating ★4.8, ETA `12 min`, `+` add (primary). Horizontal scroll variant. |
| **StoreCard** | Logo/cover, name, category, ★ rating, ETA `10-15 min`, `Open/Closed` dot (green/red). Press → store page. |
| **CategoryCard** | Icon/illustration top, label bottom. Horizontal scroll. Categories: Food/Drinks/Groceries/Snacks/Printing/Cyber Cafe/Stationery/Laundry/More. |
| **CartItem** | Store header, image, name, price, qty stepper `− / count / +` (44px), subtotal |
| **OrderCard** | `Order #1024 • Mama T's Kitchen • ₦2,500` badge `Preparing / Runner assigned / On the way / Delivered` (green) |
| **WalletCard** | Dark `#0C231D` fintech: `₦5,000.00` large, actions `Fund wallet • Send`, history rows `−₦2,500 Food order` red, `+₦5,000 Funding` green |
| **StatusBadge** | Pill 12px: `Local • Syncing • Failed` / order status |
| **FilterSheet / BottomSheet** | Mobile bottom sheet with handle, backdrop blur, drag handle, `motion/react` spring |
| **Toast** | Sonner / custom, top or bottom, success (green), error |
| **Skeleton** | Match layout (store/product/order/home sections). Never spinner. Pulse shimmer. |
| **EmptyState / ErrorState** | Branded typography, `Try again` CTA, no sad illustration spam |
| **VerificationBadge** | `✓ Verified Student` (green) vs `Not Verified` muted |
| **PriceDisplay / Rating / DeliveryTime / Avatar / SectionHeader** | As per design system tokens |

No duplication - extend via variants.

---

## 4. Layouts & Navigation

### Header (Mobile)
Left: logo (`logo.png` height 24px). Right: notification bell + avatar. Below: greeting `Good morning, Tolu 👋` + sub `What are you looking for today?` - emoji only here, selective (`prompt.txt:335`).

### Home Page (most important)
Order:
1. Header
2. Greeting
3. SearchBar (primary action)
4. Categories (horizontal scroll)
5. Promo card (dark `#0C231D`, headline + imagery: `Hungry? Get your favourite meal delivered around campus.`)
6. `Popular around Activities` / `What students are ordering` - horizontal product cards (Jollof Rice + Chicken @ Mama T's ₦2,500)
7. `Stores near you` - vertical store list
8. Sections `Popular right now / Under ₦2,000 / Quick bites` - horizontal
- Spacing prevents endless page; prioritize info (`prompt.txt:486`).
- Sticky cart when cart >0.

### Other Screens (prompt.txt deliverables 11-30)

| Screen | Key UI |
|---|---|
| **Onboarding** (3) | `Everything you need` / `Order without long walk` / `Earn while you move` + Skip/Next/Get Started + subtle motion |
| **Auth: Signup** | First/last/phone/email/password + `Create account` - no verification gate |
| **Auth: Login** | Email/phone + password, Forgot, Login, Create account - minimal |
| **Explore** | Search + Categories + Stores + Products + Services + filter sheet (Category/Price/Rating/Availability/Delivery) |
| **Search Results** | Tabs `Products | Stores | Services` for query `"jollof"` |
| **Store Page** | Cover + logo + name + rating + category + open + ETA → menu tabs `Popular/Meals/Drinks/Sides` → cards → sticky cart |
| **Product Details** | Large image + name + desc + price + options + qty + `Add to cart` (bottom sheet/modal on mobile) |
| **Cart** | Store sections, qty controls, subtotal/delivery/total, CTA `Proceed to checkout`, floating in header if empty |
| **Checkout** | Single-page scrollable collapsible: Delivery location, Order summary, Wallet/Paystack|Kora, delivery fee, total, CTA `Place order` with trust cues |
| **Orders** | Tabs `Active | Completed`, cards → tracking |
| **Order Tracking** | Timeline `Placed → Payment confirmed → Merchant accepted → Preparing → Ready for pickup → Runner assigned → Picked up → On the way → Delivered`, status pipeline + future live map |
| **Wallet** | Fintech dark card + Fund/Send + txn history |
| **Profile** | Avatar, name, phone, email, verification status + sections Personal/Orders/Wallet/Addresses/Verification/Become runner/Notifications/Help/Settings/Logout |
| **Verification** | `Not Verified` → CTA `Verify Student` → 3 options progressive disclosure: 1) school email OTP 2) matric+ID upload 3) matric+portal screenshot+selfie |
| **Runner** | Gate: only `Verified Student` sees `Become a Runner`. Onboarding `Requirements: verified + identity + selfie + admin approval`. Dashboard: Online/Offline toggle, available deliveries, active, earnings, rating, history |
| **Merchant** | Orders/Products/Inventory/Sales/Store profile/Hours/Settings. Order card `NEW #1024 • Tolu Bakare • Jollof Rice + Chicken • ₦2,500 • Engineering` + `Accept/Reject` (status colors). WhatsApp complements |
| **Notifications** | Grouped cards `Order accepted / Runner assigned / Wallet funded / Verification approved` |
| **Offline** | Global `You're offline - Some features may be unavailable`. **Separate** `Activities Local Network • Connected` when on LAN. LAN indicator overrides offline for verified users; locked state if not verified |
| **States** | Loading skeletons per layout, Error `Something went wrong + Try again`, Empty `No orders yet / Cart empty` typography |

### Activities Local Mode (split)
- Verified + on LAN: banner `Activities Local Mode - Connected locally • You can browse and order even when mobile internet is unavailable`.
- On LAN but not verified: premium locked `Activities Local Mode - Student verification required • Verify your student status...`.
- WiFi ≠ verification.

---

## 5. Motion & A11y & Responsiveness

- **Motion** (`prompt.txt:1138`): page transitions, card press, button press (scale), bottom sheets (spring), search focus, nav, cart updates, status pipeline, skeleton, toast. Use `motion`/`framer-motion`, 150-280ms, ease `easeOut`, no bouncy excess, respect `prefers-reduced-motion`.
- **A11y:** semantic HTML, keyboard nav, visible focus ring, labels/ARIA, contrast AA, touch >=44px.
- **Breakpoints:** test `375, 390, 414, 768, 1024, 1280, 1440` (`prompt.txt:1263`). No horizontal overflow, no clipped text.
- **Performance:** `next/image`, lazy, code-split, skeleton, minimal JS, PWA cache. No huge images, no custom font blocking.

---

## 6. Data & File Structure

**Models** (`prompt.txt:1213`): `User, Store, Product, Category, Order, OrderItem, Wallet, Transaction, Runner, Notification` - in `types/` + mock in `data/` separate from components.

```
app/                  # Next.js App Router
  (marketing)/        # onboarding
  (auth)/login        # signup/login
  (app)/              # shell with BottomNav
    home/page.tsx
    explore/page.tsx
    store/[id]/page.tsx
    cart/page.tsx
    checkout/page.tsx
    orders/page.tsx
    orders/[id]/page.tsx
    wallet/page.tsx
    profile/page.tsx
    verify/page.tsx
    runner/page.tsx
    merchant/page.tsx
components/  # Button, SearchBar, ProductCard, StoreCard, ... (see table)
features/    # home, cart, checkout, wallet, etc.
lib/         # cn(), formatPrice(₦), etc.
hooks/       # useCart, useLocalNetwork, etc.
services/    # mock api, wallet ledger abstraction
types/       # User, Store, Product ...
data/        # mockStores, mockProducts (Nigerian examples)
public/
  icons/     # from icon.png/logo.png
  manifest.webmanifest
styles/globals.css  # Tailwind + tokens
```

Business logic out of presentation (`prompt.txt:1260`).

---

## 7. Design Quality Bar (before ship)

- YC demo worthy? Screenshot on X worthy? Student-intuitive? Feels better than student project? Real commercial product? Native mobile feel? (`prompt.txt:1367`)

**Do NOT:** generic admin, SaaS dashboard, neon green, huge rounded containers, random emojis/illustrations, fake maps/balances/tracking, overly complex nav, desktop-first (`prompt.txt:1387`).

---

## 8. Research Link

- Blend rationale in `agents/ui-research.md`: Jumia scalable cards, Glovo persistent cart + adaptive, Chowdeck 4-tab + logo categories + split-cart pitfall, Baymard/Stripe checkout (transparent fees). Read before building new screens.

---

## 9. Build Order

1. Tokens (colors/type/radii/spacing) → global.css + tailwind config
2. Components (table) → Storybook-style polish
3. PWA + AppShell
4. Home → Explore/Search → Store/Product → Cart/Checkout → Orders/Tracking → Wallet → Profile/Auth/Onboarding → Verification → Runner/Merchant → Notifications → Empty/Loading/Error/Offline
Refine after each major area (`prompt.txt:1466`).
