---
title: "Why I Went All-In on Monospace — And Stopped Apologizing for It"
description: "Five font pairings, three redesigns, one conclusion: the most honest typeface for a developer blog was right in front of me the whole time."
date: 2026-06-23
draft: true
tags:
  - css
  - typography
  - design
  - jetbrains-mono
image: /assets/img/og/all-in-monospace.svg
---

At some point, every developer who maintains a personal blog faces the same quiet crisis: *does this look like me, or does it look like a template?*

I faced mine somewhere between my fourth font pairing attempt and my third "maybe I should just use Inter" moment. The answer, when it finally arrived, was not what the typography textbooks would recommend. It was a monospace font. For everything.

---

## The Problem With Looking "Professional"

Most advice about web typography follows a familiar script: pick a readable serif or humanist sans-serif for body text, pair it with something contrasting for headings, keep code blocks in monospace, done. It works. It looks clean. It looks like everyone else.

For a marketing site or a SaaS product, that's exactly what you want — invisible typography that gets out of the way. But a personal developer blog is not a product. It's closer to a voice. And voices are not supposed to be invisible.

The disconnect I kept running into: I was writing about service workers, CSS quirks, and Git edge cases — deeply technical content — inside a layout that looked borrowed from a lifestyle magazine. Elegant serif headings. Comfortable body text. A nice "Posts" page with dot leaders. Pleasant. Forgettable.

Every time I dropped a code block into a post, the JetBrains Mono inside it felt more honest than anything surrounding it. More *me*. That friction kept nagging.

---

## What Monospace Actually Signals

Fonts carry context. We absorb it without realizing.

Serif fonts signal tradition, authority, long-form reading — newspapers, academic papers, novels. Sans-serif signals modernity, neutrality, interface — apps, dashboards, marketing copy. Monospace signals something different: the terminal, the editor, the command line. It signals *someone who works close to the machine.*

Research in cognitive typography suggests that typeface choices influence how readers perceive the author's identity and expertise — not just the readability of the text itself. A 2014 study by Kevin Larson and Rosalind Picard found that typography affects not just comprehension but emotional state: readers form impressions of the writer's personality within seconds of a page loading, before reading a single word.

For a developer writing about developer things, monospace is not an eccentric choice. It's the honest one. It closes the gap between the author's context and the reader's context. Both live in editors. Both read code. The typeface is a handshake.

---

## The "But Readability" Argument

The standard objection to monospace body text is readability. Fixed-width characters, the argument goes, lack the natural rhythm of proportional fonts — the varying widths of 'i', 'm', 'w' — that help the eye flow through text.

This is true, technically. Monospace at 400 words per minute in a long-form novel would be an endurance test. But a developer blog post is not *Middlemarch*. The average post is 600–1200 words, read in a focused sitting, by someone already accustomed to spending hours in a monospace code editor. The "readability" objection assumes a reader who is not your actual reader.

There's also a practical counter: the discomfort of monospace body text — if it exists at all — diminishes quickly with exposure. Your readers are developers. They spend more time in JetBrains Mono or Fira Code than in any proportional font. The unfamiliarity is not unfamiliarity; it's recognition from a different context.

---

## The All-In Decision

Going all-in is different from just using monospace for headings. It means the navigation, the metadata, the tags, the date stamps, the body text, the footer — everything speaks the same typographic language.

The result is not a blog that looks like it uses a monospace font. It's a blog that *is* monospace — where the choice stops being a detail and becomes an identity.

This creates something that selective monospace use cannot: coherence. There's no typographic context-switching. No moment where the reader's eye moves from a monospace heading to a sans-serif paragraph and unconsciously registers a seam. The reading experience is continuous, singular, and — critically — memorable.

There are trade-offs. They're worth naming:

**Word spacing needs correction.** Monospace fonts carry wider default word spacing than proportional fonts. On large headings, this creates awkward gaps. The fix is straightforward — `word-spacing: -0.1em` on headings — but it requires attention.

**Line height needs tuning.** At heading scale, `line-height: 1.1` keeps multi-line titles tight and intentional. At body scale, `line-height: 1.6` compensates for the fixed-width rhythm.

**Small sizes need breathing room.** UI labels and tags at `0.7rem` benefit from slight `letter-spacing: 0.04em` to stay legible.

None of these are obstacles. They're calibrations — the kind any deliberate typographic choice requires.

---

## On Owning an Aesthetic

There's a version of this essay that hedges — that says "monospace can work if you're careful" and ends with a balanced list of pros and cons. This is not that essay.

The real reason to go all-in on monospace is simpler than typography theory: it's the answer to *what does this site feel like?* A terminal. An editor. A place built by someone who thinks in code and writes the same way.

That's not a universal answer. It doesn't need to be. Personal sites are the last place on the web where you're allowed to make a choice and commit to it without a committee's approval.

Monospace everywhere is a commitment. It says: this is the aesthetic, take it or leave it. In an era of templates and theme marketplaces, that kind of specificity is increasingly rare — and increasingly valuable.

---

The fonts that surrounded me every day — in my editor, in my terminal, in every tool I actually use — were monospace. It took embarrassingly long to realize the blog should be too.

Some decisions look strange until they look inevitable. This was one of them.
