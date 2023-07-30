const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("basic.css");
    eleventyConfig.addPassthroughCopy("lozad.js");
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPassthroughCopy("**/*.webp");
};