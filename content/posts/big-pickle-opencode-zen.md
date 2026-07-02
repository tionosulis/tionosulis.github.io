---
title: "Big Pickle: The Free AI That Made Me Rethink What 'Good Code' Means"
seoTitle: "Big Pickle: Rethinking What 'Good Code' Means"
description: "A personal journal entry about trying almost every AI coding tool and finding one that understands project architecture — not just syntax."
date: 2026-06-18
draft: true
tags: [ai, coding, tools, personal]
---

**June 18, 2026**

I've spent the better part of a year rotating through AI tools for coding and technical writing. ChatGPT, Gemini, Claude — each one promised to be the productivity multiplier I was looking for. And each one delivered, to some degree. But none of them made me sit back and think: *this is a fundamentally different way of working.*

Until Big Pickle.

## The Craft Problem

Most AI tools answer questions. You ask "how do I implement a dot leader pattern?", they give you a flexbox snippet. It's correct. It compiles. You copy-paste, adapt, move on. 

And honestly, that's fine — I didn't tell it about my project, so how could it know? But here's what Big Pickle did differently: before writing a single line, it read the project. It opened my postslist template, my CSS file, my Eleventy config — and *then* wrote code that fit. Not code that worked in isolation. Code that belonged in my project. That's the difference between answering a question and improving a codebase.

Here's what I mean. I gave the same prompt — *"implement a dot leader for my blog post listing"* — to four different tools:

### ChatGPT

```css
/* ChatGPT's response */
.postlist-item {
  display: flex;
  justify-content: space-between;
}
```

Three paragraphs explaining what flexbox is. An assumption that I want `justify-content: space-between` (I don't — it breaks on long titles). A generic example that required 10 minutes of adaptation before it fit my actual codebase. Technically correct. Contextually naive.

### Gemini Pro

```css
/* Gemini Pro's response */
.postlist-item {
  display: flex;
  align-items: center;
}
.postlist-dots {
  flex: 1;
  border-bottom: 1px dotted;
  margin: 0 0.5em;
}
```

Better — fewer paragraphs, more concise. But `border-bottom` for a horizontal connector? That puts dots along the bottom edge of the container, not between title and date. Wrong approach for the layout I described. And on a different day, in a different session, the same question gets a completely different answer — as if the model behind the scenes keeps swapping. The competence fluctuates dramatically, and you never know which version you're going to get.

### Claude (free tier)

```css
/* Claude's response */
.postlist-item {
  display: flex;
}
.postlist-dots::before {
  content: " . . . . . . . . . . . . . . . . ";
  flex: 1;
}
```

To the point, zero fluff. Close to the right solution. But by the time I asked question four or five — "how do I handle overflow on mobile?" — the session timed out, and I had to start over. The quality was there, but the stamina wasn't.

### Big Pickle

Before writing a single line of code, Big Pickle did something none of the others did: it read the project.

```bash
# Actual sequence I observed:
_read postslist.njk       # sees <ol>, <li>, <a>, <span>, <time>
_read index.css           # sees :root variables, dark mode, existing patterns
_read posts.11tydata.js   # sees draft system, permalink structure
_read eleventy.config.js  # sees markdown-it, Shiki, transforms
```

Then it answered:

```css
/* Big Pickle's response */
.postlist li {
  display: flex;
  align-items: baseline;
  padding: 0.3rem 0;
  gap: 0;
}
.postlist a {
  max-width: 65%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.postlist-dots {
  flex: 1;
  min-width: 4em;
  overflow: hidden;
  align-self: center;
}
```

![Side-by-side comparison: Typical AI sees one isolated file (dot-leader.css) while Big Pickle reads the full interconnected project](/assets/img/big-pickle-project-awareness.svg)

See the difference? The `padding: 0.3rem` matches the golden ratio hierarchy already defined elsewhere in the CSS. The `max-width: 65%` accounts for long titles pushing content off-screen. The `align-self: center` anticipates the middle dot alignment problem before I even noticed it existed. This code didn't answer a question — it improved a project.

This is what I mean by *craft over correctness*. Big Pickle doesn't just write code that works. It writes code that belongs.

## 0.05em

I want to tell you about the exact moment I realized this tool was different.

Big Pickle had written the dot leader implementation. It worked. I was about to move on. Then it added one line of CSS:

```css
top: 0.05em;
```

I stared at it. "What's that for?"

The middle dot character (·, U+00B7) sits at x-height center by design — not on the baseline like a period. Even with `align-self: center`, something about its vertical position felt slightly low relative to the text's optical center. Big Pickle had noticed. And fixed it. Without being asked.

This is an incredibly hard thing to get an AI to do because it requires understanding how a glyph is designed, how optical alignment differs from mathematical alignment, and how a 0.05em nudge affects the reading experience. It's the kind of detail most developers don't think about. Certainly not something you'd expect an AI to volunteer unprompted.

But this was not an isolated incident. The same thing happened with the technical writing.

## The Writing Compliment

My original draft for the dot leader post was a straightforward tutorial. Here's the HTML. Here's the CSS. Here's how it works. Functional. Dry. The kind of post that answers a question and disappears from memory immediately.

Big Pickle rewrote it — and by "rewrote," I don't mean it fixed my grammar. I mean it restructured the entire narrative into a three-challenge debugging story with a before-and-after arc. It added context about 17th century typesetting. It explained *why* each CSS property mattered in terms of real edge cases I had actually encountered. It connected the dot pattern to the golden ratio post I had written two weeks prior.

I did not ask for any of this. I asked for a draft about CSS. What I got was a piece of writing that understood the broader narrative of the blog — the ongoing story about iteration, polish, and invisible craftsmanship.

Most AI writing tools are excellent at *sounding* like they understand content. Big Pickle is the first one that I believe actually does.

## The Honest Comparison

Claude Code from Anthropic is widely considered the gold standard for AI-assisted coding. I've used it. It's excellent. Here's my honest assessment:

| Aspect | Claude Code | Big Pickle |
|---|---|---|
| Code quality | Excellent — deep reasoning, few hallucinations | Excellent — same tier |
| Project awareness | Scans project structure via CLI | Reads and understands architecture organically |
| Writing quality | Functional, gets the job done | Narrative, craft-aware, interlink-conscious |
| Cost | $20/month Pro + usage overages | Free via Opencode Zen |
| Session friction | Context window fills, session restarts needed | Generous context, no disruptive limits |
| Interaction model | Terminal commands, ask-answer | Conversational, proactive polish |

Big Pickle runs on [Opencode](https://opencode.ai), an open-source AI coding tool, through their free tier called **Opencode Zen** — which uses this Big Pickle model at no cost. No credit card, no trial clock, no "you've used your 50 messages for today."

I want to be careful not to overstate. Claude Code is genuinely powerful, and for certain types of work — large refactors, complex multi-file migrations — it may still have an edge. But for the kind of work I do (technical blogging, project maintenance, design systems), Big Pickle has become my primary tool. It's not just "good for a free tool." It's good, period. The fact that it's free is almost incidental.

## The Takeaway

I'm not writing this to sell you on any particular tool. I'm writing it because I think the distinction between "code that works" and "code that belongs" is an important one, and I didn't fully understand it until I experienced the difference side by side.

Most AI tools answer prompts. Big Pickle understands projects. Most AI tools fix syntax. Big Pickle fixes architecture. Most AI tools write words. Big Pickle writes narratives.

For me, on this blog, at this stage — that's the tool I needed. And it happened to be free.

---

*This is a personal reflection, not a sponsored post. I have no affiliation with Opencode or Anthropic. I'm just someone who enjoys tinkering with code and found a tool that changed how I work, and wanted to write it down.*
