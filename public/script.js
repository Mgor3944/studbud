//-----------------//
// Button Switches //
//-----------------//

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

fswitchBtn.addEventListener("click", ()=> { // Sidebar open when you click on the focus icon
    sidebar.classList.toggle("open");
    menuBtnChange(); // calling the function
});

//  Changes sidebar hamburger button on click
function menuBtnChange() {
    if(sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); // replaces the icons class
    } else {
        closeBtn.classList.replace("bx-menu-alt-right","bx-menu"); // replaces the icons class
    }
}

//  Toggles focus mode on/off - changing icon design
function focusBtnChange() {
    if(focusBtn.classList.contains("bx-bolt-circle")) {
        focusBtn.classList.replace("bx-bolt-circle", "bxs-bolt-circle"); // replaces the icons class
    } else {
        focusBtn.classList.replace("bxs-bolt-circle","bx-bolt-circle"); // replaces the icons class
    }
}

//-------------------------//
// Calender Customisations //
//-------------------------//

let dashdate = new Date();

// calculating date aspects

let year = dashdate.getFullYear();
let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][dashdate.getMonth()];
let date = dashdate.getDate();
let day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][dashdate.getDay() - 1];

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

// Top Navbar Date
document.getElementById("current_day").innerHTML = day + ", ";
document.getElementById("current_date").innerHTML = date + " " + month + " " + year;

// Calender (element) Month & Year
document.getElementById("curr-m-y").innerHTML =  month + " " + year;

// calender dashboard function
let calendar = document.querySelector('.calendar');
