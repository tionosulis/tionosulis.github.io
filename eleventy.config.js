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
import { readFileSync } from "fs";

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
    formats: ["avif", "webp"],
    defaultAttributes: {
      decoding: "async",
    },
  });

  eleventyConfig.addPlugin(IdAttributePlugin);

  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

  let md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
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

  eleventyConfig.addNunjucksFilter("date", (dateObj, format) => {
    if (!dateObj) return "";
    if (dateObj.date instanceof Date) {
      return DateTime.fromJSDate(dateObj.date, { zone: "utc" }).toFormat(format);
    }
    if (dateObj instanceof Date) {
      return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
    }
    return "";
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  const copySvg = '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  const checkSvg = '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  eleventyConfig.addTransform("copy-code", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    const copyBtnHtml = `<button class="copy-btn" aria-label="Copy code" data-copy="${encodeURIComponent(copySvg)}" data-check="${encodeURIComponent(checkSvg)}">${copySvg}</button>`;
    let result = content.replace(/(<pre[^>]*>)/g, "$1" + copyBtnHtml + '<div class="code-wrapper">');
    return result.replace(/<\/pre>/g, '</div></pre>');
  });

  const svgSizeCache = new Map();

  eleventyConfig.addTransform("fix-svg-imgs", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    return content.replace(/<img[^>]+src="([^"]+\.svg)"[^>]*>/gi, (match, src) => {
      if (/width="[^"]+"/i.test(match) || /height="[^"]+"/i.test(match)) return match;
      const filePath = "content/" + src.replace(/^\//, "");
      let dims = svgSizeCache.get(filePath);
      if (!dims) {
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
      }
      if (dims) {
        return match.replace(/^<img /, `<img width="${dims.w}" height="${dims.h}" `);
      }
      return match;
    });
  });

  eleventyConfig.addTransform("rm-pre-tabindex", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    return content.replace(/<pre\s+/g, '<pre ').replace(/\s+tabindex="0"/g, '');
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

  eleventyConfig.addTransform("htmlmin", async function (content) {
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
