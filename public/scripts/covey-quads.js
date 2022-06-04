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

/*--------------------------*/
/*--------------------------*/
/* SIDEBAR BUTTON OPEN/COSE */
/*--------------------------*/
/*--------------------------*/

/*-----------------*/
/* INITIATING HTML */
/*-----------------*/

let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
// let searchBtn = document.querySelector(".bx-search");

/*-----------------*/
/* EVENT LISTENERS */
/*-----------------*/

closeBtn.addEventListener("click", ()=> {
    sidebar.classList.toggle("open");
    menuBtnChange(); // calling the function
});

/*--------------------------*/
/* CHANGE MENU ~ OPEN/CLOSE */
/*--------------------------*/

//  Changes sidebar hamburger button on click
function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); // replaces the icons class
    } else {
        closeBtn.classList.replace("bx-menu-alt-right","bx-menu"); // replaces the icons class
    }
}

/*--------------------------*/
/*--------------------------*/
/* FOCUS MODE INFO + EFFECT */
/*--------------------------*/
/*--------------------------*/

/*-----------------*/
/* INITIATING HTML */
/*-----------------*/

let fswitchBtn = document.querySelector(".f_switch"); // sidenavbar icon
let focusModeBtn = document.querySelector("#toggleFocusMode"); // topnavbar icon

let focusNotActive = document.querySelector("#focusNotActive");
let focusActive = document.querySelector("#focusActive");

/*-----------------*/
/* EVENT LISTENERS */
/*-----------------*/

// focus switch button == lightning icon in the sidebar
fswitchBtn.addEventListener("click", ()=> { 
    sidebar.classList.toggle("open"); 
    menuBtnChange(); // open sidebar onClick
});

// focus button == lightning icon in top navbar
focusModeBtn.addEventListener('click', ()=> {
    toggleFocusMode(); 
});

/*------------------------------------------*/
/*------------------------------------------*/
/* LOAD IN PROJECT ARRAY FROM LOCAL STORAGE */
/*------------------------------------------*/
/*------------------------------------------*/

let projDatabase = [];

// get quadrant outputs

let quadOne = document.querySelector('#quad-one-output');
let quadTwo = document.querySelector('#quad-two-output');
let quadThree = document.querySelector('#quad-three-output');
let quadFour = document.querySelector('#quad-four-output');

// get database from localstorage on window load

window.onload = function() {
    const projectArrReference = localStorage.getItem('projects');

    if (projectArrReference) {
        projDatabase = JSON.parse(projectArrReference);
        console.log('Project Database:', projDatabase);

        renderLoadingQuadItems();

        // wait 2 seconds then render database tasks to covey quadrants
        window.setTimeout(() => {
            renderCoveyQuads();
        }, 2000);

    } else {
        console.log('Error: Project Database Does Not Exist In Local Storage.');
        return false;
    }
}

/*-----------------*/
/*-----------------*/
/* COVEY QUADRANTS */
/*-----------------*/
/*-----------------*/

function renderCoveyQuads() {

    // check database has atleast 1 entry
    if (projDatabase.length > 0) {

        // log project entries in database 
        console.log('Database Found:', projDatabase.length, 'Projects');

        // clear quadrant content
        quadOne.innerHTML = '';
        quadTwo.innerHTML = '';
        quadThree.innerHTML = '';
        quadFour.innerHTML = '';

        // declare variable to search project database
        let searchProjDatabase;

        // search database for projects
        searchProjDatabase = projDatabase.forEach((project) => {

            if (project.tasks.length > 0) {

                // log each project and its respective tasks 
                console.log(project.name, 'Project:', project.tasks.length, 'tasks');

                // search tasks for their priorities and due dates
                project.tasks.forEach(function(task) {

                    // calc amount of time between today's date & each task's due date
                    let todaysDate = new Date();
                    let taskDueDate = new Date(task.date);
                    let differenceInTime = taskDueDate.getTime() - todaysDate.getTime();

                    // calculate days left to the nearest whole number
                    let DaysLeftToComplete = Math.round(differenceInTime / (1000 * 3600 * 24));

                    // Organises quadrants based on priorty and days left to complete task
                    if (task.priority == 'High' || task.priority == 'Medium') {

                        // QUAD ONE TASKS

                        if (task.priority == 'High' && DaysLeftToComplete < 3) {
                            // console.log('Quad 1 Task ~', 'Priority:', task.priority, 'Days Left To Complete:', DaysLeftToComplete, 'Status:', task.completed);

                            const quadOneItem = document.createElement('li');
                            quadOneItem.setAttribute('class', 'quadTaskItem');

                            if (task.completed === true) {
                                quadOneItem.classList.add('completedItem');
                            }

                            quadOneItem.innerHTML = `
                            <h4 class="quad-task-name">· ${task.name}</h4>
                            <h4 class="quad-due-date">${task.date}</h4>
                            `;

                            quadOne.append(quadOneItem);
                        }

                        // QUAD TWO TASKS

                        if ((task.priority == 'High' && DaysLeftToComplete > 3) || (task.priority == 'Medium' && DaysLeftToComplete < 3)) {
                            // console.log('Quad 2 Task ~', 'Priority:', task.priority, 'Days Left To Complete:', DaysLeftToComplete, 'Status:', task.completed);

                            const quadTwoItem = document.createElement('li');
                            quadTwoItem.setAttribute('class', 'quadTaskItem');

                            if (task.completed === true) {
                                quadTwoItem.classList.add('completedItem');
                            }

                            quadTwoItem.innerHTML = `
                            <h4 class="quad-task-name">· ${task.name}</h4>
                            <h4 class="quad-due-date">${task.date}</h4>
                            `;

                            quadTwo.append(quadTwoItem);
                        }
                    }

                    if (task.priority == 'Medium' || task.priority == 'Low') {

                        // QUAD THREE TASKS

                        if ((task.priority == 'Medium' && DaysLeftToComplete > 3) || (task.priority == 'Low' && DaysLeftToComplete < 3)) {
                            // console.log('Quad 3 Task ~', 'Priority:', task.priority, 'Days Left To Complete:', DaysLeftToComplete, 'Status:', task.completed);

                            const quadThreeItem = document.createElement('li');
                            quadThreeItem.setAttribute('class', 'quadTaskItem');

                            if (task.completed === true) {
                                quadThreeItem.classList.add('completedItem');
                            }

                            quadThreeItem.innerHTML = `
                            <h4 class="quad-task-name">· ${task.name}</h4>
                            <h4 class="quad-due-date">${task.date}</h4>
                            `;

                            quadThree.append(quadThreeItem);
                        }

                        // QUAD FOUR TASKS

                        if (task.priority == 'Low' && DaysLeftToComplete > 3) {
                            // console.log('Quad 4 Task ~', 'Priority:', task.priority, 'Days Left To Complete:', DaysLeftToComplete, 'Status:', task.completed);

                            const quadFourItem = document.createElement('li');
                            quadFourItem.setAttribute('class', 'quadTaskItem');

                            if (task.completed === true) {
                                quadFourItem.classList.add('completedItem');
                            }

                            quadFourItem.innerHTML = `
                            <h4 class="quad-task-name">· ${task.name}</h4>
                            <h4 class="quad-due-date">${task.date}</h4>
                            `;

                            quadFour.append(quadFourItem);
                        }
                    }
                });

            } else {
                console.log('Error: Database Has Found', project.tasks.length, 'Task Entries.');
                return false;
            }
        });

    } else {
        console.log('Error: Database Has Found', projDatabase.length, 'Project Entries.');
        return false;
    }
}

function renderLoadingQuadItems() {
    // render default loading items
    quadOne.innerHTML = '';
    quadTwo.innerHTML = '';
    quadThree.innerHTML = '';
    quadFour.innerHTML = '';

    // render loading covey quads display
    for (let i = 0; i < 7; i++) {
        const defaultItem = document.createElement('div');
        defaultItem.setAttribute('class', 'defaultLoadingItem'); 

        // append each quad with default items
        quadOne.append(defaultItem);
    }

    for (let i = 0; i < 7; i++) {
        const defaultItem = document.createElement('div');
        defaultItem.setAttribute('class', 'defaultLoadingItem'); 

        // append each quad with default items
        quadTwo.append(defaultItem);
    }

    for (let i = 0; i < 7; i++) {
        const defaultItem = document.createElement('div');
        defaultItem.setAttribute('class', 'defaultLoadingItem'); 

        // append each quad with default items
        quadThree.append(defaultItem);
    }

    for (let i = 0; i < 7; i++) {
        const defaultItem = document.createElement('div');
        defaultItem.setAttribute('class', 'defaultLoadingItem'); 

        // append each quad with default items
        quadFour.append(defaultItem);
    }
}
