import pluginRss from "@11ty/eleventy-plugin-rss";

export default async function(eleventyConfig) {
    eleventyConfig.addFilter("custom_date", function(value) { return value.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }) });
    eleventyConfig.addFilter("custom_date_iso", function(value) { return value.toISOString().split('T')[0] });
    eleventyConfig.addPassthroughCopy({"src/_headers": "_headers"});
    eleventyConfig.addPassthroughCopy({"src/_redirects": "_redirects"});
    eleventyConfig.addPassthroughCopy({"src/CNAME": "CNAME"});
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/simple.xslt");
    eleventyConfig.addPassthroughCopy("src/{,!(_site)/**/}*.webp");
    eleventyConfig.addPassthroughCopy("src/{,!(_site)/**/}*.avif");
    // eleventyConfig.addPassthroughCopy("src/_posts/2024-06-14-discord-archiving/report.htm");
    eleventyConfig.addPassthroughCopy("src/_posts/2024-06-14-discord-archiving/archive.sh");
    eleventyConfig.addPlugin(pluginRss);

    return {
        dir: {
          input: "src", 
          output: "dist"
        }
    }
};