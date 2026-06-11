---
title: "The Dot Leader: A CSS Technique Borrowed From 17th Century Typesetting"
description: "How a flexbox span with repeating dots replaces tables, JavaScript, and bloat — and brings a classic typesetting technique to the modern web."
date: 2026-06-17
draft: true
tags: [css, design, typography, howto]
---

Look at the post listing on the homepage. Between each post title and its date, there's a trail of dots — a visual connector that guides the eye from content to metadata. This is a **dot leader**, and it's older than the United States.

Dot leaders first appeared in printed tables of contents in the 17th century. Typesetters would painstakingly insert periods between chapter titles and page numbers, creating a visual bridge that helped readers navigate books. The technique persisted through typewriters (which had dedicated leader keys) and into early digital typesetting systems.

On this blog, it's implemented with one `<span>` and three lines of CSS. No images, no JavaScript, no tables, no border hacks.

## The Markup

The HTML for each post listing item is an `<a>` with three flex children:

```html
<a href="/posts/slug/" class="postlist-item">
  <span class="postlist-title">Post Title</span>
  <span class="postlist-dots" aria-hidden="true"></span>
  <time>June 15, 2026</time>
</a>
```

The `aria-hidden="true"` on the dots span tells screen readers to ignore it — the dots are visual decoration, not content. The `<time>` element provides semantic date information for accessible tooling.

## The CSS

The magic is in the `postlist-dots` span:

```css
.postlist-item {
  display: flex;
  align-items: baseline;
  gap: 0;
}

.postlist-title {
  flex: 0 1 auto;
}

.postlist-dots {
  flex: 1;
  min-width: 2ch;
  overflow: hidden;
  white-space: nowrap;
}

.postlist-dots::before {
  content: " . . . . . . . . . . . . . . . . . . . . . . . . ";
  letter-spacing: 0.15em;
}

.postlist-time {
  flex: 0 1 auto;
  white-space: nowrap;
}
```

Here's how it works:

1. **Flex container** — `.postlist-item` is `display: flex` with `align-items: baseline` so the title, dots, and date all sit on the same text baseline.

2. **Title and date shrink-wrap** — Both have `flex: 0 1 auto`, meaning they take their natural width and never grow. The date also has `white-space: nowrap` to prevent line breaks in the middle of "June 15, 2026."

3. **Dots span fills the gap** — `flex: 1` means the dots span takes all remaining space between title and date. The `::before` pseudo-element fills it with a repeating sequence of dot-space-dot-space.

4. **Overflow hidden** — On narrow viewports where the gap shrinks, the dots simply disappear into the overflow. The title and date remain fully visible with no break.

![Dot leader flex layout showing the three flex children: title, dots span (flex: 1), and date](/assets/img/dot-leader-flex.svg)

## Why Not Alternatives

There are several other ways to create dot leaders. Here's why they're worse:

### border-bottom

```css
.postlist-item {
  border-bottom: 1px dotted;
}
```

This puts dots along the entire bottom edge of the container, not between the title and date. At different font sizes or line heights, the alignment breaks. It also can't be made to run horizontally across the gap.

### background-image

```css
.postlist-dots {
  background: repeating-linear-gradient(
    to right, currentColor 0, currentColor 1px,
    transparent 1px, transparent 4px
  );
}
```

Works visually, but introduces a dependency on an image or gradient calculation. The `::before` approach uses a built-in character that naturally matches the font's dot glyph, ensuring consistent appearance across browsers.

### JavaScript calculation

```javascript
let gap = container.offsetWidth - title.offsetWidth - date.offsetWidth;
// generate N dots to fill the gap
```

Runtime calculation, forced reflow, extra script. Totally unnecessary when CSS handles it natively.

### HTML table

Tables from the 1990s web used `<td>` with `text-align: justify` and a repeating dot character. It was functional but semantically wrong — tables for layout violate accessibility guidelines and add markup bloat.

## Behavioral Details

Several edge cases are handled implicitly by the CSS:

- **Overflow on mobile** — On phones, the dots disappear into `overflow: hidden`. The title and date are always fully visible.
- **Long titles** — If the title is very long, `flex-shrink: 1` on the title and date allows them to shrink. The dots span maintains its `flex: 1` share.
- **Empty gap** — If the title and date touch (no space between them), the dots span has zero width and renders nothing. No broken layout.
- **RTL languages** — Flexbox respects `dir="rtl"`, so the dot leader reverses correctly in right-to-left scripts.

## Accessibility Considerations

- `aria-hidden="true"` on the dots span — screen readers skip the punctuation noise
- `<time>` element provides machine-readable dates
- The entire row is a single `<a>` tag — keyboard navigation works naturally
- `min-width: 2ch` ensures at least two dots render even on narrow gaps, preserving the visual cue for sighted users

## What This Taught Me

The dot leader is a perfect example of CSS doing heavy lifting with minimal code. It's not a new technique — flexbox has supported this pattern since 2015. But it's a technique that's easy to overlook when you're reaching for a library or a script.

Before implementing this, I would have probably reached for JavaScript. "I need to calculate the gap and insert the right number of dots — that's dynamic, it needs JS." But CSS has been capable of this the entire time. The only reason it feels like "dynamic" behavior is that we've been trained to solve spacing problems with scripts.

The dot leader is now one of my favorite CSS patterns. It's elegant, accessible, and entirely declarative. And it connects this blog to a typesetting tradition that's over 400 years old — all from a single `<span>` with `flex: 1`.

---

*Want to see the real implementation? The [homepage template](https://github.com/tionosulis/tionosulis.github.io/blob/main/_includes/partials/postslist.njk) and the [CSS](https://github.com/tionosulis/tionosulis.github.io/blob/main/assets/css/index.css) are both open source.*
