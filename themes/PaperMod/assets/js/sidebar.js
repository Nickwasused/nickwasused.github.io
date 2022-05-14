// We want to create a usable nav menu here for the current post
document.addEventListener("DOMContentLoaded", function(){
    let sidebar = document.getElementById("sidebar");
    let headings = document.querySelectorAll("h1, h2");
    let nav_container = document.getElementById("navlist");
    headings.forEach(heading => {
        if (heading.innerHTML == "Navigation" || heading.innerHTML == "Nickwasused" || heading.classList[0] == "post-title") {
            return;
        }
        heading.id = heading.innerHTML;
        let child = document.createElement("a");
        let child_br = document.createElement("br");
        let listItem = document.createElement('li');

        // don´t use the href as navigation point use the text instead
        if (heading.lastChild.nodeName == "A") {
            child.innerHTML = heading.lastChild.innerHTML;
        } else {
            child.innerText = heading.innerHTML;
        }
        child.className = "nav_item";
        child.href = "#" + heading.id;
        listItem.appendChild(child);
        nav_container.appendChild(listItem);
        if (nav_container.getElementsByTagName("li").length == 0) {
            sidebar.style.visibility = "hidden";
        }
    })
});