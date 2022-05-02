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
        focusBtn.style.color = "#E95050";
    } else {
        focusBtn.classList.replace("bxs-bolt-circle","bx-bolt-circle"); // replaces the icons class
        focusBtn.style.color = "#E950D1";
    }
}

//-----------------//
// TOP NAVBAR DATE //
//-----------------//

let topDate = new Date();

let currDay = document.querySelector("#current_day");
let currDate = document.querySelector("#current_date");

let cMonth = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
][topDate.getMonth()];

let cWDay = [
    "Monday",
    "Tuesday",
    "Wednesday", 
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
][topDate.getDay() - 1];

// Setting Top Navbar Current Date (Custom Display)
currDay.innerHTML = cWDay + ", ";
currDate.innerHTML = topDate.getDate() + " " + cMonth + " " + topDate.getFullYear(); 

//--------------------//
// DASHBOARD CALENDER //
//--------------------//

let date = new Date();

let renderCalendar = () => {
    date.setDate(1);

    // Attatching JS to HTML elements

    let calDays = document.querySelector(".days");
    
    // Calender Calculations

    let lastDay = new Date( // calc last day of current month
        date.getFullYear(), 
        date.getMonth() + 1, 
        0
    ).getDate(); 

    let prevLastDay = new Date(  // calc last day of last month
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();

    let firstDayIndex = date.getDay(); // calc first day of month

    let lastDayIndex = new Date( // calc last day of current week
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();

    let nextDays = 7 - lastDayIndex - 1; // calc how many days of next month to inc
    
    // Setting up months and weekdays

    let months = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ][date.getMonth()];
    
    let weekday = [
        "Monday",
        "Tuesday",
        "Wednesday", 
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ][date.getDay()];
    
    // Adding current Month/Year to Calender Top
    document.querySelector("#currMonth").innerHTML = months;
    document.querySelector("#currYear").innerHTML = date.getFullYear();
    
    // Adding Month Days (prev, current, next) to Calender

    let days = "";
    
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div id="prev-month-days">${prevLastDay - x + 1}</div>`;
    }
    
    for (let i = 1; i <= lastDay; i++) {
        if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }
    
    for (let j = 1; j <= nextDays; j++) {
        days += `<div id="next-month-days">${j}</div>`;
        calDays.innerHTML = days;
    }
}

// linking calender nav arrows to prev and next months 
document.querySelector('.left-arrow-cal').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

document.querySelector('.right-arrow-cal').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

renderCalendar();