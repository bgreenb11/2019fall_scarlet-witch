let open = false;

function toggleNav() {
    var width, marginleft, bgcolor, hovercolor;

    if (open) {
        open = false;
        width = "32px";
        marginleft = "32px";
        bgcolor = "#444";
    } else {
        open = true;
        width = "20%";
        marginleft = "20%";
        bgcolor = "#222";
    }

    document.getElementById("nav-menu").style.width = width;
    document.getElementById("main-view").style.marginLeft = marginleft;
    document.getElementById("active").style.backgroundColor = bgcolor;
}

toggleNav();