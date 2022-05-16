/*--------------------------*/
/*--------------------------*/
/* SIDEBAR BUTTON OPEN/COSE */
/*--------------------------*/
/*--------------------------*/

let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
// let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", ()=> {
    sidebar.classList.toggle("open");
    menuBtnChange(); // calling the function
});

//  Changes sidebar hamburger button on click
function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); // replaces the icons class
    } else {
        closeBtn.classList.replace("bx-menu-alt-right","bx-menu"); // replaces the icons class
    }
}

/*----------------------*/
/*----------------------*/
/* FOCUS BUTTON EFFECTS */
/*----------------------*/
/*----------------------*/

let fswitchBtn = document.querySelector(".f_switch");
let focusBtn = document.querySelector("#bolt_switch");

focusBtn.addEventListener("click", ()=> {
    focusBtnChange(); // calling the function
});

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

fswitchBtn.addEventListener("click", ()=> { // Sidebar open when you click on the focus icon
    sidebar.classList.toggle("open");
    menuBtnChange(); 
});

/*--------------------------*/
/*--------------------------*/
/* TOGGLE NEW TASK CREATION */
/*--------------------------*/
/*--------------------------*/

let crTaskBtn = document.querySelector("#createTaskBtn");
let remTaskBtn = document.querySelector("#deleteTaskBtn");

let CrTask = document.querySelector(".task-wrapper");
let RemTask = document.querySelector(".create-wrapper");

crTaskBtn.addEventListener('click', ()=> {  // new task form opens up when you click on the new task button
    console.log('switch');
    switchVisible();
});

remTaskBtn.addEventListener('click', ()=> {  // new task form closes when you click delete button
    console.log('switch back');
    switchVisible();
});

/*--------------------*/
/* DASHBOARD ELEMENTS */
/*--------------------*/

let pomTimer = document.querySelector(".pom-timer");
let calBox = document.querySelector(".cal-container");
let achievements = document.querySelector(".achievements");
let musicPlayer = document.querySelector(".music-player");
let acronyms = document.querySelector(".acronyms");
let projOverviewBox = document.querySelector(".project-overview");

/*---------------------*/
/* NEW TASK ICON HOVER */
/*---------------------*/

let firstTaskBtn = document.querySelector(".first-task");
let changeCol = document.querySelector("#change-col");

firstTaskBtn.addEventListener('mouseover', function handleMouseOver() {
    changeCol.style.color = '#8E72D6';
});

firstTaskBtn.addEventListener('mouseout', function handleMouseOut() {
    changeCol.style.color = '#E6E6E6';
});

firstTaskBtn.addEventListener('click', ()=> {  // new task form opens up when you click on the new task button
    switchVisible();
});

function switchVisible() {
    if(!CrTask) return;
    if (getComputedStyle(CrTask).display == 'block') {
        CrTask.style.display = 'none';
        RemTask.style.display = 'block';

        // reduce other dashboard elements opacity when task creator is open
        pomTimer.style.opacity = '0.3', calBox.style.opacity = '0.3',
        achievements.style.opacity = '0.3', musicPlayer.style.opacity = '0.3',
        acronyms.style.opacity = '0.3', projOverviewBox.style.opacity = '0.3';
        
    } else {
        CrTask.style.display = 'block';
        RemTask.style.display = 'none';

        // retun other dashboard elements opacity to normal when task creator is closed 
        pomTimer.style.opacity = '1', calBox.style.opacity = '1', 
        achievements.style.opacity = '1', musicPlayer.style.opacity = '1',
        acronyms.style.opacity = '1', projOverviewBox.style.opacity = '1';
    }
}

/*---------------------------------*/
/*---------------------------------*/
/* STORING INPUTS IN LOCAL STORAGE */
/*---------------------------------*/
/*---------------------------------*/

let projectnamesArr = []; // Array containing each project name created

let projBtnImg = document.querySelector("#new-proj-icon"); // gets submit btn (img)
let submitProjName = document.querySelector("#saveprojectname"); // gets submit btn
let projectname = document.querySelector("#newprojsave"); // gets project name input
let projects = document.querySelector('.projects'); // gets project div
let projectLabel = document.querySelector('#new-project'); // gets project label


// let taskForm = document.querySelector(".tasks-form")

// taskForm.addEventListener("submit", function (e) {
//     e.preventDefault();
// });

submitProjName.addEventListener('click', ()=> {  // add an eventListener on form, and listen for project name submit
    checkInputName();
});

function addProjectName(item) {
    // if item is not empty
    if (item !== '') {
      // make a projectname object, which has id, name
      const projectName = {
        id: Date.now(),
        name: item,
        selected: false
      };

      // then add it to project names array
      projectnamesArr.push(projectName);
      addProjNameLocalStorage(projectnamesArr); // then renders them between <output>

       // finally clear the input box value
       projectname.value = '';
    }
}

function renderProjects(projectnamesArr) {

    projects.innerHTML = '';

    // run through each item inside project array
    projectnamesArr.forEach(function(item) {

        // checks if the item is selected or not
        const checked = item.selected ? 'checked': null;

        // make a <output> element and set attributes
        const pOutput = document.createElement('output'); // <output> </output>
        pOutput.setAttribute('class', 'item'); // <output class="item"> </output>
        pOutput.setAttribute('data-key', item.id); // <output class="item" data-key="20200708"> </output>

        if (item.selected === true) {
            pOutput.classList.add('checked');
        }

        pOutput.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        `;

        // finally add the <output> to <div>
        projects.append(pOutput);
    });
}

function addProjNameLocalStorage(projectnamesArr) {
    // convert the array to string then store it.
    localStorage.setItem('projectnamesArr', JSON.stringify(projectnamesArr));
    // render them to screen
    renderProjects(projectnamesArr);
}

// function helps to get everything from local storage
function getProjNameFromLocalStorage() {
    const pReference = localStorage.getItem('projectnamesArr');
    // if reference exists
    if (pReference) {
      // converts back to array and store it in projectnames array
      projectnamesArr = JSON.parse(pReference);
      renderProjects(projectnamesArr);
    }
}

function toggle(id) {
    projectnamesArr.forEach(function(item) {
        // use == not ===, because here types are different. One is number and other is string
        if (item.id == id) {
            // toggle the value
            item.selected = !item.selected;
        }
    });

    addProjNameLocalStorage(projectnamesArr);
}

// checks if array has reached 6 items and makes changes accordingly
function stopArray() {
    if (projectnamesArr.length === 8) {
        console.log('project array has reached max capacity ');
        projBtnImg.style.display = 'none';
    } else {
        console.log(projectnamesArr.length);
        projBtnImg.style.display = 'block';
    }
}

// initially get everything from localStorage
getProjNameFromLocalStorage();

// removes project name submit btn when no. of projects equal 6 
stopArray();

projects.addEventListener('click', (event)=> {
    // check if the event is on the checkbox
    if (event.target.type === 'checkbox') {
      // toggle the state
      toggle(event.target.parentElement.getAttribute('data-key'));
      console.log(event.target.parentElement.getAttribute('data-key'));
    }
});

function checkInputName () {
    if (projectnamesArr.length > 0 ) {
        projectnamesArr.forEach(function(item) {

            if (projectname.value == item.name) {
                console.log(projectname.value + " is already used in project selection as " + item.name);
                projectname.value = ''; // clears input box
                // projectLabel.style.color = 'red'; // alerts user of an error
                return;
            }
            
            if (projectname.value != item.name) {
                console.log('new product name');
                addProjectName(projectname.value); // call addprojectname function with input box current value
            }
        });
    } else if (projectnamesArr.length === 0 ) {
        addProjectName(projectname.value); // call addprojectname function with input box current value
    }
}


// console log project names array
console.log(projectnamesArr);
console.log(localStorage.getItem('projectnamesArr'));

//localStorage.clear();


/*-----------------*/
/*-----------------*/
/* TOP NAVBAR DATE */
/*-----------------*/
/*-----------------*/

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
    "Sunday",
    "Monday",
    "Tuesday", 
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
][topDate.getDay()];

// Setting Top Navbar Current Date (Custom Display)
currDay.innerHTML = cWDay + ", ";
currDate.innerHTML = topDate.getDate() + " " + cMonth + " " + topDate.getFullYear(); 

/*--------------------*/
/*--------------------*/
/* DASHBOARD CALENDER */
/*--------------------*/
/*--------------------*/

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