let logo = document.getElementById("seasonslogo");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

function settheme() {
    if (document.body.className.includes("dark")) {
        logo.children[0].srcset = "/images/avif/4seasons/FourSeasonsLogoWhite.avif";
        logo.children[1].srcset = "/images/avif/4seasons/FourSeasonsLogoWhite.webp";
    } else {
        logo.children[0].srcset = "/images/avif/4seasons/FourSeasonsLogoBlack.avif";
        logo.children[1].srcset = "/images/avif/4seasons/FourSeasonsLogoBlack.webp";
    }
}
settheme();
document.getElementById("theme-toggle").addEventListener("click", async () => {
    await sleep(1000);
    settheme();
})
