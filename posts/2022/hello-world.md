---
title: Hello World!
description: A short hello world! test post to make sure that the site build's is right.
date: 2022-01-09
tags: [eleventy]
---
This is a short test post to make sure that this [Eleventy](https://www.11ty.dev/) based site build's is right. Consist of some common typography and code block's styles test to make sure that the `css` rendered correctly.

Started with this very typical typography test of **bold**, _italic_, and the combination of **_both_** text. Then the below code block's styles test wrapped in `<pre>` tag applied to this [Hello World!](#) test post, which set its content `<meta>` to `<noindex>`.

Here's the two:

1. `if ignore` goes inside `<head>` tag of the `base.njk` layout

```html/4-6
<!-- _includes/layouts/base.njk -->

<head>
...
{%raw%}{% if ignore %}
   <meta name="robots" content="noindex"/>
{% endif %}{%endraw%}
...
</head>
```

2. `ignore:true` _key-value_ pairs goes to the post's `front-matter`

```diff-yaml
/* posts/hello-world.md */

---
title: Hello World!
description: A short hello world! test post
date: 2022-01-09
tags: [hello, eleventy]
+ignore: true
---
```
Finally, last but not least there's nothing much to say here but: **"hello!"** and thanks for visiting. Hope you enjoy your surf and see you around. 😄