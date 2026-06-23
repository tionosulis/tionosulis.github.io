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
pageHasCode: true
---

![Split-terminal: editor panel kiri, rendered typography panel kanan, keduanya dalam JetBrains Mono](/assets/img/og/all-in-monospace.svg)

*The hero image for this post — code on the left, rendered typography on the right, both speaking the same monospace voice.*

At some point, anyone who keeps a personal corner of the web faces the same quiet crisis: *does this look like me, or does it look like a template?*

I faced mine somewhere between my fourth font pairing attempt and my third "maybe I should just use Inter" moment. The answer, when it finally arrived, was not what the typography textbooks would recommend. It was a monospace font. For everything.

---

## $ cat professional.md

Most advice about web typography follows a familiar script: pick a readable serif or humanist sans-serif for body text, pair it with something contrasting for headings, keep code blocks in monospace, done. It works. It looks clean. It looks like everyone else.

For a marketing site or a SaaS product, that's exactly what you want — invisible typography that gets out of the way. But a personal developer blog is not a product. It's closer to a voice. And voices are not supposed to be invisible.

The disconnect I kept running into: I was writing about code, configs, and edge cases you only hit when you tinker too much — inside a layout that looked borrowed from a lifestyle magazine. Elegant serif headings. Comfortable body text. A nice "Posts" page with dot leaders. Pleasant. Forgettable.

Every time I dropped a code block into a post, the JetBrains Mono inside it felt more honest than anything surrounding it. More *me*. That friction kept nagging.

---

## $ cat signals.md

Fonts carry context. We absorb it without realizing.

Serif fonts signal tradition, authority, long-form reading — newspapers, academic papers, novels. Sans-serif signals modernity, neutrality, interface — apps, dashboards, marketing copy. Monospace signals something different: the terminal, the editor, the command line. It signals *someone who works close to the machine.*

Research in cognitive typography suggests that typeface choices influence how readers perceive the author's identity and expertise — not just the readability of the text itself. A 2014 study by Kevin Larson and Rosalind Picard found that typography affects not just comprehension but emotional state: readers form impressions of the writer's personality within seconds of a page loading, before reading a single word.

For someone writing about the command line and the mess behind the UI, monospace is not an eccentric choice. It's the honest one. It closes the gap between the author's context and the reader's context. Most of us live in editors half the time anyway. The typeface is a handshake.

---

## $ cat readability.md

The standard objection to monospace body text is readability. Fixed-width characters, the argument goes, lack the natural rhythm of proportional fonts — the varying widths of 'i', 'm', 'w' — that help the eye flow through text.

This is true, technically. Monospace at 400 words per minute in a long-form novel would be an endurance test. But a blog post is not *Middlemarch*. The average post is 600–1200 words, read in a focused sitting, by someone who's spent enough hours in a terminal to feel at home there. The "readability" objection assumes a reader who is not your actual reader.

There's also a practical counter: the discomfort of monospace body text — if it exists at all — diminishes quickly with exposure. Your readers are developers. They spend more time in JetBrains Mono or Fira Code than in any proportional font. The unfamiliarity is not unfamiliarity; it's recognition from a different context.

There's a deeper layer here too — the *disfluency effect*. Cognitive psychology research has shown that text which is slightly harder to read is often *better retained*, because the reader must process it more deliberately. Monospace body text introduces a small dose of this: not enough to fatigue, but enough to keep the reader engaged rather than skimming. For technical content where precision matters, that trade-off is a feature, not a bug.

---

## $ cat tradeoffs.css

Going all-in is different from just using monospace for headings. It means the navigation, the metadata, the tags, the date stamps, the body text, the footer — everything speaks the same typographic language.

The result is not a blog that looks like it uses a monospace font. It's a blog that *is* monospace — where the choice stops being a detail and becomes an identity.

This creates something that selective monospace use cannot: coherence. There's no typographic context-switching. No moment where the reader's eye moves from a monospace heading to a sans-serif paragraph and unconsciously registers a seam. The reading experience is continuous, singular, and — critically — memorable.

There are trade-offs, and they need real CSS to address. Here are the values this blog actually uses:

```css
h1, h2, h3, h4, h5, h6 {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  line-height: 1.2;
  word-spacing: -0.15em;
}

.post-header h1 {
  line-height: 1.3;
  word-spacing: -0.15em;
}

body {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  line-height: 1.8;
}

.post-tag, .stats-bar, .entry-count {
  letter-spacing: 0.04em;
}
```

### word-spacing

Monospace fonts carry wider default word spacing than proportional fonts. On large headings, this creates awkward gaps. The fix is `word-spacing: -0.15em` on headings — tight enough that multi-line titles read as a single block, loose enough that words don't collide.

### line-height

At heading scale, `line-height: 1.2` keeps multi-line titles compact. At body scale, `line-height: 1.8` compensates for the fixed-width rhythm — the additional vertical breathing room guides the eye along each line without the natural width variation of proportional fonts to do the work.

### letter-spacing

UI labels and tags at `0.7rem` benefit from slight `letter-spacing: 0.04em` to stay legible. At small sizes, monospace characters can crowd each other — a subtle letter-spacing adjustment prevents that without calling attention to itself.

None of these are obstacles. They're calibrations — the kind any deliberate typographic choice requires.

---

## $ cat commitment.md

There's a version of this essay that hedges — that says "monospace can work if you're careful" and ends with a balanced list of pros and cons. This is not that essay.

The real reason to go all-in on monospace is simpler than typography theory: it's the answer to *what does this site feel like?* A terminal. An editor. A place built by someone who's never quite left the terminal.

That's not a universal answer. It doesn't need to be. Personal sites are the last place on the web where you're allowed to make a choice and commit to it without a committee's approval.

Monospace everywhere is a commitment — one that forces every other design decision to fall in line. The spacing, the colors, the layout, the tone of the writing itself — they all have to answer to the same constraint. That's the real value. Not the specific typeface, but the clarity that comes from choosing *something* and seeing it through.

Every personal site needs at least one of those decisions, whatever it may be.

---

The fonts that surrounded me every day — in my editor, in my terminal, in every tool I actually use — were monospace. It took embarrassingly long to realize the blog should be too.

Some decisions look strange until they look inevitable. This was one of them.
