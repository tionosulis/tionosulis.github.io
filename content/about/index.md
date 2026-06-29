---
layout: layouts/page.njk
title: ./sulistiono
description: >-
  Behind the terminal: colophon, technical stack, now page, post categories,
  and a fun fact about how this site is built and maintained.
---

<div class="home-terminal">

<p><span class="prompt-char">$</span> <span class="cmd">ls</span> links/</p>
<p class="output">
<a href="/posts/">posts/</a> <span class="entry-count">{{ collections.posts | length }} entries</span><br>
<a href="https://github.com/tionosulis">github.com/tionosulis</a><br>
<a href="https://twitter.com/tionosulis_">twitter.com/tionosulis_</a>
</p>

<p><span class="prompt-char">$</span> <span class="cmd">du -sh</span> /categories/*</p>
<p class="output">
 12K    css/<br>
 12K    design/<br>
 8.0K   eleventy/<br>
 4.0K   typography/<br>
 4.0K   pwa/<br>
 4.0K   performance/<br>
 4.0K   javascript/<br>
 4.0K   accessibility/<br>
 4.0K   git/<br>
 4.0K   troubleshooting/<br>
 4.0K   debugging/<br>
 4.0K   tutorial/<br>
 ...
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
I write code at 2 AM in a dark room, debug layout bugs<br>
on a 6-inch screen, and deploy to production using<br>
nothing but a terminal emulator and sheer stubbornness.<br>
The future is here and it looks suspiciously like<br>
a Nokia E71 with a really good keyboard.
</p>

<p class="cursor-line"><span class="prompt-char">$</span> <span class="blinking-cursor">&#9610;</span></p>

</div>
