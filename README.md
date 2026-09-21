# RUNA — Campus Marketplace

> Food, groceries, printing & campus services at **LASUSTECH**. Student-powered delivery. PWA-first, mobile 375px, built for Activities Local Network.

Public demo: `npm run dev` → http://localhost:3000  
PWA installable · Offline-ready shell · Activities Local LAN mode

---

## Stack

- **Frontend:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + `lucide-react` + `motion` + `sonner`
- **PWA:** `manifest.webmanifest`, `src/app/icon.png` (transparent favicon), `public/icons/*` (white bg), `apple-touch-icon`
- **Brand:** `#0C231D` ink, `#1EB95E` primary, `#1B9A4D` support, Inter, 4pt grid
- **State (demo):** `useCart` (client), mock `data/mock.ts` — ledger/sync/Prisma planned
- **Hosting:** Vercel → VPS (not cPanel)

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
npm run typecheck # tsc --noEmit
```

Test on `375, 390, 414, 768, 1024, 1280, 1440` — no horizontal overflow.

---

## Project structure

```
src/
  app/                 # App Router
    page.tsx           # Home (flash sales, favorites, services)
    layout.tsx         # Header (centered logo, profile left, cart+notifs right)
    globals.css        # tokens + tailwind
    icon.png / favicon.ico  # transparent favicon from icon.png
    (routes) cart, checkout, explore, orders, wallet, profile, verify, runner, merchant, login, signup, onboarding, notifications, offline, store/[id], product/[id]
  components/
    layout/ Header, BottomNav (4 tabs: Home|Explore|Orders|Wallet), StickyCartBar
    ui/ Button, SearchBar, Cards (Product/Store), Badge, Skeleton, BackButton
  data/mock.ts         # Nigerian mock stores/products/orders
  hooks/useCart.tsx
  lib/utils.ts
  types/
public/
  icons/icon-192.png, icon-512.png (white bg)
  apple-touch-icon.png, logo.png, manifest.webmanifest
AGENTS.md              # agent instructions
design.md              # design system (prompt.txt 1472 lines)
```

---

## Features (demo)

- **Home:** Search, categories (icons), Activities Local gate (verified-only), flash sales (-20%), popular/ favorites, stores, under ₦2,000, services (Printing/Cyber/Stationery/Laundry), promos
- **Shop:** Store menu tabs, sticky cart, product add
- **Cart / Checkout:** Single-page collapsible, transparent fee breakdown, Paystack|Kora abstraction, wallet gate
- **Orders:** Active/Completed + timeline → PIN delivery
- **Wallet:** Secure wallet, Eye toggle, instant checkout
- **Profile:** About RUNA, verification badge, Become Runner (gated verified), logout → login demo
- **Auth:** Login demo (`demo@runa.com` / `runa1234`), Signup role chooser (I want to Order vs I am a Merchant, heard-about dropdown)

---

## License

**Proprietary — All Rights Reserved.** No copying, distribution, or derivative use without written permission. See [LICENSE](./LICENSE).

Built by **TMB** — https://www.tmb.it.com

