---
title: "16 CSS Parse Errors — All False: CSS Nesting and the W3C Validator's Blind Spot"
description: "The W3C validator flagged my modern CSS as invalid. The response is surprising: the validator is wrong, not my code. Here's why."
date: 2026-06-14
tags: [css, validation, standards, meta]
draft: true
pageHasCode: true
---

${toc}

## The Validation Report

I ran my blog through the W3C Nu HTML Checker. The result: 16 errors, all the same type:

```
Error: CSS: Parse Error.
```

Every single error pointed to lines with the `&` selector — the native CSS nesting syntax. The validator wasn't complaining about typos, deprecated properties, or invalid values. It was rejecting perfectly valid modern CSS.

This is the output of a 100/100 Lighthouse page, served in 2026, rendered correctly on every modern browser. Something doesn't add up.

## What the Validator Rejected

Every nested rule in my stylesheet was flagged. Here's exactly what the W3C validator considers an error:

```css
/* These all produce "CSS: Parse Error." in the W3C validator */

a {
  color: var(--accent);
  &:hover { color: var(--accent-hover); }               /* Parse Error */
}

blockquote {
  p {
    &:first-child { margin-top: 0; }                    /* Parse Error */
    &:last-child { margin-bottom: 0; }                   /* Parse Error */
  }
  cite {
    &::before { content: "— "; }                         /* Parse Error */
  }
}

.sidebar-nav a {
  &:hover, &[aria-current="page"] { color: var(--text); } /* Parse Error */
}

.theme-toggle {
  &:focus-visible { outline: 2px solid var(--accent); }  /* Parse Error */
}
```

That's 16 nested selectors — `&:hover`, `&::before`, `&:first-child`, `&:focus-visible`, `&[aria-current="page"]`. All standard CSS Nesting syntax. All rejected.

## Why the Validator Gets It Wrong

The W3C CSS Validation Service is written in Java (78% of its codebase). Its CSS parser was built long before CSS Nesting was finalized as a specification. The most recent release (cssval-20250226, February 2025) still uses this parser.

CSS Nesting became a W3C Candidate Recommendation in February 2023. All major browsers shipped support throughout 2023 and early 2024:

| Browser | Version | Supported since |
|---------|---------|----------------|
| Chrome | 120 | November 2023 |
| Edge | 120 | November 2023 |
| Safari | 17.2 | December 2023 |
| Firefox | 117 | August 2023 |
| Opera | 106 | 2023 |

But the validator's parser hasn't caught up. As of mid-2026, the W3C CSS Validator (jigsaw.w3.org/css-validator) still doesn't parse CSS Nesting. The Nu Html Checker (validator.w3.org/nu) has the same blind spot — an open issue ([#1634](https://github.com/validator/validator/issues/1634)) has been sitting unresolved since September 2023.

This is not a bug in my CSS. It's a lag between the specification advancing and the validation tools catching up — a gap that now spans three years.

## Browser Reality vs Validator Reality

I tested my CSS in four browser engines. Result: zero errors.

Chrome DevTools, Firefox Developer Tools, and Safari Web Inspector all parse every nested rule correctly. The rendered pages look exactly as intended. Lighthouse scores 100/100 across all categories.

The validator says my CSS is broken. The browser says it's fine. The browser is the one that matters.

This isn't a new problem. CSS has a long history of features that shipped in browsers before validation tools supported them:

- **CSS Custom Properties (2016)**: Validators initially flagged `--custom-property: value` as invalid
- **CSS Grid (2017)**: Properties like `grid-template-areas` caused parse errors in early validators
- **`env()` and `calc()` (2018)**: Combined usage was flagged for years
- **`:has()` selector (2022)**: Multiple open issues about false parse errors
- **CSS Nesting `&` (2023)**: Still not supported in validation in 2026

The pattern is consistent: the W3C validator prioritizes specification stability over being current with shipping features.

## Should You Care About Validation Errors?

The W3C validator is a useful tool — for certain things. It catches:

- Unclosed HTML tags and malformed markup
- Duplicate `id` attributes
- Improperly nested elements
- Deprecated elements like `<center>` or `<font>`

These are structural issues that affect how browsers interpret your document. Catching them matters.

But for CSS, the validator is checking against a version-locked CSS specification profile. CSS Nesting is a W3C Candidate Recommendation (not yet a full Recommendation), so the validator treats it as invalid — even though every browser engine has shipped it.

The practical takeaway: **validate your HTML structure, but test your CSS in browsers.** If it works in Chrome, Firefox, and Safari, and your target audience uses those browsers, a validation error for modern CSS is noise, not signal.

## What This Means for This Blog

My CSS uses nesting because it makes the code more maintainable. The alternative — repeating parent selectors for every hover, focus, and pseudo-element — produces longer, harder-to-read stylesheets:

```css
/* Without nesting: 12 lines, repetitive */
a { color: var(--accent); }
a:hover { color: var(--accent-hover); }

blockquote p { margin: 0.5rem 0; }
blockquote p:first-child { margin-top: 0; }
blockquote p:last-child { margin-bottom: 0; }

blockquote cite::before { content: "— "; }

/* With nesting: 8 lines, grouped by parent */
a {
  color: var(--accent);
  &:hover { color: var(--accent-hover); }
}
blockquote {
  p { margin: 0.5rem 0; &:first-child { margin-top: 0; } }
  cite { &::before { content: "— "; } }
}
```

The nested version is shorter, scoped, and easier to reason about. I'm not going to give that up to satisfy a validator that hasn't been updated for a feature that shipped three years ago.

## The Takeaway

Validation tools are guideposts, not gatekeepers. When your validator flags something, investigate — but understand its limitations. A "CSS: Parse Error" from the W3C validator in 2026 is likely a false positive for any CSS feature that has shipped in all modern browsers.

The real validation happens in the browser. That's where your CSS actually runs. If it works there, it works.

---

*The full source of this blog is [on GitHub](https://github.com/tionosulis/tionosulis.github.io). The 16 "errors" from the validator are visible by running any page through [validator.w3.org/nu](https://validator.w3.org/nu/).*
