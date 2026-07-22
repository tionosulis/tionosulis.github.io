import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginBundle from "@11ty/eleventy-plugin-bundle";
import pluginNavigation from "@11ty/eleventy-navigation";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItToc from "markdown-it-toc-done-right";
import markdownItFootnote from "markdown-it-footnote";
import shiki from "@shikijs/markdown-it";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { DateTime } from "luxon";
import { minify } from "html-minifier-terser";
import { transform as lightning } from "lightningcss";
import { readFileSync } from "fs";
import { execSync } from "child_process";
import path from "node:path";
import { glob } from "tinyglobby";
import matter from "gray-matter";

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(pluginBundle);

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed/feed.xml",
    collection: {
      name: "posts",
      limit: 10,
    },
    metadata: {
      language: "en",
      title: "Sulistiono",
      subtitle: "Sulistiono's thoughts",
      base: "https://tionosulis.github.io/",
      author: {
        name: "Sulistiono",
        email: "contact.sulistiono@gmail.com",
      },
    },
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["svg", "avif", "webp"],
    widths: [400, 618, 800],
    svgShortCircuit: true,
    defaultAttributes: {
      decoding: "auto",
      sizes: "(min-width: 680px) 618px, 92vw",
    },
    filenameFormat: (id, src, width, format) => {
      const srcName = path.parse(src).name;
      return `${srcName}-${width}.${format}`;
    },
  });

  eleventyConfig.addPlugin(IdAttributePlugin);

  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

  let md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
    tables: true,
  });

  md.use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "header-anchor",
      symbol: "#",
      ariaHidden: false,
      space: false,
    }),
    level: [1, 2, 3, 4],
  });

  md.use(markdownItToc, {
    level: [1, 2, 3],
    containerClass: "toc",
    listType: "ul",
  });

  md.use(markdownItFootnote);

  md.use(await shiki({
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  }));

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy({ "content/assets/fonts": "/fonts" });
  eleventyConfig.addPassthroughCopy({ "content/assets/img/favicon": "/" });
  eleventyConfig.addPassthroughCopy({ "content/assets/img": "/assets/img" });
  eleventyConfig.addPassthroughCopy({ "demos": "/demos" });

  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("isoDateTime", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });

  eleventyConfig.addFilter("toDate", (val) => {
    if (val instanceof Date) return val;
    return new Date(val);
  });

  eleventyConfig.addFilter("sortPinned", (collection) => {
    const pinned = collection.filter(p => p.data.pinned);
    const rest = collection.filter(p => !p.data.pinned).reverse();
    return [...pinned, ...rest];
  });

  eleventyConfig.addFilter("filterTagList", (tags) => {
    return (tags || []).filter((tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  });

  eleventyConfig.addFilter("countTopics", (posts) => {
    const tags = new Set();
    if (!posts) return 0;
    for (const post of posts) {
      if (post.data && Array.isArray(post.data.tags)) {
        for (const tag of post.data.tags) {
          if (tag !== "posts") tags.add(tag);
        }
      }
    }
    return tags.size;
  });

  eleventyConfig.addFilter("tagCounts", (posts) => {
    const counts = {};
    if (!posts) return [];
    for (const post of posts) {
      if (post.data && Array.isArray(post.data.tags)) {
        for (const tag of post.data.tags) {
          if (tag !== "posts") {
            counts[tag] = (counts[tag] || 0) + 1;
          }
        }
      }
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  });

  eleventyConfig.addFilter("getDate", (dateObj, format) => {
    if (!dateObj) return "";
    if (dateObj.date instanceof Date) {
      return DateTime.fromJSDate(dateObj.date, { zone: "utc" }).toFormat(format);
    }
    if (dateObj instanceof Date) {
      return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
    }
    return "";
  });



  eleventyConfig.addGlobalData("runMode", () => process.env.ELEVENTY_RUN_MODE || "build");

  eleventyConfig.addGlobalData("lastCommitDate", () => {
    try {
      const date = execSync("git log -1 --format=%cI").toString().trim();
      return new Date(date);
    } catch {
      return new Date();
    }
  });

  eleventyConfig.addFilter("timeAgo", (date) => {
    if (!date) return "";
    const diff = DateTime.now().diff(DateTime.fromJSDate(date));
    const parts = diff.shiftTo("days", "hours", "minutes");
    if (parts.days >= 1) return `${Math.floor(parts.days)}d ago`;
    if (parts.hours >= 1) return `${Math.floor(parts.hours)}h ago`;
    if (parts.minutes >= 1) return `${Math.floor(parts.minutes)}m ago`;
    return "just now";
  });

  eleventyConfig.addFilter("dateToISO", (date) => {
    if (!date) return "";
    return DateTime.fromJSDate(date).toISO();
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.on("eleventy.before", async ({ dir }) => {
    const files = await glob(`${dir.input}/posts/**/*.md`);
    for (const file of files) {
      const { data } = matter(readFileSync(file, "utf8"));
      const title = data.title || "";
      if (title.length > 60 && !data.seoTitle) {
        console.warn(
          `\u26A0\uFE0F  [SEO] "${file}" \u2013 title ${title.length} chars, seoTitle missing:\n    \u201C${title}\u201D`
        );
      }
    }
  });

  const copySvg = '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  const checkSvg = '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  const FILENAME_MAP = {
    js: 'script.js', javascript: 'script.js',
    css: 'styles.css', html: 'index.html',
    bash: 'setup.sh', sh: 'setup.sh', diff: 'changes.diff',
    json: 'config.json', yml: 'config.yml', yaml: 'config.yml',
    py: 'script.py', python: 'script.py',
    ts: 'app.ts', tsx: 'app.tsx', jsx: 'app.jsx',
    md: 'README.md', xml: 'config.xml', svg: 'icon.svg',
    toml: 'config.toml', text: 'output.txt',
    njk: 'template.njk', jinja: 'template.jinja'
  };

  eleventyConfig.addTransform("copy-code", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    const copyBtnHtml = `<button class="copy-btn" aria-label="Copy code" data-copy="${encodeURIComponent(copySvg)}" data-check="${encodeURIComponent(checkSvg)}">${copySvg}</button>`;
    return content.replace(/(<pre[^>]*>)([\s\S]*?)(<\/pre>)/g, (match, openTag, inner, closeTag) => {
      const isShiki = /shiki/.test(openTag);
      let statusBar = '';
      let promptEl = '';
      if (isShiki) {
        const lang = (inner.match(/class="language-(\w+)"/) || [])[1] || '';
        const lineCount = (inner.match(/<span class="line">/g) || []).length;
        const info = lang ? lang + ' \u2502 ' + lineCount + 'L' : lineCount + 'L';
        statusBar = '<span class="code-statusbar"><span class="status-mode">NORMAL</span><span class="status-info">' + info + '</span></span>';
        const filename = FILENAME_MAP[lang] || 'untitled';
        promptEl = '<span class="prompt" aria-hidden="true">$ cat ' + filename + '</span>';
      }
      return openTag + copyBtnHtml + '<span class="code-wrapper">' + promptEl + inner + '</span>' + statusBar + closeTag;
    });
  });

  const svgSizeCache = new Map();

  function getSvgDims(filePath) {
    let dims = svgSizeCache.get(filePath);
    if (dims) return dims;
    try {
      const svgContent = readFileSync(filePath, "utf-8");
      const wMatch = svgContent.match(/width="(\d+)"/);
      const hMatch = svgContent.match(/height="(\d+)"/);
      const vbMatch = svgContent.match(/viewBox="\d+\s+\d+\s+(\d+)\s+(\d+)"/);
      if (wMatch && hMatch) {
        dims = { w: wMatch[1], h: hMatch[1] };
      } else if (vbMatch) {
        dims = { w: vbMatch[1], h: vbMatch[2] };
      }
      if (dims) svgSizeCache.set(filePath, dims);
    } catch {}
    return dims;
  }

  function makeSvgImgTag(svgSrc, dims, alt) {
    let tag = `<img src="${svgSrc}" width="${dims.w}" height="${dims.h}"`;
    if (alt) tag += ` alt="${alt}"`;
    return tag + '>';
  }

  eleventyConfig.addTransform("fix-svg-imgs", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;

    content = content.replace(/<img[^>]+src="([^"]+\.svg)"[^>]*>/gi, (match, src) => {
      if (/width="[^"]+"/i.test(match) || /height="[^"]+"/i.test(match)) return match;
      let filePath;
      if (src.startsWith("/")) {
        filePath = path.join(process.cwd(), "content", src.replace(/^\//, ""));
      } else {
        filePath = path.resolve(path.dirname(this.page.inputPath), src);
      }
      const dims = getSvgDims(filePath);
      if (!dims) return match;
      const alt = match.match(/alt="([^"]*)"/i)?.[1] || '';
      return makeSvgImgTag(src, dims, alt);
    });

    return content;
  });

  eleventyConfig.addTransform("rm-pre-tabindex", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    return content.replace(/<pre\s+/g, '<pre ').replace(/\s+tabindex="0"/g, '');
  });

  eleventyConfig.addTransform("fix-footnotes", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    // <section> must have identifying heading — add aria-label
    return content.replace(
      '<section class="footnotes">',
      '<section class="footnotes" aria-label="Footnotes">'
    );
  });

  eleventyConfig.addTransform("wrap-tables", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    return content.replace(/<table/g, '<div class="table-wrap"><table').replace(/<\/table>/g, '</table></div>');
  });

  eleventyConfig.addTransform("loading-attr", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    let count = 0;
    return content.replace(/<img\s/g, () => {
      count++;
      if (count === 1) {
        return '<img loading="eager" fetchpriority="high" ';
      }
      return '<img loading="lazy" ';
    });
  });

  eleventyConfig.addTransform("lightning-css", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    return content.replace(/<style>([\s\S]*?)<\/style>/g, (match, css) => {
      try {
        const result = lightning({
          code: Buffer.from(css),
          minify: true,
          targets: {
            chrome: 100 << 16,
            safari: 15 << 16,
            firefox: 100 << 16,
          },
        });
        return `<style>${result.code.toString()}</style>`;
      } catch (e) {
        console.warn(`[lightning-css] ${this.page.outputPath}: ${e.message}`);
        return match;
      }
    });
  });

  eleventyConfig.addTransform("htmlmin", async function (content) {
    if (process.env.ELEVENTY_RUN_MODE === "serve") return content;
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      return minify(content, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        removeComments: true,
        removeEmptyAttributes: true,
        useShortDoctype: true,
      });
    }
    return content;
  });

  return {
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: "/",
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
  };
}
