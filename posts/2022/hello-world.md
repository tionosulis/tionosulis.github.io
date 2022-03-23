---
title: Hello World!
description: A short hello world! test post to make sure that the site build's right.
date: 2022-01-09
tags: [hello, eleventy]
---
This is a short test post to make sure that this [Eleventy](https://www.11ty.dev/) based site build's right. Consist of some common typography and code block's styles test to make sure that the `css` rendered correctly. Start by this very common **bold**, _italic_, and the **_combination_** of the two typho test.

The Next is the code block's style test wrapped in `<pre>` tag applied to this [Hello World!](#) test post in order to set its post content `<meta>` to `<noindex>`, which is simply done by:  
1. Add the below highlighted code block inside `<head>` tag to the `base.njk` layout

```html/4-6
<!-- _includes/layouts/base.njk -->

<head>
...   
{%raw%}{% if ignore %}
   <meta name="robots" content="noindex"/>
{% endif %}{%endraw%}
</head>
```

2. Add `ignore:true` _key-value_ pairs to the `hello-world.md` post's `front-matter` like so

```diff-yaml
/* posts/hello-world.md */

---
title: Hello World!
description: A short hello world! test post
date: 2022-01-09
tags: [hello, eleventy]
+ ignore: true
---
```
Finally last but not least, there's nothing much to say here but: "hello!" and thanks for visiting. Hope you enjoy your surf and see you around. 😄
