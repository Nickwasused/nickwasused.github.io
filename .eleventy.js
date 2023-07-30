const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/basic.css");
    eleventyConfig.addPassthroughCopy("src/lozad.js");
    eleventyConfig.addPassthroughCopy("src/_headers");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/{,!(_site)/**/}*.webp");
    eleventyConfig.addPlugin(pluginRss);
   
    return {
        dir: {
          input: "src", 
          output: "dist"
        }
    }
};