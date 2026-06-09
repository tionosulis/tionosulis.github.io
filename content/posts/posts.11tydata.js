export default {
  tags: ["posts"],
  layout: "layouts/post.njk",
  permalink: ({ draft, page }) => draft ? `/drafts/${page.fileSlug}/` : `/posts/${page.fileSlug}/`,
  eleventyComputed: {
    eleventyExcludeFromCollections: ({ draft }) => draft ? true : undefined,
  },
};
