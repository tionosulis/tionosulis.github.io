---
title: "How I Accidentally Built an IBM Design System Theme"
description: "I was using IBM Plex Sans but Cool Gray backgrounds. After a deep dive into IBM Carbon's color system, I discovered the neutral Gray family — and my blog finally felt like it belonged."
date: 2026-06-19
draft: true
tags: [design, css, meta, howto]
---

A few days ago, I pushed a color update to this blog. The goal was simple: fix the harsh contrast between hero images and the page background. What I didn't expect was that it would send me down a rabbit hole into IBM's Design Language — and fundamentally change how I think about color on the web.

## The Setup

I've been an IBM Plex Sans fan since day one. The typeface is a workhorse — readable at small sizes, elegant at large ones, and it carries a quiet authority that most web fonts lack. My blog uses it everywhere: body text, headings, even the logo.

But my color palette had nothing to do with IBM. I was using a blue-tinted slate (`#F0F4F8`) as the page background — essentially Tailwind's `slate-100`. It looked *fine*, but something always felt off. The blog had a cold, clinical vibe that I couldn't quite place.

Then a reader pointed out that the hero image transitions felt harsh in light mode. I started tweaking backgrounds, borders, and contrast ratios. In the process, I discovered something I should have known from the start.

## The Three Grays

IBM's Design Language defines three gray families:

| Family | 10 (lightest) | Character |
|---|---|---|
| **Gray** | `#f4f4f4` | Neutral — no warm or cool tint |
| Cool Gray | `#f2f4f8` | Blue-ish cast |
| Warm Gray | `#f7f3f2` | Warm/brownish tint |

The color I had been using — `#F0F4F8` — is essentially IBM's **Cool Gray 10** with a slightly stronger blue channel. It's a valid color, but here's the catch: IBM explicitly states that **"the neutral Gray family is dominant in our UI."**

I had IBM's font but Cool Gray's personality. No wonder it felt disjointed.

## The Fix: Neutral Gray + Pure White

I switched to the neutral Gray family and the White theme from Carbon (IBM's design system implementation):

| Token | Before | After (Light) | After (Dark) |
|---|---|---|---|
| `--bg` | `#F0F4F8` (Cool Gray) | `#ffffff` | `#161616` (Gray 100) |
| `--bg-secondary` | `#E4E8EC` | `#f4f4f4` (Gray 10) | `#262626` (Gray 90) |
| `--border` | `#BCC2CC` | `#e0e0e0` (Gray 20) | `#424242` (Gray 80) |
| `--accent` | `#2563eb` (Tailwind blue) | `#0f62fe` (IBM Blue 60) | `#78a9ff` (IBM Blue 40) |

The impact was immediate. The page felt *cleaner* — not because white is inherently better than slate, but because the color cast was gone. The background stopped competing with the content.

## What Made the Difference

Three things stood out during this migration:

### 1. Color Cast Is a Personality Statement

Every color has a temperature. The blue tint in Cool Gray says "this is a tech blog, circa 2024." Pure white says nothing — it lets the content speak. For a personal blog, that neutrality creates space for personality to emerge through writing, not through background color choices.

### 2. IBM Blue Ties the Room Together

Switching the accent color from Tailwind blue (`#2563eb`) to IBM Blue 60 (`#0f62fe`) created a cohesion I didn't expect. The link color, the hover states, the selection highlight — they all echo the same brand that designed the font. It's a small change that pays disproportionate dividends in perceived polish.

### 3. Layering Creates Depth Without Clutter

Carbon's layering model — background → layer-01 → layer-02 — maps beautifully to a blog's visual hierarchy. The page body sits on `#ffffff`, the sidebar and code blocks sit on `#f4f4f4`, and borders at `#e0e0e0` separate them. Each layer is only 11 luminance steps apart. It's almost imperceptible, but collectively it tells the eye: *this is organized.*

## The Golden Ratio Discovery That Fell Into Place

After the color migration, I was tweaking the visual proportions of the sidebar — the S logo box and the theme toggle. Something felt off about their sizes.

I ran the numbers:

| Element | Mobile | Desktop |
|---|---|---|
| S logo box | 42×42 | 55×55 |
| Theme toggle | 26×26 | 34×34 |
| Ratio (logo / toggle) | 42 ÷ 26 = **1.615** | 55 ÷ 34 = **1.618** |

Both ratios are within rounding error of the **golden ratio (φ ≈ 1.618)** . I didn't plan this. I landed on 42 for the mobile logo because it felt right, then derived 55 for desktop from the original design. The toggle sizes emerged from wanting visual balance.

This is the kind of happy accident that makes me believe good design is as much about intuition as it is about systems.

## What I Learned

- **Font and color should come from the same family.** Using IBM Plex with IBM-inspired colors creates a coherence that no amount of fine-tuning can replicate.
- **Neutral backgrounds are harder to design but age better.** A color cast dates your design to a specific trend. Clean neutrals let the content define the era.
- **The golden ratio works even when you don't plan for it.** And when you discover it afterward, it's a good sign you're on the right track.
- **Design systems aren't just for enterprise apps.** A personal blog with 20 posts can benefit from the same systematic thinking that powers IBM's product suite.

## The Results

The color migration shipped in commit `28b506f`. Here's what changed for readers:

- **Readability improved** in both light and dark modes — less eye strain during long reading sessions.
- **Hero images now transition smoothly** against the page background. The 1px border + box-shadow provides clean separation without visual noise.
- **Code blocks look cleaner** — [syntax highlighting](/posts/shiki-njk-language-not-found/) bg (`#f0f0f0`) is subtly distinct from the page bg without shouting for attention.
- **The site feels like it belongs to itself** — fonts, colors, and proportions all come from the same design vocabulary.

---

*This entire site is open source on [GitHub](https://github.com/tionosulis/tionosulis.github.io). The color migration commit is [`28b506f`](https://github.com/tionosulis/tionosulis.github.io/commit/28b506f).*
