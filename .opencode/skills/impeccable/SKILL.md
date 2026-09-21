---
name: impeccable
description: Enforce RUNA impeccable design quality bar - YC-demo worthy, premium campus marketplace, Nigerian fintech polish. Use when building any frontend screen, component, or reviewing UI for RUNA.
---

# Impeccable - RUNA Craft Skill

> Every screen must pass: "Would this look good in a YC demo / X screenshot / student-intuitive / real commercial product / native mobile?" - `prompt.txt:1367`

This skill is the project's design gate. It merges `prompt.txt` 1472 lines + `design.md` + Emil Kowalski + Apple Fluid + mobile-native.

## When to use
- Before creating any component, page, or screen for RUNA.
- When reviewing or polishing UI.
- When choosing colors, spacing, motion, or typography.
- Always for `prompt.txt:1412` deliverables 1-30.

## Rules (non-negotiable)

### Brand
- Dominant white `#FFFFFF`, ink `#0C231D` (nav/headings/wallet/premium), primary `#1EB95E` (CTA/active/success), support `#1B9A4D` (hover/gradient). Never all-green. No neon.
- Font: **one** of Inter/Manrope/Plus Jakarta Sans/DM Sans - use `Inter` via `next/font/google` consistently. Hierarchy: display 24-28/700 tight, H2 18/600, H3 16/600, body 14-15/400, meta 12/500 muted.

### Mobile-first PWA
- Base `375px`, test `375,390,414,768,1024,1280,1440`. Thumb >=44px, no horizontal overflow/clipped text/broken cards.
- BottomNav `Home|Explore|Orders|Wallet|Profile` (floating pill allowed `prompt.txt:304`), sticky cart bar `n items • ₦price`, bottom sheets, horizontal scroll categories.
- PWA: `manifest.webmanifest` theme `#0C231D` bg `#FFFFFF` display standalone, icons from `icon.png` on white, `next/image` + skeleton not spinner + lazy.

### Product specifics
- **Auth:** Anyone can sign up - `I want to Order` (anyone, simple first/last/phone/email/password + heard) vs `I am a Merchant` (business name/owner/phone/email/location/category). No verification gate at signup. Student verification is later, runner only for verified students.
- **Verification:** optional, 3 methods progressive disclosure (email OTP → matric+ID upload → matric+portal screenshot+selfie). Institutional email not universal at LASUSTECH → 2/3 is primary path. Profile shows `Not Verified` vs `✓ Verified Student`.
- **Activities Local:** LAN != internet. Only verified students unlock local - verified+on LAN → `Activities Local Mode - Connected locally`. On LAN + not verified → locked `Student verification required`. Never assume WiFi = verified.
- **Checkout:** single-page collapsible, persistent totals, transparent breakdown `subtotal+delivery+service+tax+discount=total`, smart defaults with visible `Change`, trust cues (Visa/Mastercard, Secure lock, ETA `Delivery on Apr 4`), sticky CTA `Pay ₦X & Place Order`.
- **Wallet:** fintech dark card `#0C231D`, derived ledger balance (never fake offline), history `−₦2,500`/`+₦5,000`. Copy must be user-facing: `Secure wallet - instant checkout trusted at LASUSTECH` (not technical ledger jargon). Balance has Eye/EyeOff toggle.
- **Icons:** `lucide-react` only - never Sparkles or Zap (too AI-generic, banned).
- **Never:** generic SaaS dash, desktop-first, all-green, fake tracking/balance, emoji-as-icons, glassmorphism everywhere, huge shadows, stock/cheesy promo.

### Craft bar (Emil + Apple)
- Review table required for any UI review: `| Before | After | Why |` - no lists.
- Animations: gate first -`100+/day = no animation`, keyboard actions never animate. Else: purpose → entering=`ease-out` (`cubic-bezier(0.23,1,0.32,1)`) or spring `bounce 0-0.2 duration 0.3-0.4` damped 1.0, exiting faster. Duration `100-280ms` max, `transform`+`opacity` only, `scale(0.97)` on `:active`, never `scale(0)` (use `0.95`+opacity), popovers origin-aware (`var(--transform-origin)`, modals center). Blur <20px. Interruptible springs from presentation value, respect `prefers-reduced-motion` + `@media (hover:hover)`. Haptics/sound causal + same frame.
- Shadows `0 1px 2px rgba(0,0,0,0.04)` + `0 4px 12px rgba(0,0,0,0.06)` max, radii `8-16`, whitespace > shadow.

## Workflow

1. **Read** `design.md` + relevant `prompt.txt` section + `agents/ui-research.md` (Jumia/Glovo/Chowdeck blend).
2. **Tokens first:** extend `styles/globals.css` / `tailwind.config` - don't fork.
3. **Component:** single reusable variant, `lucide-react` icons, Nigerian mock data (Jollof Rice + Chicken @ Mama T's ₦2,500) - no lorem, no hardcoded inside component.
4. **Motion:** cheapest tool that works; gating + reduced-motion ships with animation.
5. **Verify:** responsive at all breakpoints, a11y (semantic, keyboard, focus ring), no overflow, passes quality bar 6 questions (YC/X/student intuition/commercial/mobile-native).
6. **Iterate:** refine before next deliverable (`prompt.txt:1466`).

## Deliverable order
1 tokens/styles/type/color → buttons/inputs/cards/nav → PWA+AppShell → Home → Explore/Search → Store/Product → Cart/Checkout → Orders/Tracking → Wallet → Profile/Auth/Onboarding → Verification → Runner/Merchant → Notifications → Empty/Loading/Error/Offline (prompt.txt:1412).

## References
- `design.md` is the token source.
- `prompt.txt` is authoritative for scope.
- `agents/ui-research.md` for card/nav/fee patterns.
- Tokens: see `design.md:1` for full system.
