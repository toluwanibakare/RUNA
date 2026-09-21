# AGENTS.md - RUNA

> Campus marketplace + student-powered fulfilment + Activities Local Network. Initial campus: **LASUSTECH**. Reference: `RUNA_Technical_PRD.pdf` (Visual Blueprint v1.1, 16p) + `prompt.txt` (frontend spec, 1472 lines). Repo is greenfield - no commits yet.

## Stack & Entrypoints
- **Frontend:** Next.js App Router + React + TypeScript + Tailwind CSS (fallback if repo has other framework, respect existing). PWA-first, mobile 375px primary.
- **DB:** Postgres (decided). ORM: Prisma expected. If adding, run `npx prisma migrate dev` then `npx prisma generate`.
- **Hosting:** Vercel initially -> VPS (not cPanel - cPanel Node is weak for Next.js). Env via `.env.local` (Next.js loads it, not `dotenv` import).
- **Wallet:** Abstract provider - Paystack | Korapay (Nigeria). Never hardcode one.
- **Merchant alerts:** Abstract `MerchantNotifier` - pilot = personal WhatsApp automation (`Baileys`/`whatsapp-web.js`, free but ban-risk, needs always-on QR session), production = Meta WhatsApp Cloud API (buttons Accept/Reject/Ready, ~$0.02/conv after 1000 free/mo). WhatsApp is **not** system of record.
- Icons: `lucide-react` only - never Sparkles or Zap (too AI-generic, banned). Motion: `framer-motion`/`motion` with `prefers-reduced-motion`. Font: one of Inter/Manrope/Plus Jakarta Sans/DM Sans (pick one, use consistently).
- Assets: `icon.png` (3388x3100) + `logo.png` -> `public/icons/*`, `manifest.webmanifest` (`theme_color #0C231D`, `background_color #FFFFFF`, `display standalone`), favicon/apple-touch-icon/maskable.

## Architecture - Two Environments
- **Cloud** = source of truth (API + DB + ledger). **Activities Edge** = local server on LAN (Switch/APs, Firewall segmented guest/merchant/admin), serves same app when internet poor. Sync states: `ONLINE, LOCAL, SYNCING, PENDING SYNC, SYNCED, FAILED/REQUIRES REVIEW`.
- **Role ladder (privileges increase):** `User` (register: first/last/phone/email/password, can browse/order/pay/wallet/track) -> `Verified Student` (optional trust layer, unlocks Activities Local + runner eligibility) -> `Agent/Runner` (approved verified students only) -> `Partner/Merchant` (assisted onboarding) -> `Core/Admin`.
- **Order lifecycle (immutable `OrderEvent` log):** `CREATED -> PAYMENT_HELD -> PARTNER_ACCEPTED -> READY_FOR_PICKUP -> AGENT_CLAIMED -> PICKED_UP -> OUT_FOR_DELIVERY -> CUSTOMER_CONFIRMS (PIN/QR) -> COMPLETED`. Terminals: rejection, cancellation, no-agent expiry, payment failure, refund, dispute. Settlement only after `PICKED`, payout only after `PIN`.
- **Dispatch:** FCFS among eligible online agents (approved, active, capacity, service-area, not suspended). Claim must be **atomic DB transaction/CAS** - client timing insufficient.
- **Wallet/ledger:** Balance is derived from `LedgerEntry`; every debit/reserve/release/refund/payout is an explicit ledger event with **idempotency key** (header). `walletBalance >= orderTotal` gate. Do not fake offline balances; local server journals and reconciles against central ledger; duplicate event IDs ignored idempotently.
- **Data model:** `User, StudentProfile, VerificationCase, AgentProfile, Partner, Product, Order, OrderItem, OrderEvent, Wallet, LedgerEntry, PaymentTransaction, Payout, Device, LocalNode, SyncEvent, AuditLog`.

## Commands
```bash
# once Next.js initialized
npm run dev        # next dev (or pnpm dev)
npm run build      # next build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run test       # if configured
npx prisma studio
# PWA check: Chrome DevTools > Application > Manifest/Service Workers
# Responsive audit: 375, 390, 414, 768, 1024, 1280, 1440
```

## Conventions
- **Brand:** `#0C231D` (nav/headings/wallet/premium surfaces), `#1EB95E` (primary CTA/active/success), `#1B9A4D` (secondary/gradients/hover), white dominant bg, black typography. Do not make UI all-green; subtle radii, light shadows, spacious, no glassmorphism/emoji-as-icons.
- **Mobile-first:** Bottom nav `Home|Explore|Orders|Wallet|Profile` (floating pill if premium), sticky cart bar `n items • ₦price`, thumb targets >=44px, bottom sheets, horizontal scroll categories. Never add horizontal overflow/clipped text/broken cards.
- **Component system (reuse):** `Button, SearchBar, BottomNav, ProductCard, StoreCard, CategoryCard, CartItem, OrderCard, WalletCard, StatusBadge, FilterSheet, BottomSheet, Toast, Skeleton (match layout), EmptyState, ErrorState, VerificationBadge`. Mock data in `data/` separate from components; typed models `User|Store|Product|Category|Order|Wallet|Runner|Notification`.
- **PWA:** `manifest.webmanifest` + icons on white bg; architecture ready for cached browsing + queued non-financial actions only (financial stays authoritative).
- **Verification:** Optional, profile shows `Not Verified` vs `✓ Verified Student`. Three methods progressive disclosure: 1) school email OTP 2) matric + ID upload 3) matric + portal screenshot + selfie/liveness. Institutional email not universal → method 2/3 is primary path at LASUSTECH.
- **Activities Local UI:** If on LAN **and** verified → `Activities Local Mode - Connected locally`; if on LAN but not verified → locked premium state `Student verification required`. WiFi != verification.
- **Checkout:** Single-page scrollable with collapsible sections, persistent totals, transparent fee breakdown (`subtotal + delivery + service + tax + discount = total`), smart defaults (last address/payment) with visible Change, trust cues (Visa/Mastercard, Secure lock, ETA `Delivery on Apr 4`).

## Gotchas - Agent Will Miss Without This
- **LAN-online vs offline:** `prompt.txt:1138` + PRD p.9 - internet and local network are distinct. Do not show generic offline for Activities users; duplicate sync-safe events via `SyncEvent(id, sourceNode, sequence, status)`.
- **Wallet double-spend:** Local server must not create second wallet universe. Always gate by central ledger on sync.
- **WhatsApp personal automation:** Always-on device, QR expiry, ToS ban risk - abstract behind interface so swapping to Cloud API is config-only.
- **cPanel trap:** Vercel -> cPanel breaks Next.js API routes/edge. Plan migration to VPS (Hetzner/DO).
- **Search:** Must support products + stores + services with tabs; `prompt.txt` Search UX is primary action on home.
- **Performance:** No custom font blocking, `next/image`, lazy/caching, skeleton not spinner, framer-motion respects reduced motion.
- **Empty/error states:** No sad-illustration spam; branded typography retry.

## UI Research
- Detailed Jumia/Glovo/Chowdeck + checkout teardown saved locally in `agents/ui-research.md` (gitignored) and `agents/frontend-spec.md`. See those before building new screens - they contain card patterns, nav decisions, fee disclosure, and multi-vendor pitfalls to avoid.

## References
- `prompt.txt` is authoritative for frontend scope (deliverable: design system -> app shell -> 30 screens, `prompt.txt:1412`).
- `RUNA_Technical_PRD.pdf` is authoritative for backend/state/ledger/sync invariants and 12-point acceptance checklist (p.16).
- `icon.png` / `logo.png` are the only approved brand assets.

## What Not To Do
- Do not build generic SaaS dashboard, desktop-first layout, all-green pages, or fake real-time tracking/financial balances.
- Do not force student verification at signup.
- Do not commit `RUNA_Technical_PRD.pdf`, `prompt.txt`, or `agents/` research - they are gitignored for privacy.
