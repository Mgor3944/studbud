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

/*------------------------------------------*/
/*------------------------------------------*/
/* LOAD IN PROJECT ARRAY FROM LOCAL STORAGE */
/*------------------------------------------*/
/*------------------------------------------*/

let projDatabase = [];
let selOverviewProject = [];

window.onload = function() {

    // get database from localstorage on window load
    const projectArrReference = localStorage.getItem('projects');

    // get selected overview project from localstorage on window load
    const storedOverviewProject = localStorage.getItem('storedProjSel');

    // render loading display for covey quads
    renderLoadingQuadItems();

    // if reference to database exists
    if (projectArrReference) {
        projDatabase = JSON.parse(projectArrReference);
        console.log('Project Database:', projDatabase);

        // render tasks to complete to screen
        renderSimpleTaskList();

        // wait 2 seconds then render database tasks to covey quadrants
        window.setTimeout(() => {
            renderCoveyQuads();
        }, 2000);

    } else {
        console.log('Error: Project Database Does Not Exist In Local Storage.');
        return false;
    }

    // if reference to selected overview project exists
    if (storedOverviewProject) {
        selOverviewProject = storedOverviewProject;
        renderSelOverviewProjectStats();
        
    } else {
        console.log('Error: No Overview Project Has Been Selected');
        document.querySelector('.proj-stats-container').style.opacity = '0.5'; 
        return false;
    }

}

/*-----------------*/
/*-----------------*/
/* COVEY QUADRANTS */
/*-----------------*/
/*-----------------*/

// get quadrant outputs
let quadOne = document.querySelector('#quad-one-output');
let quadTwo = document.querySelector('#quad-two-output');
let quadThree = document.querySelector('#quad-three-output');
let quadFour = document.querySelector('#quad-four-output');

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
                console.log('Error:', project.name, 'Project Has Returned', project.tasks.length, 'Task Entries.');
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

/*------------------*/
/*------------------*/
/* SIMPLE TASK LIST */
/*------------------*/
/*------------------*/

let simpleTaskOutput = document.querySelector('.task-list-output');

function renderSimpleTaskList() {

    // check database has atleast 1 entry
    if (projDatabase.length > 0) {

        // clear task list content
        simpleTaskOutput.innerHTML = '';

        // declare variable to search project database again
        let searchProjDatabaseAgain;

        // search database for projects
        searchProjDatabaseAgain = projDatabase.forEach((project) => {

            if (project.tasks.length > 0) {

                // search tasks for their name, priority & days left to complete
                project.tasks.forEach(function(task) {

                    // re-calculate days left to complete for each task
                    let reTodaysDate = new Date();
                    let retaskDueDate = new Date(task.date);
                    let redifferenceInTime = retaskDueDate.getTime() - reTodaysDate.getTime();
                    let reDaysLeftToComplete = Math.round(redifferenceInTime / (1000 * 3600 * 24));

                    // create task items and render to output <ul>
                    const simpleTaskItem = document.createElement('li');
                    simpleTaskItem.setAttribute('class', 'simpleTaskItem');
                    simpleTaskItem.setAttribute('data-key', task.id);

                    if (task.completed === true) {
                        simpleTaskItem.classList.add('completed');
                    }

                    if (task.priority == 'High') {
                        simpleTaskItem.classList.add('highPriority');
                    }
                    
                    if (task.priority == 'Medium') {
                        simpleTaskItem.classList.add('medPriority');
                    }

                    if (task.priority == 'Low') {
                        simpleTaskItem.classList.add('lowPriority');
                    }

                    if (reDaysLeftToComplete < 0) {
                        simpleTaskItem.innerHTML = `
                        <h4 class="simple-task-name">${task.name}</h4>
                        <div class="simple-task-priority">
                            <h4 class="priority-text">${task.priority}</h4>
                        </div>
                        <h4 class="simple-task-days-left">Task Overdue</h4>
                        `;
                    } else {
                        simpleTaskItem.innerHTML = `
                        <h4 class="simple-task-name">${task.name}</h4>
                        <div class="simple-task-priority">
                            <h4 class="priority-text">${task.priority}</h4>
                        </div>
                        <h4 class="simple-task-days-left">Days Left: ${reDaysLeftToComplete}</h4>
                        `;
                    }

                    simpleTaskOutput.append(simpleTaskItem);

                });

            } else {
                console.log('Error:', project.name, 'Project Has Returned', project.tasks.length, 'Task Entries.');
                return false;
            }
        });

    } else {
        console.log('Error: Database Has Found', projDatabase.length, 'Project Entries.');
        return false;
    }
}

/*------------------------*/
/*------------------------*/
/* PROJECT OVERVIEW STATS */
/*------------------------*/
/*------------------------*/

// render selected Overview Project Stats
function renderSelOverviewProjectStats() {

    // confirm selected overview project value is not null 
    if (selOverviewProject !== null) {

        // search database for projects
        projDatabase.forEach((project) => {

            // find which project ID matches the selected ID in the Database
            if (selOverviewProject == project.id) {

                /*--------------------------------------------*/
                /* APPEND HEADING TEXT IF PROJECT IS SELECTED */
                /*--------------------------------------------*/

                // log selected overview project ID & Name
                console.log('Overview Project Found ~ ID', project.id, '~ Name:', project.name, '~ Colour:', project.color);

                // clear current project overview heading text
                document.querySelector('.projectHeading').innerHTML = '';

                // update heading with selected project name & colour
                document.querySelector('.projectHeading').innerHTML = `
                <h4 class="heading-text"><span class="selProjectCol col-${project.color}">${project.name}</span> | Project Insights </h4>
                `;

                /*----------------------------------*/
                /* CALC PROJECT COMPLETION PROGRESS */
                /*----------------------------------*/

                // calculate number of tasks completed in selected project
                let totalNumberOfTasks = project.tasks.length;
                let numberOfCompletedTasks = 0;

                // declare determine bar height & text value (%) 
                let completionPercentText = document.querySelector('.completion-percent-text');
                let completionPercentageCounter = 0;

                // calculate number of completed tasks
                project.tasks.forEach(function(task) {
                    if (task.completed === true) {
                        numberOfCompletedTasks = numberOfCompletedTasks + 1;
                    }
                });

                // declare progress bar height based on above calc
                let progressBarHeight = Math.round(((numberOfCompletedTasks / totalNumberOfTasks) * 100));

                // if there are completed tasks in project animate bar
                if (numberOfCompletedTasks > 0) {

                    // declare animation bar interval
                    let progressRateCalc = setInterval(bar, 25);

                    // animate completion bar
                    function bar() {
                        if (completionPercentageCounter >= 100) {
                            clearInterval(progressRateCalc);
    
                        } else if (completionPercentageCounter == progressBarHeight) {
                            clearInterval(progressRateCalc);
    
                        } else {
                            completionPercentageCounter++;
                            document.querySelector('#completionRateBar').style.height = progressBarHeight + '%';
                            completionPercentText.innerHTML = `${completionPercentageCounter}%`;
                        } 
                    }

                } 
                
                // else {
                //     console.log('Error: Cannot Animate Completion Bar As Their Are', numberOfCompletedTasks, 'Tasks');
                //     return false;
                // }

                /*----------------------------------------------*/
                /* CALC NUMBER OF DAYS LEFT TO COMPLETE PROJECT */
                /*----------------------------------------------*/

                let todays_Date = new Date();
                let currentYear = new Date().getFullYear();
                let projectDueDate = new Date(`${project.due} ${currentYear}`);

                let timeLeft = projectDueDate.getTime() - todays_Date.getTime();
                let daysLeft = Math.round(timeLeft / (1000 * 3600 * 24));

                if (daysLeft < 0) {
                    daysLeft = 0;
                } else {
                    daysLeft = daysLeft;
                }
                
                let dueDateBarHeight = 100 - daysLeft;

                // declare determine bar height & text value (%) 
                let dueDaysPercentText = document.querySelector('.days-left-text');
                let dueDaysCounter = 100;
                let daysLeftCalc = setInterval(bar2, 10);

                function bar2() {
                    if (daysLeft > 95) {
                        if (dueDaysCounter <= 0) {
                            clearInterval(daysLeftCalc);
    
                        } else if (dueDaysCounter == daysLeft) {
                            clearInterval(daysLeftCalc);
    
                        } else {
                            dueDaysCounter--;
                            document.querySelector('#dueDateBar').style.height = dueDateBarHeight + '%';
                            dueDaysPercentText.innerHTML = `95+ Days Left`;
                        } 
                    } else {
                        if (dueDaysCounter <= 0) {
                            clearInterval(daysLeftCalc);
    
                        } else if (dueDaysCounter == daysLeft) {
                            clearInterval(daysLeftCalc);
    
                        } else {
                            dueDaysCounter--;
                            document.querySelector('#dueDateBar').style.height = dueDateBarHeight + '%';
                            dueDaysPercentText.innerHTML = `${dueDaysCounter} Days Left`;
                        } 
                    }
                }
            }
        });

    } else {
        console.log('Error: Selected Overview Project returned Null');
        return false;
    }
}