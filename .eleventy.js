const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginRev = require("eleventy-plugin-rev");
const eleventySass = require("eleventy-sass");

module.exports = function(eleventyConfig) {
    eleventyConfig.addFilter("custom_date", function(value) { return value.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }) });
    eleventyConfig.addFilter("custom_date_iso", function(value) { return value.toISOString().split('T')[0] });
    eleventyConfig.addPassthroughCopy("src/basic.css");
    eleventyConfig.addPassthroughCopy("src/lozad.js");
    eleventyConfig.addPassthroughCopy("src/_headers");
    eleventyConfig.addPassthroughCopy("src/_redirects");
    eleventyConfig.addPassthroughCopy("src/CNAME");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/simple.xslt");
    eleventyConfig.addPassthroughCopy("src/{,!(_site)/**/}*.webp");
    eleventyConfig.addPassthroughCopy("src/{,!(_site)/**/}*.avif");
    // eleventyConfig.addPassthroughCopy("src/_posts/2024-06-14-discord-archiving/report.htm");
    eleventyConfig.addPassthroughCopy("src/_posts/2024-06-14-discord-archiving/archive.sh");
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