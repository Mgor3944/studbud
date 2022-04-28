let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
let fswitchBtn = document.querySelector(".f_switch");
let focusBtn = document.querySelector("#bolt_switch");

closeBtn.addEventListener("click", ()=> {
    sidebar.classList.toggle("open");
    menuBtnChange(); // calling the function
});

focusBtn.addEventListener("click", ()=> {
    focusBtnChange(); // calling the function
});

/*searchBtn.addEventListener("click", ()=> { // Sidebar open when you click on the search icon
    sidebar.classList.toggle("open");
    menuBtnChange(); // calling the function (optional)
}); */

fswitchBtn.addEventListener("click", ()=> { // Sidebar open when you click on the focus icon
    sidebar.classList.toggle("open");
    menuBtnChange(); // calling the function
});

// following are the code to change sidebar hamburger button
function menuBtnChange() {
    if(sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); // replaces the icons class
    } else {
        closeBtn.classList.replace("bx-menu-alt-right","bx-menu"); // replaces the icons class
    }
}

// following are the code to change focus mode on/off
function focusBtnChange() {
    if(focusBtn.classList.contains("bx-bolt-circle")) {
        focusBtn.classList.replace("bx-bolt-circle", "bxs-bolt-circle"); // replaces the icons class
    } else {
        focusBtn.classList.replace("bxs-bolt-circle","bx-bolt-circle"); // replaces the icons class
    }
}

// customing date display on top navbar 
let date = new Date();
let year = date.getFullYear();
let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()];
let tdate = date.getDate();
let day = ["Mondat", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][date.getDay() - 1];

document.getElementById("current_day").innerHTML = day + ", ";
document.getElementById("current_date").innerHTML = tdate + " " + month + " " + year;

