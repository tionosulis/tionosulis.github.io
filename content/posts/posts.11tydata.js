export default {
  tags: ["posts"],
  layout: "layouts/post.njk",
  permalink: ({ draft, page }) => draft ? `/drafts/${page.fileSlug}/` : `/posts/${page.fileSlug}/`,
  eleventyComputed: {
    eleventyExcludeFromCollections: ({ draft }) => draft ? true : undefined,
    ignore: ({ draft }) => draft ? true : undefined,
    _notice: ({ notice, redesign_notice }) => {
      if (notice) return typeof notice === "object" ? notice : { type: notice };
      if (redesign_notice) return { type: "redesign" };
      return null;
    },
    updates: ({ updates, updated }) => {
      if (updates) return updates;
      if (updated) return [{ date: updated }];
      return [];
    },
  },
};
