---
title: "Dark Mode Done Right: Zero Flicker, CSS Architecture, and the Devil in the Details"
description: "How I built a zero-flicker dark mode with an inline script, CSS custom properties, localStorage persistence, and a dynamically-updating toggle tooltip — and why every site should do it properly."
date: 2026-06-13
draft: false
tags:
  - css
  - javascript
  - howto
---

Dark mode is table stakes for modern websites. Yet most implementations have a fatal flaw: the flash of wrong theme — a brief burst of blinding white before JavaScript kicks in and sets things right. It's the kind of bug that users feel even if they can't name it.

There's also a spectrum of quality. Some sites manage persistence (remembering your choice). Others respect system preference. Few do all three: instant correct render, persistence, and system-aware defaults. Fewer still handle the tiny UX details that separate good from great.

This post walks through my dark mode implementation — the one you're probably using right now. It's not complicated, but every line earns its keep.

## The Zero-Flicker Trick

The root cause of dark mode flicker is timing. If you wait for the DOM to load, for CSS to parse, or for a framework to hydrate, you've already lost — the browser has painted the first frame.

The fix is brutally simple: run your theme logic in a `<script>` tag in `<head>`, before the stylesheet loads.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script>
    var t = localStorage.getItem("theme");
    if (!t) {
      t = window.matchMedia("(prefers-color-scheme:dark)").matches
        ? "dark" : "light";
    }
    document.documentElement.setAttribute("data-theme", t);
  </script>
  <link rel="stylesheet" href="/styles.css">
</head>
```

Here's the sequence of events:

1. Browser starts parsing HTML
2. Hits the `<script>` tag — runs it synchronously
3. Reads `localStorage`, falls back to `prefers-color-scheme`
4. Sets `data-theme` on `<html>`
5. Browser continues parsing, eventually hits `<link rel="stylesheet">`
6. CSS loads and evaluates with the correct `[data-theme]` value

The script runs before any CSS applies. There's no repaint, no flicker, no flash of wrong theme.

That's it. Fifteen lines, minified to 190 bytes. No framework, no JavaScript library, no runtime dependency after page load.

## CSS Variable Architecture

With the toggle attribute in place, the stylesheet defines two sets of custom properties:

```css
:root {
  --bg: #fafafa;
  --text: #1a1a1a;
  --accent: #2563eb;
  /* ... more variables */
}

[data-theme="dark"] {
  --bg: #0a0a0b;
  --text: #e4e4e7;
  --accent: #60a5fa;
  /* ... more variables */
}
```

Every color in the stylesheet is a `var(--*)` reference. Changing themes is a single attribute swap — CSS cascades the new values everywhere without a repaint of the page layout. The browser only repaints color, which is the cheapest kind of repaint.

### The System Preference Safety Net

There's one edge case: what if JavaScript is disabled? Or what if `localStorage` throws (some browsers block it in private mode)?

A `@media (prefers-color-scheme)` rule handles this:

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --bg: #0a0a0b;
    --text: #e4e4e7;
  }
}
```

The `:not([data-theme])` selector ensures this only applies when the script hasn't set a data attribute — either because it failed or was blocked. If the script succeeds, the `[data-theme="dark"]` rule takes priority by specificity and the media query is ignored.

This two-layer approach means the site renders correctly in dark mode 100% of the time, regardless of browser security settings, script blockers, or network failures.

## Persistence Logic

The persistence strategy is straightforward:

1. On first visit: read the system preference via `matchMedia` and apply it
2. When user toggles: save the choice to `localStorage`
3. On subsequent visits: `localStorage` takes priority over system preference
4. To reset: clear `localStorage` (or we could add a "reset to system" option)

This gives users the best of both worlds. The site automatically matches their OS setting on first visit, but a manual override persists across sessions. If someone reads in bed at night with dark mode enabled, it stays dark the next morning.

### Toggle Implementation

The toggle button reads the current `data-theme` attribute and inverts it:

```javascript
function toggleTheme() {
  var html = document.documentElement;
  var current = html.getAttribute("data-theme");
  var next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}
```

No class toggling, no framework-state management, no body-class swapping. One attribute, two values, done.

## The Tooltip: Devil in the Details

This is the detail most dark mode implementations get wrong — or more commonly, ignore entirely.

When I first built the toggle, I used `🌙` for dark mode and `☀️` for light mode. Universally understood iconography, right? But there's a UX gap: the icon shows the *current state*, not the *action*. A moon icon tells you "it's dark mode," not "click to switch to light mode."

I added a `title` attribute that updates dynamically:

```javascript
function updateTooltip() {
  var btn = document.getElementById("theme-toggle");
  var theme = document.documentElement.getAttribute("data-theme");
  btn.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
}
```

This runs on page load (when the theme is already set by the inline script) and on every toggle click. It's two lines of JavaScript. But it turns an ambiguous icon into a clear affordance.

On this blog, the toggle sits in the sidebar, sized precisely to the golden ratio (34×34 pixels, related to the [55×55 S monogram](/posts/monogram-s-55x55/) by φ = 1.618). It's a small detail, but the ratio between the logo and the toggle creates a subtle visual harmony that the eye registers even if the brain doesn't.

## Syntax Highlighting in Both Themes

My implementation uses Shiki with a dual-theme configuration — `github-light` and `github-dark` — applied via `@shikijs/markdown-it`.

Shiki outputs two sets of styles in the HTML:

```html
<pre class="shiki github-light">
  <code><span style="color:#...">code here</span></code>
</pre>
<pre class="shiki github-dark" style="display:none">
  <code><span style="color:#...">code here</span></code>
</pre>
```

The dark mode CSS toggles which one is visible:

```css
[data-theme="dark"] .shiki.github-light { display: none; }
[data-theme="dark"] .shiki.github-dark { display: block; }
```

There's also a `@media (prefers-color-scheme: dark)` fallback for the no-script case. After the Chasing 100 post, I also had to adjust specific Shiki token colors to meet WCAG AA contrast (4.5:1) — orange `#E36209` became `#B84D00`, red `#D73A49` became `#C92E3D`.

## Why Not CSS-Only? (The Temptation)

There's a seductive approach that uses `prefers-color-scheme` exclusively, without JavaScript:

```css
:root { --bg: #fafafa; /* light */ }
@media (prefers-color-scheme: dark) { :root { --bg: #0a0a0b; } }
```

This gives you automatic dark mode with zero JavaScript. It's clean, accessible, and respects user preference.

But it can't do two things:
1. **Persist a user choice** — once you toggle, the page must remember
2. **Override system per-site** — the user might want dark mode on this blog and light mode on another

A CSS-only approach is fine for a landing page. For a blog where users spend minutes — sometimes hours — reading, persistence and choice are essential. The inline script is the minimum viable increment over CSS-only.

## Lessons Learned

- **Inline scripts are fast.** 190 bytes. Less than a single HTTP request. The performance impact is literally unmeasurable on modern hardware.
- **`localStorage` before `matchMedia`.** The saved preference always wins. System preference is the default, not the dictator.
- **`@media` fallback is non-negotiable.** Script blockers exist. Private browsing exists. Airplane mode exists. The CSS fallback handles them all silently.
- **Tooltips matter.** An ambiguous icon is a failure of affordance. The tooltip is free UX.
- **Accessibility is continuous.** Even with a "correct" dark mode, token colors in syntax highlighting can fail contrast checks. Measure everything.

The entire dark mode system on this blog — inline script, CSS variables, persistence, toggle, tooltip, Shiki integration, WCAG overrides — is about 50 lines of code total. It's one of the highest-ROI features on the site.

[What does your dark mode implementation handle? I'd love to hear about it.]({{ metadata.url }}/about/)
