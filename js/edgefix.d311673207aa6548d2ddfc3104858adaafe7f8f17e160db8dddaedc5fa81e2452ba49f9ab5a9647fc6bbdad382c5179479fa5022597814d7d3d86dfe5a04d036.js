document.addEventListener("DOMContentLoaded", function(){
    if (window.navigator.userAgent.indexOf("Edg") > -1) {
        let pictures = document.getElementsByTagName("picture");
        console.log(pictures);
        for (var i = 0; i < pictures.length; i++) {
            let picture = pictures[i];
            // remove the avif image
            picture.children[0].remove();
        }
    }
});