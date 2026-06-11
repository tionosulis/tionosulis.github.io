import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginBundle from "@11ty/eleventy-plugin-bundle";
import pluginNavigation from "@11ty/eleventy-navigation";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItToc from "markdown-it-toc-done-right";
import shiki from "@shikijs/markdown-it";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { DateTime } from "luxon";
import { minify } from "html-minifier-terser";

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
    extensions: "jpg,jpeg,png,gif,webp,avif",
    formats: ["avif", "webp"],
    defaultAttributes: {
      loading: "lazy",
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
    }),
    level: [1, 2, 3, 4],
  });

  md.use(markdownItToc, {
    level: [1, 2, 3],
    containerClass: "toc",
    listType: "ul",
  });

  md.use(await shiki({
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  }));

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy({ "assets/fonts": "/fonts" });
  eleventyConfig.addPassthroughCopy({ "assets/img/favicon": "/" });
  eleventyConfig.addPassthroughCopy({ "assets/img": "/assets/img" });

  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("filterTagList", (tags) => {
    return (tags || []).filter((tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  const copySvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  const checkSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  eleventyConfig.addTransform("copy-code", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) return content;
    const copyBtnHtml = `<button class="copy-btn" aria-label="Copy code" data-copy="${encodeURIComponent(copySvg)}" data-check="${encodeURIComponent(checkSvg)}">${copySvg}</button>`;
    let result = content.replace(/(<pre[^>]*>)/g, "$1" + copyBtnHtml + '<div class="code-wrapper">');
    return result.replace(/<\/pre>/g, '</div></pre>');
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
