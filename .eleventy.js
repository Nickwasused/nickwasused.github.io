module.exports = function(eleventyConfig) {
    eleventyConfig.addShortcode("resize-image", function(src, alt) {
      return '<img class="article-image lozad" data-src="${src}" />';
    });
};