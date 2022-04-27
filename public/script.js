let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
let fswitchBtn = document.querySelector(".f_switch");

closeBtn.addEventListener("click", ()=> {
    sidebar.classList.toggle("open");
    menuBtnChange(); // calling the function (optional)
});

/*searchBtn.addEventListener("click", ()=> { // Sidebar open when you click on the search icon
    sidebar.classList.toggle("open");
    menuBtnChange(); // calling the function (optional)
}); */

fswitchBtn.addEventListener("click", ()=> { // Sidebar open when you click on the focus icon
    sidebar.classList.toggle("open");
    menuBtnChange(); // calling the function (optional)
});

// following are the code to change sidebar button (optional)
function menuBtnChange() {
    if(sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); // replcaes the icons class
    } else {
        closeBtn.classList.replace("bx-menu-alt-right","bx-menu"); // replaces the icons class
    }
}