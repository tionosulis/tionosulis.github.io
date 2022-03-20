---
title: Hello World!
description: A short hello world! test post
date: 2022-01-09
tags:
- hello
---
A test post just to make sure that the site build's right, and some small typography and code block test to make sure that the styles rendered correctly. Start by this very common **bold**, _italic_, and the **_combination_** of the two typho test.

And for the next, here's the code block test wrapped in `<pre>` tag to set this [Hello Word](#)'s post content `<meta>` to `noindex`, which is simply done by:  
1. Placing the below highlighted code block inside `<head>` tag on my `base.njk` 

```html/4-6
<!-- _includes/layouts/base.njk -->

<head>
...   
{%raw%}{% if ignore %}
   <meta name="robots" content="noindex"/>
{% endif %}{%endraw%}
</head>
```

2. Modifying this Hello World post's `front-matter` like so

```diff-yaml
/* posts/hello-world.md */

---
title: Hello World!
description: A short hello world! test post
date: 2022-01-09
tag: hello
+ ignore: true
---
```
Finally last but not least, there's nothing much to say here but: "hello!", thanks for visiting, enjoy your surf and see you around.
