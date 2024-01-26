const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginRev = require("eleventy-plugin-rev");
const eleventySass = require("eleventy-sass");

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter("custom_date", function(value) { return value.toLocaleDateString() });
    eleventyConfig.addFilter("custom_date_iso", function(value) { return value.toISOString().split('T')[0] });
    eleventyConfig.addPassthroughCopy("src/basic.css");
    eleventyConfig.addPassthroughCopy("src/lozad.js");
    eleventyConfig.addPassthroughCopy("src/_headers");
    eleventyConfig.addPassthroughCopy("src/_redirects");
    eleventyConfig.addPassthroughCopy("src/CNAME");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/{,!(_site)/**/}*.webp");
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(pluginRev);
    eleventyConfig.addPlugin(eleventySass, {
      rev: true
    });
  
   
    return {
        dir: {
          input: "src", 
          output: "dist"
        }
    }
};