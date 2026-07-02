---
title: "Invisible Character, Visible Problem: Fixing Heading Anchors Without Breaking Layout"
seoTitle: "Invisible Character, Visible Problem: Heading Anchor Fix"
description: "How a tiny # symbol broke my blog's mobile layout — and a clean CSS fix that took two iterations to get right."
date: 2026-06-27
draft: true
tags:
  - css
  - troubleshooting
  - meta
  - howto
image: /assets/img/og/heading-anchor-fix.png
image_alt: "Before-and-after split comparison: a heading with the anchor symbol creating phantom spacing on mobile (left), and the same heading with clean spacing after the CSS fix (right)"
---

![Split-screen comparison showing a heading with the anchor # creating phantom spacing on mobile (left, labeled 'Before'), and the same heading with clean spacing after the font-size: 0 fix (right, labeled 'After').](/assets/img/heading-anchor-fix.svg)

*The same heading, same viewport — before and after fixing the anchor spacing issue. The difference is one CSS property on a single element.*

If you use a static site generator with markdown-it-anchor, eleventy-plugin-anchor, or any tool that auto-generates heading permalinks, you've probably seen this HTML pattern:

```html
<h2 id="the-problem">The Problem <a class="header-anchor" href="#the-problem">#</a></h2>
```

A tiny `#` link appended to every heading. Invisible until hovered (`opacity: 0` by default). Harmless, right?

I thought so too. Until I pulled up a post on my phone and noticed something off.

## The Bug

Between a wrapped heading and the paragraph below it, there was an inexplicable gap. Not the heading's `margin-bottom` — extra, uneven space that appeared only on narrow viewports. The kind of gap that makes you zoom in, screenshot, and open Chrome DevTools on your phone.

After some inspection, the culprit was obvious: the `#` anchor link at the end of the heading.

On desktop, headings are short enough to fit on one line. The invisible `#` sits at the end — present but innocuous. On mobile, a long heading wraps. And when the last word's line is a tight fit, the anchor `#` gets pushed to its own line:

```
The Raw Wrapper (for when you
                    need both)
                            #
```

That orphan line is invisible (`opacity: 0`) but still takes up space. The heading's `line-height` applies. Suddenly your heading has a phantom third line — an extra ~24px of blank space separating it from the paragraph below.

The gap wasn't caused by any layout algorithm or CSS bug. It was caused by an element that was styled to be invisible but never told to stop participating in layout.

## First Attempt: Move It

My first instinct was to move the anchor from after the heading to before it. The logic: if the `#` is at the start of the heading, it won't orphan at the end.

```js
// before
permalink: markdownItAnchor.permalink.ariaHidden({
  placement: "after",  // <-- problem
  symbol: "#",
})

// after  
permalink: markdownItAnchor.permalink.ariaHidden({
  placement: "before", // <-- tried this
  symbol: "#",
})
```

The HTML becomes:

```html
<h2 id="the-problem"><a class="header-anchor" href="#the-problem">#</a> The Problem</h2>
```

Problem solved? Visually, the invisible anchor at the start of the heading shouldn't create phantom space at the bottom.

But now every heading on the page looked indented. The invisible `#` (still `opacity: 0`) plus its `margin-right` pushed the heading text ~10px to the right. On mobile, every heading appeared to have a mysterious left indent that no other text had.

I had fixed the vertical spacing only to break horizontal alignment. Worse — the fix was invisible to hover, so anyone who hovered over the heading would see the `#` appear awkwardly before the text.

This approach introduced a new problem without cleanly solving the original one. Back to the drawing board.

## The Fix: Zero Width

The right answer isn't about where the anchor is positioned — it's about whether the anchor takes up space when it shouldn't.

The key insight: the anchor should have **zero width** when hidden. Not invisible — physically zero-dimensional. No character width, no margin, no line-height contribution. Nothing.

CSS `font-size: 0` does exactly this. When an inline element has `font-size: 0`, its text content has no width. The characters still exist in the DOM, but they occupy no visual space.

Here's the final implementation:

```css
.header-anchor {
  color: var(--text-tertiary);
  text-decoration: none;
  margin-left: 0.25rem;
  opacity: 0;
  font-size: 0;
  line-height: 0;
  transition: opacity 0.15s ease, font-size 0s 0.15s, line-height 0s 0.15s;
}

:hover > .header-anchor,
.header-anchor:focus {
  opacity: 1;
  font-size: inherit;
  line-height: inherit;
  transition: opacity 0.15s ease, font-size 0s, line-height 0s;
}
```

Let's break down what each part does.

When the anchor is **hidden** (default state):
- `opacity: 0` — invisible
- `font-size: 0` — zero width
- `line-height: 0` — zero height contribution, no phantom line box
- `margin-left: 0.25rem` — still present, but at `font-size: 0` the margin is effectively negligible in layout
- The `transition` includes a 0.15s delay on font-size and line-height so that when hiding, both snap to 0 *after* the opacity fades out

When the anchor is **shown** (hover or focus):
- `opacity: 1` — fully visible
- `font-size: inherit` — instantly matches the parent heading's font size
- `line-height: inherit` — matches parent's line-height so the anchor participates in inline layout normally
- The `transition` has no delay on font-size or line-height, so the anchor restores size instantly before fading in

The `transition` timing is the subtle detail that makes this feel polished:

| Transition | Showing | Hiding |
|---|---|---|
| **opacity** | 0 → 1 over 0.15s | 1 → 0 over 0.15s |
| **font-size** | 0 → inherit instantly | inherit → 0 after 0.15s delay |
| **line-height** | 0 → inherit instantly | inherit → 0 after 0.15s delay |

When showing: font-size and line-height jump to normal first, then opacity fades in. The anchor appears at full size immediately, fading in smoothly.

When hiding: opacity fades out over 0.15s, then font-size and line-height snap to zero. The anchor disappears smoothly, then becomes zero-dimensional after the fade completes.

No flicker, no phantom space, no indentation.

## Why Not Alternatives?

I considered other approaches before landing on this:

**`display: none`** — Removes the element from layout entirely. But `display` can't be animated with CSS transitions, so the hover effect would be instant on/off with no fade. It also means the element can't receive focus (bad for keyboard navigation).

**`visibility: hidden`** — Makes the element invisible but still takes up space. Same problem as `opacity: 0` — no layout benefit.

**`width: 0; overflow: hidden`** — Functional but requires `display: inline-block`, which changes how the element interacts with surrounding inline content. The `overflow: hidden` also prevents the anchor from being revealed on hover.

**`position: absolute`** — Removes from flow, but requires `position: relative` on every heading and explicit positioning. Over-engineered for what's supposed to be a simple anchor link.

`font-size: 0` paired with `line-height: 0` is the simplest solution with the fewest side effects. Two properties, zero layout impact when hidden, smooth transition when shown.

## What This Taught Me

The `#` anchor link is a tiny element — one character, invisible by default, easy to overlook. But in CSS, invisible doesn't mean absent. Every inline element participates in layout regardless of its opacity. When it wraps to its own line on a narrow viewport, it brings its parent's line-height with it, creating phantom space that looks like a layout bug.

The fix — `font-size: 0` with `line-height: 0` — is almost too simple to believe. An invisible element should take no space. CSS gives us the tools to make that true, but only if we remember to use them.

Not every layout bug needs a complex solution. Sometimes the right fix is asking: "if this element is invisible, why is it still here?"

*This blog runs on Eleventy with markdown-it-anchor. The full source — including the fix above — is on [GitHub](https://github.com/tionosulis/tionosulis.github.io).*
