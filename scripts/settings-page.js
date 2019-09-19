var acc = document.getElementsByClassName("section-header");
var i;

// This was used from w3 schools accordian button tutorial
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      this.style.borderBottomLeftRadius = "5px";
      this.style.borderBottomRightRadius = "5px";
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      this.style.borderBottomLeftRadius = "0px";
      this.style.borderBottomRightRadius = "0px";
    } 
  });
}
// ..

//Really messed up filter code but need to get this functioning, will fix later
function get_div(div_id) {
    var d = document.getElementById(div_id);
    var section_div = Array.from(d.children)[0]; // this line only supports one "portion" per section. will fix later
    var d_list = Array.from(section_div.children)

    var return_list = d_list.filter((elem) => {
        return elem.tagName !== "LABEL";
    });
    
    for (var i = 0; i < return_list.length; i++) {
        console.log(return_list[i].id)
    }
}

function submitAccountSettings() {
    var my_settings = get_div('account-section');
}

function submitDisplaySettings() {
    var my_settings = get_div('display-section')
}