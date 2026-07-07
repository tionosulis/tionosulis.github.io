---
title: "The Social Preview Spiral: What I Learned From 7 Rounds of Meta Tags"
seoTitle: "The Social Preview Spiral: 7 Rounds of Meta Tags"
description: "How a validator warning about Twitter cards turned into a 7-commit deep-dive — and the checklist I wish I'd started with."
date: 2026-06-30
draft: true
tags: [meta, web-development, eleventy, design]
pageHasCode: true
---

I opened Twitter Card Validator expecting a quick check. Instead I got this:

```
INFO:  Page title is okay.
WARN:  No twitter:title — falling back to og:title.
WARN:  No twitter:description — falling back to og:description.
WARN:  No twitter:image — falling back to og:image.
WARN:  twitter:image:alt missing — add alt text for accessibility.
```

Five warnings. Zero urgency. I shrugged, added `twitter:title`, and hit deploy.

Eight commits later I was still tweaking meta tags. Not because the validator kept complaining — it had been silent since round two — but because every "fix" revealed something else that _could_ be better.

This is not a story about meta tags. It is a story about the gap between "working" and "done."

${toc}

## How It Started

The setup was simple. An Eleventy blog, static site, no SSR. OG meta tags in `base.njk` layout. A handful of frontmatter variables — `title`, `description`, `image` — mapped directly to `og:title`, `og:description`, `og:image`. Standard stuff.

The first commit was just a `twitter:image:alt` using the description field. Four lines in the template. Took thirty seconds. One commit, `ef58136`. I thought that was it.

It was not it.

## The Spiral

Each round of the spiral followed the same pattern: open validator, notice something suboptimal, fix it, deploy, check the next platform. Lather, rinse, repeat.

**Round one: `&amp;` in preview cards.** The `title` and `description` frontmatter contained ampersands — "CSS & JavaScript" rendered as `CSS &amp; JavaScript` in every OG tag. An Eleventy auto-escaping feature that's correct for HTML but wrong for meta tag content. Fix: `| safe` filter on every title and description output. Commit `0570209`.

**Round two: no `og:site_name`.** Facebook card showed the URL, not the site name. Discord card looked anonymous. Fix: add `og:site_name` to the layout. Commit `6b5031e`.

**Round three: Twitter-specific tags.** Twitter's documentation says it falls back to OG tags when `twitter:*` is missing. That fallback works — but relying on it means you have no per-platform control. If Twitter ever changes its fallback logic, your cards break silently. Fix: explicit `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site`, and `twitter:creator`. Commit `6aa27ec`.

**Round four: image dimensions.** Without explicit `og:image:width` and `og:image:height`, platforms guess the aspect ratio before the image loads. The result can be a layout shift in the card preview or — worse — the favicon being stretched across 1200×630. Fix: conditional width/height tags, only when `image` is set in frontmatter. Same commit.

**Round five: `twitter:image:alt` for accessibility.** Twitter doesn't display alt text visually, but screen readers use it. Without it, the validator warns. Fix: conditional `twitter:image:alt` with a dedicated `image_alt` frontmatter field — not the article `description`, which serves a different purpose (search snippet). Commit `ef58136` (yes, this was actually the first fix — but the spiral wasn't linear). Later made unconditional with a fallback chain (`image_alt` → `description` → `metadata.image_alt`), so the alt text is never empty even on pages without frontmatter — but that fix came in round eight.

**Round six: OG image title text truncated in previews.** The homepage OG title was 78 characters. Twitter's card truncates at ~70. Discord at ~60. The subtitle — "Web Design, Terminal Dev Notes, Open Source Tinkering" — was getting cut mid-word. Fix: shortened the homepage `og:title` to 44 characters. Commit `cfd213c`.

**Round seven: article metadata.** The blog has publish dates and tags. Neither were exposed as structured meta. Every post card was just a generic page — no `article:published_time`, no `article:tag`. Fix: conditional `article:published_time` (only on non-homepage pages with `page.date`) and a loop over all tags excluding the `"posts"` collection tag. Same commit as round three.

**Round eight: unconditional image metadata.** The conditional approach for width, height, and alt had a blindspot — posts without frontmatter `image` still got `og:image` via site fallback, but `og:image:width`, `og:image:height`, and `og:image:alt` were silently missing. Twitter fell back to `summary` card (small icon) instead of `summary_large_image`. Fix: moved all image metas outside the conditional block, added a second fallback variable `ogAlt` with chain `image_alt → description → metadata.image_alt`, and set `metadata.image_alt` as the site-wide default in `metadata.js`. Now every page — regardless of frontmatter — outputs complete image metadata. Commit `94e39ee`.

Eight rounds. Eight commits. Each one individually justified. Collectively: a full afternoon of what felt like productive work that, in retrospect, I could have done in one sitting with the right checklist.

## The Research That Should Have Come First

Somewhere between rounds three and four, I started researching how different platforms consume meta tags. The findings clarified why the spiral happened:

**Twitter/X** reads `twitter:*` tags first, falls back to `og:*` if missing. The fallback is undocumented as a contract — it could change. The explicit approach is defensive.

**Discord** uses `og:`, but its image rendering is aggressive — it crops to 16:9 regardless of your ratio, and it pulls the favicon as a fallback if `og:image` isn't large enough. Minimum recommendation: 600×315, with 1200×630 as the safe standard.

**Facebook** respects `og:image:width` and `og:image:height` to prevent layout jumps. It also uses `og:site_name` to display a source label — without it, the card shows the raw domain.

**LinkedIn** is the most lenient — it reads OG tags correctly but caches aggressively. A stale card can persist for days after a change.

The common thread: none of these platforms validate your tags before rendering. They silently degrade. A broken `twitter:image` doesn't give you an error — it shows the favicon stretched to 2:1 ratio and nobody tells you.

That last point is the real danger. If your CSS breaks, the page looks wrong instantly. If your meta tags break, the page looks fine — but every link shared to any platform has a subtly broken preview. You only notice when someone shares your post and the card looks like a ransom note.

## The Checklist That Should Have Prevented This

After the seventh commit, I wrote down exactly what I should have checked before the first deploy. Here it is:

```
□ og:title exists and is under 60 characters
□ og:title has | safe filter (no &amp;)
□ og:description exists and is under 160 characters
□ og:description has | safe filter
□ og:image exists and is at least 600×315
□ og:image:width and og:image:height present
□ og:url is canonical
□ og:site_name present
□ og:type is "website" (or "article" for posts)
□ twitter:card is "summary_large_image"
□ twitter:title matches og:title (no fallback dependency)
□ twitter:description matches og:description
□ twitter:image matches og:image
□ twitter:image:alt present (use `image_alt` frontmatter, not `description`)
□ twitter:site set
□ twitter:creator set (for author attribution)
□ article:published_time present on posts
□ article:tag present for each relevant tag
□ HTML character entities escaped correctly in all fields
```

That's nineteen items. Fifteen minutes to audit. It would have saved me the entire afternoon.

## What I'd Do Differently

If I could redo this process, I would not touch `base.njk` until I had:

1. **Written the checklist first** — not as a theoretical doc, but as a literal TODO list in the editor. Check off each item once, commit once.
2. **Tested on all platforms before iteration** — run the same URL through Twitter Card Validator, Facebook Sharing Debugger, Discord's embed preview, and LinkedIn Post Inspector in a single batch, not one platform per round.
3. **Character-counted titles before writing meta** — I already had the titles, I just never measured them against platform limits. That should be part of the writing workflow, not the meta debugging workflow.

## The Closing

The final `base.njk` template has twenty-one `property` or `name` attributes across three meta types — OG, Twitter, and Article — plus a fallback chain that ensures every page ships complete image metadata regardless of frontmatter. None of them are clever. Every single one is boilerplate that has been written ten thousand times before by ten thousand other developers.

But they are _there_. They are consistent. They pass every validator I've thrown at them. And the next post I write will deploy with all of them from commit one, because I finally have a checklist that turns a reactive spiral into a fifteen-minute audit.

The hardest part of building this blog was never the CSS, the typography, or the color tokens. It was learning when to stop iterating on things that are already good enough. Meta tags were just the latest reminder.

---

*This post is part of the [terminal redesign series](/posts/redesign-log-terminal-theme). The complete meta template for this blog is open source on [GitHub](https://github.com/tionosulis/tionosulis.github.io).*
