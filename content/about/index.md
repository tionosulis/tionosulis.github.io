---
layout: layouts/page.njk
title: ./sulistiono
description: >-
  Sulistiono — web developer and blogger. Vanilla CSS, static sites, writes about
  frontend. Ships mainly from a phone via SSH and sheer stubbornness.
image: /assets/img/og/about.png
image_alt: "Terminal card: sulistiono heading, $ whoami and $ ls links/ commands, GitHub and Twitter handles, >_S logo in amber ASCII box on dark dotted background"
---

<div class="home-terminal">

<p><span class="prompt-char">$</span> <span class="cmd">ls</span> links/</p>
<p class="output">
<a href="/posts/">posts/</a> <span class="entry-count">{{ collections.posts | length }} entries</span><br>
<a href="https://github.com/tionosulis">github.com/tionosulis</a><br>
<a href="https://twitter.com/tionosulis_">twitter.com/tionosulis_</a>
</p>

{% set cats = collections.posts | tagCounts %}
<p><span class="prompt-char">$</span> <span class="cmd">wc -l</span> /categories/*</p>
<p class="output">
{% for cat in cats %}{% if loop.index <= 12 %}{% if cat[1] < 10 %}&nbsp;{% endif %}{{ cat[1] }}    {{ cat[0] }}/<br>{% endif %}{% endfor %} ...
</p>

<p><span class="prompt-char">$</span> <span class="cmd">cat</span> colophon.txt</p>
<p class="output">
  generator:      Eleventy v3<br>
  host:           GitHub Pages<br>
  domain:         tionosulis.github.io<br>
  font:           JetBrains Mono (variable)<br>
  css:            vanilla (no framework)<br>
  js:             vanilla (no framework)<br>
  highlighting:   Shiki<br>
  svg → png:      sharp<br>
  icons:          hand-crafted SVG<br>
  analysis:       fonttools + by-hand math
</p>

<p><span class="prompt-char">$</span> <span class="cmd">cat</span> now.txt</p>
<p class="output">
  watching:       Mad Men, Peaky Blinders<br>
  reading:        Ronggeng Dukuh Paruk — Achmad Tohari<br>
  learning:       Python<br>
  building:       IDX Stock Screener Dashboard &amp; Telegram BOT
</p>

<p><span class="prompt-char">$</span> <span class="cmd">cat</span> funfact.txt</p>
<p class="output">
This entire site — every post, every CSS variable,<br>
every typo — is maintained via SSH from a smartphone.<br>
I debug layout bugs on a 6-inch screen from a phone<br>
that's older than some of my dependencies, and deploy<br>
to production using nothing but a terminal emulator<br>
and sheer stubbornness.<br>
The future is here and it looks suspiciously like<br>
a Nokia E71 with a really good keyboard.
</p>

<p><span class="prompt-char">$</span> <span class="cmd">cat</span> ~/motto</p>
<blockquote class="twitter-tweet">
<p lang="en" dir="ltr">
Embrace a tranquil and mindful life. 🌸<br>
Live Now: Focus on the present.<br>
Simplify: Eliminate the unnecessary.<br>
Calm: Find peace in daily routines.<br>
Balance: Harmonize body and mind.
</p>
&mdash; Sulistiono (@tionosulis_)
<a href="https://twitter.com/tionosulis_/status/1835520698112233900">September 16, 2024</a>
</blockquote>

<p class="cursor-line"><span class="prompt-char">$</span> <span class="blinking-cursor">&#9610;</span></p>

</div>
