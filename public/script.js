// let width,height;
// window.onresize = window.onload = function() {
//     width = this.innerWidth;
//     height = this.innerHeight;
//     console.log(width + 'x' + height);
// }

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

/*------------------------*/
/*------------------------*/
/* TOGGLE LIGHT/DARK MODE */
/*------------------------*/
/*------------------------*/

document.documentElement.setAttribute('data-theme', 'dark');
document.documentElement.setAttribute('data-theme', 'light');

/*-----------------------------*/
/* COLOUR PALLETE (LIGHT/DARK) */
/*-----------------------------*/

// focusBtn.addEventListener('change', focusBtnChange, false);

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

/*-------------------*/
/* TOGGLE FOCUS MODE */
/*-------------------*/

//  Toggles focus mode on/off - changing icon design
function toggleFocusMode() {
    if(!focusNotActive) return;
    if (getComputedStyle(focusNotActive).display == 'block') {
        focusNotActive.style.display = 'none';
        focusActive.style.display = 'block';

        document.querySelector(".ach-container").style.opacity = '0.2'; // achievments
        document.querySelector(".acr-wrapper").style.opacity = '0.2'; // acronyms

        document.querySelector(".completionBarBox").style.opacity = '0.2'; // project overview completion bar
        document.querySelectorAll('.isCompleted').forEach((item) => { item.style.opacity = '0.2'; }); // project overview tasks completed
        document.querySelectorAll('.isNotCompleted').forEach((item) => { item.style.opacity = '1'; }); // project overview tasks not completed

        document.querySelectorAll('.timeFromTask').forEach((item) => { item.style.opacity = '0.2'; }); // tasklist estimate time
        document.querySelectorAll('#delTaskImg').forEach((item) => { item.style.opacity = '0.2'; }); // tasklist del btn

        document.querySelectorAll('.days > div').forEach((item) => { item.style.opacity = '0.3'; }); // calender all days
        document.querySelectorAll('#prev-month-days').forEach((item) => { item.style.opacity = '0.15'; }); // calender prev month days
        document.querySelectorAll('#next-month-days').forEach((item) => { item.style.opacity = '0.15'; }); // calender next month days
        document.querySelector(".today").style.opacity = '1'; // reActivates today's date style

    } else {
        focusNotActive.style.display = 'block';
        focusActive.style.display = 'none';

        // toggle achievments & acronym states
        document.querySelector(".ach-container").style.opacity = '1';
        document.querySelector(".acr-wrapper").style.opacity = '1';

        // toggle project overview states
        document.querySelector(".completionBarBox").style.opacity = '1';
        document.querySelectorAll('.isCompleted').forEach((item) => { item.style.opacity = '1'; });
        document.querySelectorAll('.isNotCompleted').forEach((item) => { item.style.opacity = '0.5'; });

        // toggle tasklist states
        document.querySelectorAll('.timeFromTask').forEach((item) => { item.style.opacity = '1'; });
        document.querySelectorAll('#delTaskImg').forEach((item) => { item.style.opacity = '1'; });

        // toggle calender states
        document.querySelectorAll('.days > div').forEach((item) => { item.style.opacity = '1'; });
        document.querySelectorAll('#prev-month-days').forEach((item) => { item.style.opacity = '0.35'; });
        document.querySelectorAll('#next-month-days').forEach((item) => { item.style.opacity = '0.35'; });
    }
}

/*------------------------------------------*/
/*------------------------------------------*/
/* TOGGLE TASKLIST DISPLAYS, BUTTONS, ICONS */
/*------------------------------------------*/
/*------------------------------------------*/

/*----------------*/
/* INTIATING HTML */
/*----------------*/

// getting dashboard elements
let pomstopTimer = document.querySelector(".timers");
let calBox = document.querySelector(".cal-container");
let achievements = document.querySelector(".achievements");
let musicPlayer = document.querySelector(".music-player");
let acronyms = document.querySelector(".acronyms");
let projOverviewBox = document.querySelector(".project-overview");

// getting initial create new task icon (big plus icon)
let firstTaskBtn = document.querySelector(".first-task");
let changeCol = document.querySelector("#change-col");

// getting active tasklist + taskform buttons
let crNewTaskBtn = document.querySelector("#crNewTaskBtn"); // taskList (state = active) 'create new task' button
let remTaskBtn = document.querySelector("#deleteTaskBtn"); // taskList (modee = create) 'del task' button

let CrTask = document.querySelector(".task-wrapper"); // taskList wrapper
let RemTask = document.querySelector(".create-wrapper"); // taskForm wrapper

/*--------------------------------*/
/* EVENT LISTENERS - PRE TASKLIST */
/*--------------------------------*/

// hover effect on icon
firstTaskBtn.addEventListener('mouseover', function handleMouseOver() {
    changeCol.style.color = '#8E72D6';
});

firstTaskBtn.addEventListener('mouseout', function handleMouseOut() {
    changeCol.style.color = '#E6E6E6';
});

// display task form onClick & hide initial tasklist display
firstTaskBtn.addEventListener('click', ()=> { 
    switchVisible();
});

/*---------------------------------*/
/* EVENT LISTENERS - POST TASKLIST */
/*---------------------------------*/

// display task form onClick & hide tasklist display
crNewTaskBtn.addEventListener('click', ()=> { // open tasklist (mode = create)
    switchVisible();
}); 

remTaskBtn.addEventListener('click', ()=> {  // close tasklist (mode = create)
    switchVisible();
});

/*---------------------------*/
/* TOGGLE TASK LIST DISPLAYS */
/*---------------------------*/

// toggle taskList displays depending on form entry condition
function switchVisible() {
    if(!CrTask) return;
    if (getComputedStyle(CrTask).display == 'block') {
        CrTask.style.display = 'none';
        RemTask.style.display = 'block';

        // reduce other dashboard elements opacity when taskList (mode = create) is open
        pomstopTimer.style.opacity = '0.3', calBox.style.opacity = '0.3',
        achievements.style.opacity = '0.3', musicPlayer.style.opacity = '0.3',
        acronyms.style.opacity = '0.3', projOverviewBox.style.opacity = '0.3';

        pomstopTimer.style.pointerEvents = 'none', calBox.style.pointerEvents = 'none',
        achievements.style.pointerEvents = 'none', musicPlayer.style.pointerEvents = 'none',
        acronyms.style.pointerEvents = 'none', projOverviewBox.style.pointerEvents = 'none';

        document.querySelector('.stopwatch-play').style.pointerEvents = 'none';
        document.querySelector('.pom-play').style.pointerEvents = 'none';

        document.querySelector('.preSetSongs').style.overflow = 'hidden';
        document.querySelector('.acronymDisplay').style.overflow = 'hidden';
        
    } else {
        CrTask.style.display = 'block';
        RemTask.style.display = 'none';

        // retun other dashboard elements opacity to normal when taskList (mode = create) is closed 
        pomstopTimer.style.opacity = '1', calBox.style.opacity = '1', 
        achievements.style.opacity = '1', musicPlayer.style.opacity = '1',
        acronyms.style.opacity = '1', projOverviewBox.style.opacity = '1';

        pomstopTimer.style.pointerEvents = 'all', calBox.style.pointerEvents = 'all',
        achievements.style.pointerEvents = 'all', musicPlayer.style.pointerEvents = 'all',
        acronyms.style.pointerEvents = 'all', projOverviewBox.style.pointerEvents = 'all';

        document.querySelector('.stopwatch-play').style.pointerEvents = 'all';
        document.querySelector('.pom-play').style.pointerEvents = 'all';

        document.querySelector('.preSetSongs').style.overflow = 'auto';
        document.querySelector('.acronymDisplay').style.overflow = 'auto';
    }
}

/*--------------------------------------------------------*/
/*--------------------------------------------------------*/
/* PROJECT ARRAY & PROJECT NAME INPUT ~ STORING/RENDERING */
/*--------------------------------------------------------*/
/*--------------------------------------------------------*/

/*

Projects Data model:
- All projects are stored in an array called projects, which is stored in localStorage as localStorage.getItem('projects').
- This is synched with the variable allProjects on pageload/change
- data is in the following format:
[
	{
		"name": "Project 1 Name",
		"due": "Sat Dec 17 2022 03:24:00 GMT+1100 (Australian Eastern Daylight Time)",
		"id": "274298357235",
		"tasks": [
			{
				"id": "3583289523",
				"name": "Task 1 Name", // this is equal to "project 1 task 1"
				"due": "Task 1 Due Date",
				"priority": "Task 1 Priority",
				"estimate": "Task 1 Completion Time",
                "project": "Parent Project Name",
				"completed": false,
			},
			...
		]
	},
	...
]

*/

let projects = []; // Project Array ~ READ DATA MODEL ABOVE
let colArray = ['skips', 'blue', 'purple', 'green', 'red', 'orange', 'pink'];

/*---------------------*/
/* DECLARING VARIABLES */
/*---------------------*/

let selectedValue;
let projectDueDate = null;

/*-----------------*/
/* INITIATING HTML */
/*-----------------*/

let projectSubmitBtn = document.querySelector("#saveprojectname"); // gets project submit btn
let projectInput = document.querySelector("#newprojsave"); // gets project name input

let projBtnImg = document.querySelector("#new-proj-icon"); // gets project input btn icon
let projectLabel = document.querySelector('#new-project'); // gets project label

let outputProjects = document.querySelector('.projects'); // gets project output div

/*-----------------*/
/* EVENT LISTENERS */
/*-----------------*/

// add an eventListener on btn click, and listen for project name submit
projectSubmitBtn.addEventListener('click', ()=> { 
    checkInputName();
});

/*-------------------------*/
/* MAP COLOURS TO PROJECTS */
/*-------------------------*/

// colour counter using colour array
function increaseProjectVal() {
    let colValue = localStorage.getItem('projectValue');
    if (colValue === null) {
        colValue = 1;
    } else {
        colValue++;
    }
    selectedValue = colArray[colValue];
    console.log(colValue);
    localStorage.setItem('projectValue', colValue);
}

/*---------------------------*/
/* ADD PROJECT NAME TO ARRAY */
/*---------------------------*/

function addProjectName(item) {
    increaseProjectVal();
    // if item is not empty
    if (item !== '') {

        // make a projectname object, which has id, name
        const project = {
		    name: item,
            color: selectedValue,
            id: Date.now(),
            due: projectDueDate,
		    tasks: []
         };

        // then add it to project names array
        projects.push(project);
        addProjectsToLocalStorage(projects); // then renders them between <output>

        // finally clear the input box value
        projectInput.value = '';
    }
}

/*--------------------------------*/
/* RENDER PROJECT NAMES TO SCREEN */
/*--------------------------------*/

function renderProjects(projects) {
    outputProjects.innerHTML = '';

    // run through each item inside project array
    projects.forEach(function(item) {

        // make a <div> element and set attributes
        const pOutput = document.createElement('div'); // <div> </div>
        pOutput.setAttribute('class', 'item'); // <div class="item"> </div>
        pOutput.setAttribute('title', item.name); // <div class="item" title="name"> </div>
        pOutput.setAttribute('data-key', item.id); // <div class="item" data-key="20200708"> </div>

		// create html elements inside above div
        pOutput.innerHTML = `
        <input type="radio" class="projcheckbox" id="${item.id}"  name="project-radio" parentname="${item.name}" color="${item.color}">
        <label class="hiddenbox" for="${item.id}">${item.name}</label>
        `;

        // finally add the <div> to <parentDiv>
        outputProjects.append(pOutput);
    });
}

/*-----------------------------------*/
/* ADD PROJECT ARRAY TO LOCALSTORAGE */
/*-----------------------------------*/

function addProjectsToLocalStorage(projects) {
    // convert the array to string then store it.
    localStorage.setItem('projects', JSON.stringify(projects));

    // render array to screen
    renderProjects(projects);

    // when a new project is added, update project overview dropdown
    window.setTimeout(() => {
        updateProjectDropDown();
    }, 2000);
}

/*-------------------------------------*/
/* GET PROJECT ARRAY FROM LOCALSTORAGE */
/*-------------------------------------*/

function getProjectsFromLocalStorage() {
    const pReference = localStorage.getItem('projects');
    // if reference exists
    if (pReference) {
      // converts back to array and store it in project array
      projects = JSON.parse(pReference);
      renderProjects(projects);
    }
}

// get everything initially from local storage
getProjectsFromLocalStorage();

/*-----------------------------------------*/
/* STOP RECIEVING PROJECT INPUTS AFTER SIX */
/*-----------------------------------------*/

// disable project name submit btn until project array has 6 or less items
function stopArray() {
    if (projects.length === 6) {
        projBtnImg.style.display = 'none';
    } else {
        console.log(projects.length);
        projBtnImg.style.display = 'block';
    }
}

stopArray();

/*--------------------------------*/
/* CHECK PROJECT INPUT CONDITIONS */
/*--------------------------------*/

function checkInputName() {

	// if array 1 or more entries check various conditions
    if (projects.length > 0 ) { 
        let hasMatch = false;

		// iterate through array and check if user input is already in array
        projects.forEach(function(item) {
            if (item.name == projectInput.value) {
                hasMatch = true;
				console.log(projectInput.value, 'already exists in database as ', item.name)
            }
        });

		// project name already exists == alert user
        if(hasMatch) { 
            projectInput.value = '';
            projectLabel.style.color = 'tomato'; // change label colour to red = alert
        } 

		// project name doesn't exist == safe to add
		else {
			console.log(projectInput.value, 'can be added to database');
		  	projectLabel.style.color = '#dbdbdb'; // change label back to normal = safe
          	addProjectName(projectInput.value); 
        }
    } 
	
	// project array has no entries so any name can be entered
	else {
        console.log(projectInput.value + ' is the first project');
        addProjectName(projectInput.value);
    }
}

/*--------------------------------------*/
/*--------------------------------------*/
/* TASKLIST DISPLAY ~ STORING/RENDERING */
/*--------------------------------------*/
/*--------------------------------------*/

/*-----------------*/
/* INITIATING HTML */
/*-----------------*/

let taskForm = document.querySelector('.tasks-form');  // form 

let taskName = document.getElementById('taskNameInput');  // task name input
let taskDueDate = document.getElementById('duedate');  // task due date input
let taskPriority = document.getElementById('p-measure');  // task priority value
let taskEstimate = document.getElementById('completetime');  // task priority input

let taskItemOutput = document.querySelector(".taskListOutput"); // task list output div

/*-----------------*/
/* EVENT LISTENERS */
/*-----------------*/

taskForm.addEventListener('submit', function(e) {  // add an eventListener on button click
    e.preventDefault();
    checkFormData();
});

/*----------------------*/
/* CHECKING FORM INPUTS */
/*----------------------*/

function checkFormData() {
    // sets formValid flag to false
    let formValid = false;
    console.log(formValid);

    let selectedProject = document.querySelector('.projcheckbox:checked'); // get selected project

    // check form is properly filled out
    if ( (taskName.value === '') || (taskName.value.trim().length == 0) || 
    (taskDueDate.value === '') || (taskDueDate.value.trim().length == 0) ||
    (taskPriority.value === '') || (taskPriority.value.trim().length == 0) ||
    (taskEstimate.value === '') || (taskEstimate.value.trim().length == 0) ||
    (selectedProject == null)) {

        alert('please fill out required fields!'); 

        // checking task name input
        if (taskName.value === '' || taskName.value.trim().length == 0) {
            console.log('No task name inputed'); 
            document.querySelector('#task-name').style.color = 'tomato';
        } else {
            document.querySelector('#task-name').style.color = '#dbdbdb';
        }

        // checking task due date input
        if (taskDueDate.value === '' || taskDueDate.value.trim().length == 0) {
            console.log('No due date selected'); 
            document.querySelector('#dueLabel').style.color = 'tomato';
        } else {
            document.querySelector('#dueLabel').style.color = '#dbdbdb';
        }

        // checking task priority input
        if (taskPriority.value === '' || taskPriority.value.trim().length == 0) {
            console.log('No priority selected'); 
            document.querySelector('#priorityLabel').style.color = 'tomato';
        } else {
            document.querySelector('#priorityLabel').style.color = '#dbdbdb';
        }
        
        // checking task completion time input
        if (taskEstimate.value === '' || taskEstimate.value.trim().length == 0) {
            console.log('No completion time inputed'); 
            document.querySelector('#estimateLabel').style.color = 'tomato';
        } else {
            document.querySelector('#estimateLabel').style.color = '#dbdbdb';
        }

        // checking project selection input
        if (projects.length < 1) {
            console.log('no projects exist');
            projectLabel.style.color = 'tomato';

        } else {
            console.log('project database exists');
            projectLabel.style.color = '#dbdbdb';

            if (selectedProject == null) {
                console.log('no project selected'); 
                document.querySelector('#projectLabel').style.color = 'tomato';
            } else {
                document.querySelector('#projectLabel').style.color = '#dbdbdb';
            }
        }

        return false;

    } else { // form can be submitted
        formValid = true;
        console.log(formValid);

        /*-----------------*/
        /* CONVERT DUEDATE */
        /*-----------------*/

        // declare custom month values
        let customMonthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; 
        // slice duedate input into days, month, year 
        let dateInputDays = taskDueDate.value.slice(8, 10);
        let dateInputMonth = taskDueDate.value.slice(5, 7);
        let dateInputYear = taskDueDate.value.slice(0, 4);
        // if month value is less than 10 cut the front zero off
        if (dateInputMonth < 10) { dateInputMonth = taskDueDate.value.slice(6, 7); }
        // find custom month val equal to duedateinput month val
        let convertedMonth = customMonthsArr[dateInputMonth-1];
        // concantinate new due date
        let newDueDate = dateInputDays + ' ' + convertedMonth + ' ' + dateInputYear; 

        /*-----------------------------------*/
        /* DEFINE SELECTED PROJECT VARIABLES */
        /*-----------------------------------*/

        let projectID = selectedProject.id; // gets project name id
        let projectName = selectedProject.getAttribute('parentname');
        let projectCol = selectedProject.getAttribute('color');

        /*--------------*/
        /* LOG NEW TASK */
        /*--------------*/

        // console logs
        console.log('Task Name: ' + taskName.value);
        console.log('Due Date: ' + newDueDate);
        console.log('Priority: ' + taskPriority.value);
        console.log('Completion Time: ' + taskEstimate.value);
        console.log('Project ID: ' + projectID);
        console.log('Project Name: ' + projectName);
        console.log('Project Colour: ' + projectCol);

        /*---------------------*/
        /* DECLARE TASK OBJECT */
        /*---------------------*/

        // make a task object
        const newTask = {
            id: Date.now(),
            name: taskName.value,
            date: newDueDate,
            priority: taskPriority.value,
            estimate: taskEstimate.value,
            project: projectName,
            color: projectCol,
            completed: false
        };

        /*----------------------------*/
        /* SWITCH DISPLAYS & ADD TASK */
        /*----------------------------*/

        switchVisible();
        addNewTask(projectID, newTask);
    }
}

/*-------------------------------*/
/* ADD NEW TASK TO PROJECT ARRAY */
/*-------------------------------*/

function addNewTask(projectID, task) {
    // gets selected project from array, finds the task array and adds new task to it
    let matchedProject = projects.find(project=> project.id == projectID);
    console.log(matchedProject);
    matchedProject.tasks.push(task);

    //renders projects to div
    addTasksToLocalStorageArray(matchedProject);

    // finally clear the form values
    taskName.value = '';
    taskDueDate.value = '';
    taskPriority.value = '';
    taskEstimate.value = '';
    document.querySelector('.projcheckbox:checked').checked = false;
}

/*-----------------------*/
/* RENDER TASK TO SCREEN */
/*-----------------------*/

function renderTasks() {

    // clear taskItem input
    taskItemOutput.innerHTML = '';

    let renderTaskItem;

    // run through each item inside project's tasklist array
    renderTaskItem = projects.forEach((project) => {
        project.tasks.forEach(function(task) {

            // checks if the item is selected or not
            const complete = task.completed ? 'checked': null;
    
            // make a <div> element and set attributes
            const taskOutput = document.createElement('div'); // <output> </output>
            taskOutput.setAttribute('class', 'taskItem'); // <output class="item"> </output>
            taskOutput.setAttribute('data-key', task.id); // <output class="item" data-key="20200708"> </output>
    
            if (task.completed === true) {
                // style completed task
                taskOutput.classList.add('taskCompleted');
                // render project overview to display changes
                window.setTimeout(() => {
                    renderSelectedProject();
                }, 2000); // wait 2 seconds
            }
    
            taskOutput.innerHTML = `
            <div class="nameFromTask">${task.name}</div>
            <div class="projectsFromTask col_${task.color}">${task.project}</div>
            <div class="timeFromTask"><img id="timeIcon" src="../assets/phclock-clockwise.svg" alt="">${task.estimate}</div>
            <div class="priorityFromTask ${task.priority}">${task.priority}</div>
            <div class="dueDateFromTask"><img id="timeIcon" src="../assets/phclock-clockwise.svg" alt="">${task.date}</div>
            <input type="checkbox" class="completeTask" id="${task.id}" ${complete}>
            <label class="hiddenTaskComplete" for="${task.id}"><img id="timeIcon" src="../assets/taskComplete.svg" alt=""></label>
            <img id="delTaskImg" class="delSingleTaskBtn" src="../assets/delTaskIcon.svg" alt="">
            `;
    
            // add the task to the taskList
            taskItemOutput.append(taskOutput);
        });
    });
}

/*--------------------------------------------*/
/* ADD TASK TO PROJECT ARRAY IN LOCAL STORAGE */
/*--------------------------------------------*/

function addTasksToLocalStorageArray(matchedProject) {
    // convert the array to string then store it.
    localStorage.setItem('projects', JSON.stringify(projects));
    // render array to screen
    renderTasks(matchedProject);
    toggleTaskListDisplay();
}

/*-----------------------------------------------*/
/* GET TASKS FROM PROJECT ARRAY IN LOCAL STORAGE */
/*-----------------------------------------------*/

// get everything from local storage
function getTasksFromLocalStorageArray() {
    let storageItems = JSON.parse(localStorage.getItem('projects'));
    storageItems;
    renderTasks(projects);
}

/*-----------------------------*/
/* TOGGLE TASK COMPLETED STATE */
/*-----------------------------*/

// toggle the task's status between complete and not complete
function toggleTask(id) {
    projects.forEach((project) => {
        project.tasks.forEach(function(task) {
            if (task.id == id) {
                // set the task status to complete 
                task.completed = true;
                // toggle the value
                // task.completed = !task.completed;
            }
        });
        addTasksToLocalStorageArray(projects);
    });
}

/*-------------------------------*/
/* DELETE SPECIFIED TASK ONCLICK */
/*-------------------------------*/

// delete selected task and update localstorage ~ Need to fix
function deleteTask(id) {
    projects.forEach((project) => {
        project.tasks.forEach(function(task) {
            if (task.id == id) {
                console.log('Selected Task ID: ' + task.id + ' == Task Array ID: ' + id);
                let findTaskToDelete = project.tasks.indexOf(task); // finds the array index value of the selected task
                project.tasks.splice(findTaskToDelete, 1); // removes task from project 
                console.log('removed task ' + '(' + task.name + ')' + ' from project ' + '(' + task.project + ')'); 
            }
        });
        addTasksToLocalStorageArray(projects); // updates localstorage and project array
        toggleTaskListDisplay(); //  checks project array for tasks and updates html div accordingly
    });
}

/*-----------------------------------*/
/* GET EVERYTHING FROM LOCAL STORAGE */
/*-----------------------------------*/

getTasksFromLocalStorageArray(); // gets tasks from project array

/*------------------------*/
/* LISTEN FOR CLICKEVENTS */
/*------------------------*/

// listen for click events on checkbox and delete
taskItemOutput.addEventListener('click', function(event) {
    // check if the event is on checkbox
    if (event.target.type === 'checkbox') {
        // toggle the tasks 'complete' state
        toggleTask(event.target.parentElement.getAttribute('data-key'));
    }
     // check if it is a delete-button
    if (event.target.classList.contains('delSingleTaskBtn')) {
        // get id from data-key attribute's value of parent <div> where the delete-button is present
        deleteTask(event.target.parentElement.getAttribute('data-key'));
    }
});

/*---------------------------*/
/* CONSOLE LOG PROJECT ARRAY */
/*---------------------------*/

//console.log('Project Array Local Storage ', localStorage.getItem('projects'));
console.log('Project Array', projects);

/*----------------------------*/
/*----------------------------*/
/* TASK SCREEN DISPLAY TOGGLE */
/*----------------------------*/
/*----------------------------*/

/*----------------*/
/* INITATING HTML */
/*----------------*/

let headWrapperDiv = document.querySelector(".head-wrapper"); // gets header wrapper div
let newTaskBtn = document.querySelector("#crNewTaskBtn"); // gets new task button
let taskListInfo = document.querySelector(".before-list"); // gets before task list div
let bottomGradient = document.querySelector(".bottomTaskGradient"); // gets before task list div

/*---------------------------*/
/* TOGGLE TASK LIST DISPLAYS */
/*---------------------------*/

function toggleTaskListDisplay() {

	// check if project array has any entries
	if (projects.length > 0) {

		let tasksExist = false;
		let isEveryProjectEmpty;

		// check project's task array exists and has any entries
		isEveryProjectEmpty = projects.forEach(function(project) {
            if (typeof project.tasks !== 'undefined' && project.tasks.length > 0) {
                // console.log(project.name);
			    // console.log(`${project.tasks.length} tasks`);
                tasksExist = true;
            }
        });

		// the array is defined and has at least one entry
		if (tasksExist) {
			taskItemOutput.style.display = 'block'; 
			taskListInfo.style.display = 'none'; 
			headWrapperDiv.style.opacity = '1';
			newTaskBtn.style.pointerEvents = "all";
            bottomGradient.style.display = 'block';

		} else {
            // the task array is underfined and has no entries
            console.log('projects task array has no entries');
			taskItemOutput.style.display = 'none'; 
			taskListInfo.style.display = 'block'; 
			headWrapperDiv.style.opacity = '0.3';
			newTaskBtn.style.pointerEvents = 'none';
            bottomGradient.style.display = 'none';
		}

	} else {
		// project array has no entries
        console.log('projects array has no entries');
		taskItemOutput.style.display = 'none'; 
		taskListInfo.style.display = 'block'; 
		headWrapperDiv.style.opacity = '0.3';
		newTaskBtn.style.pointerEvents = 'none';
        bottomGradient.style.display = 'none';
	}
}

toggleTaskListDisplay(); // check how task list over displays

/*-------------------------------------*/
/*-------------------------------------*/
/* SWITCH POMODORO & STOPWATCH DISPLAY */
/*-------------------------------------*/
/*-------------------------------------*/

/*----------------*/
/* INTIATING HTML */
/*----------------*/

let togglePomodoro = document.querySelector('#toggle-pomodoro');
let toggleStopwatch = document.querySelector('#toggle-stopwatch');
let pomodoroWrapper = document.querySelector('.pom-wrapper');
let stopwatchWrapper = document.querySelector('.stopwatch-wrapper');

/*-------------------------*/
/* CALLING EVENT LISTENERS */
/*-------------------------*/

togglePomodoro.addEventListener("click", ()=> {
    togglePomStop(); // calling the function
});

toggleStopwatch.addEventListener("click", ()=> {
    togglePomStop(); // calling the function
});

/*-------------------------------------*/
/* TOGGLE POMODORO/STOPWATCH DISPLAYS */
/*-------------------------------------*/

// Toggles pom & stopwatch display
function togglePomStop() {
    if(!pomodoroWrapper) return;
    if (getComputedStyle(pomodoroWrapper).display == 'block') {
        pomodoroWrapper.style.display = 'none';
        stopwatchWrapper.style.display = 'block';
    } else {
        pomodoroWrapper.style.display = 'block';
        stopwatchWrapper.style.display = 'none';
    }
}

/*----------------*/
/*----------------*/
/* POMODORO TIMER */
/*----------------*/
/*----------------*/

/*----------------*/
/* INTIATING HTML */
/*----------------*/

let pomSettingBtnToggle = document.querySelector('#pSettingsToggle');

// containers
let pomClockWrapper = document.querySelector('.pClockWrapper');
let pomSetting = document.querySelector('#pClockSettings');
let pomFooter = document.querySelector('.head-footer');
let pomSettingsContainer = document.querySelector('.pTimer-container');

// buttons
let startPomBtn = document.querySelector('.pom-play');
let resetPomBtn = document.querySelector('.pom-reset');

// icons
let playPomIcon = document.querySelector('.playHidden');
let pausePomIcon = document.querySelector('.pauseHidden');
let pomSettingsIconCog = document.querySelector('.pomSettingCog');
let pomSettingsIconSubmit = document.querySelector('.pomSettingSubmit');
let pomResetIconDis = document.querySelector('.stopDisabled');
let pomResetIconAct = document.querySelector('.stopActive');
let pomTaglineTagDef = document.querySelector('.defaultSettings');
let pomTaglineTagCus = document.querySelector('.customSettings');

// inputs
let workDurationInput = document.querySelector('#input-work-duration');
let breakDurationInput = document.querySelector('#input-break-duration');
let sessionCountInput = document.querySelector('#input-session-count');

// outputs
// let pomodoroTimer = document.querySelector('#pTimer');
let pomFocusOutput = document.querySelector('.l-text');
let pomBreakOutput = document.querySelector('.r-text');
let pomSessions = document.querySelector('.pSessions');

/*---------------------*/
/* DECLARING VARIABLES */
/*---------------------*/

let type = 'Work';

// clock settings
let isClockRunning = false;
let isClockStopped = true;

// sessions
let completedSessions = '1';
sessionCountInput.value = '4';
pomSessions.innerText = completedSessions + ' of ' + sessionCountInput.value + ' sessions';

// focus & break
let updatedWorkSessionDuration;
let updatedBreakSessionDuration;

// initial screen value pom settings
workDurationInput.value = '45';
breakDurationInput.value = '15';

pomFocusOutput.innerText = workDurationInput.value + ' Min Focus'; // inital focus text = initial work duration value
pomBreakOutput.innerText = breakDurationInput.value + ' Min Break'; // inital break text = initial break duration value

// initial secondConversion clock settings
let workSessionDuration = 2700; // in seconds = 45 mins (60*45) == 2700
let currentTimeLeftInSession = 2700; 
let breakSessionDuration = 900; // in seconds = 15 mins (60%15)

// for achievements (pom focus only)
let timeSpentInCurrentSession = 0;

const { on } = require('events');
const { set } = require('express/lib/application');

// progress bar (styling + initalising) ~ using progressbar.js plugin
const ProgressBar = require('progressbar.js');
const progressBar = new ProgressBar.Circle('#pClock', {
    color: '#50E9C0', // green/blue
    strokeWidth: 4,
    easing: 'easeInOut',
    text: { value: '45:00', },
    trailColor: '#f4f5f4', // faded white
    from: { color: '#50E9C0' },
    to: { color: '#BDA3F0' },
    step: (state, shape) => {
        shape.path.setAttribute("stroke", state.color);
    }
});

progressBar.text.style.fontFamily = '"Michelangelo", sans-serif';
progressBar.text.style.fontSize = '60px';
progressBar.text.style.color = '#00BA9E';
progressBar.text.style.paddingBottom = '20px';
progressBar.text.style.letterSpacing = '3px';

/*-------------------------*/
/* CALLING EVENT LISTENERS */
/*-------------------------*/

// START
startPomBtn.addEventListener('click', () => {
  togglePom();
});

// RESET
resetPomBtn.addEventListener('click', () => {
    togglePom(true);
});

// TOGGLE SETTINGS COG/DISPLAY
pomSettingBtnToggle.addEventListener('click', () => {
    if(!pomClockWrapper) return;
    if (getComputedStyle(pomClockWrapper).display == 'block') {
        // toggle display
        pomClockWrapper.style.display = 'none';
        pomSetting.style.display = 'block';
        // toggle icon display
        pomSettingsIconCog.style.display = 'none';
        pomSettingsIconSubmit.style.display = 'block';
        // toggle pom footer & settings box
        pomFooter.style.display = 'none';
        pomSettingsContainer.style.height = '75%';
        // disable play btn
        startPomBtn.style.pointerEvents = 'none';
        startPomBtn.style.opacity = '0.5';
        // if pause icon is active replace it with play icon
        if (playPomIcon.style.display == 'none') {
            // pause timer (if timer is playing)
            togglePom();
            // toggle reset icon back to disabled state
            resetPomBtn.style.pointerEvents = 'none';
            pomResetIconDis.style.display = 'block';
            pomResetIconAct.style.display = 'none';
        } else {
            resetPomBtn.style.pointerEvents = 'none';
            pomResetIconDis.style.display = 'block';
            pomResetIconAct.style.display = 'none';
        }
    } else {
        checkFocusBreakInput(); // check user inputs and toggle back states set above
    }
});

/*-------------------------------------------*/
/* CHECK USER INPUT BEFORE RE-DISPLAYING POM */
/*-------------------------------------------*/

function checkFocusBreakInput() {
    if ((workDurationInput.value >= 1 && workDurationInput.value <= 60) && 
    (breakDurationInput.value >= 1 && breakDurationInput.value <= 60) && 
    (sessionCountInput.value >= 1 && sessionCountInput.value <= 10)) {
        // toggle pom screen display
        pomClockWrapper.style.display = 'block';
        pomSetting.style.display = 'none';
        // toggle icon display
        pomSettingsIconCog.style.display = 'block';
        pomSettingsIconSubmit.style.display = 'none';
        // toggle pom footer & settings bar
        pomFooter.style.display = 'block';
        pomSettingsContainer.style.height = '68%';
        // re-activate play icon/btn
        startPomBtn.style.pointerEvents = 'all';
        startPomBtn.style.opacity = '1';
    } else {
        if ((workDurationInput.value < 1 || workDurationInput.value > 60) ||
        (breakDurationInput.value < 1 || breakDurationInput.value > 60)) {
            alert('Please enter a value between 1 & 60');
            workDurationInput.value = '';
            breakDurationInput.value = '';
        }
        if (sessionCountInput.value < 1 || sessionCountInput.value > 10) {
            alert('Please enter a value between 1 & 10');
            sessionCountInput.value = '';
        }
    }
}

/*------------------------*/
/* RENDERING USER INPUTS  */
/*------------------------*/

function minuteToSeconds(mins) {
    return mins * 60;
}

function setUpdatedTimers() {
    if (type === 'Work') {
        currentTimeLeftInSession = updatedWorkSessionDuration ? updatedWorkSessionDuration : workSessionDuration;
        workSessionDuration = currentTimeLeftInSession;
    } else {
        currentTimeLeftInSession = updatedBreakSessionDuration ? updatedBreakSessionDuration : breakSessionDuration;
        breakSessionDuration = currentTimeLeftInSession;
    }
}

/*-----------------------------------------*/
/* UPDATING CLOCK BASED ON EVENT LISTENERS */
/*-----------------------------------------*/

// POM TIMER FUNCTIONALITY
function togglePom(reset) {
    resetPomClock(reset); // reset pause/play icon if reset btn is clicked
    // STOP THE TIMER
    if (reset) {
      stopClock();
    } else {
        // INITIAL
        if (isClockStopped) {
            setUpdatedTimers();
            isClockStopped = false;
        }
        // PAUSE THE TIMER
        if (isClockRunning === true) {
            clearInterval(clockTimer);

            isClockRunning = false; // set the vale of the button to start or pause

            if (pausePomIcon.style.display = 'block') { // switch play/pause icon
                pausePomIcon.style.display = 'none';
                playPomIcon.style.display = 'block';
            }
        // START THE TIMER
        } else {
            clockTimer = setInterval(() => {
                stepDown(); // toggle between work and break sessions
                displayCurrentTimeLeftInSession();
                progressBar.set(calculateSessionProgress());
            }, 1000);

            if (playPomIcon.style.display = 'block') { // switch play/pause icon
                playPomIcon.style.display = 'none';
                pausePomIcon.style.display = 'block';
            }

            isClockRunning = true;
        }
        enableResetIcon(); // activate reset icon when play btn is clicked
    }
}

/*------------------*/
/* DISPLAYING CLOCK */
/*------------------*/

function displayCurrentTimeLeftInSession() {
    const secondsLeft = currentTimeLeftInSession; // check time left in session
    let result = ''; // clear result

    const seconds = secondsLeft % 60; // seconds left in the timer
    const minutes = parseInt(secondsLeft / 60) % 60; // minutes left in the timer
    // let hours = parseInt(secondsLeft / 3600); // hours left in the timer

    function addLeadingZeroes(time) {
      return time < 10 ? `0${time}` : time; // add leading zeroes when minutes/seconds are less than 10
    }

    // if (hours > 0) {result += `${hours}:`}; // interpolates hours (if any), minutes & seconds together

    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;

    progressBar.text.innerText = result.toString() // render timer left to screen
}

/*----------------------------*/
/* UPDATING CLOCK ON STOP BTN */
/*----------------------------*/

function stopClock() {
    setUpdatedTimers(); // update timers
    // displaySessionUpdate(type);

    clearInterval(clockTimer); // Reset the timer

    isClockStopped = true; // Update variable to know that timer is stopped
    isClockRunning = false; // Update variable to know that timer is running

    currentTimeLeftInSession = workSessionDuration; // Reset time left in the session to its original state

    displayCurrentTimeLeftInSession(); // Update the timer displayed

    type = 'Work'; 

    timeSpentInCurrentSession = 0;

    progressBar.animate(0);

}

/*---------------------*/
/* COUNTING CLOCK DOWN */
/*---------------------*/

function stepDown() {
    if (currentTimeLeftInSession > 0) { // decrease time left
        currentTimeLeftInSession--;
        timeSpentInCurrentSession++;

    } else if (currentTimeLeftInSession === 0) { // Timer is over -> if work switch to break, viceversa

        timeSpentInCurrentSession = 0;

        // when both the work and break have run through 1 iteration increase section count
        if (type === 'Work') { 
            currentTimeLeftInSession = breakSessionDuration;
            type = 'Break';
            setUpdatedTimers();
        } else {
            currentTimeLeftInSession = workSessionDuration;
            type = 'Work';
            setUpdatedTimers();
            // update session counter
            if (completedSessions == 1) { // checks first time
                displaySessionUpdate();
            } else if (completedSessions > 1) { // checks every time after
                displaySessionUpdate();
            }
        }
    }
    displayCurrentTimeLeftInSession(); // update current time left in session
}

/*---------------------------*/
/* DISPLAYING SESSION UPDATE */
/*---------------------------*/

function displaySessionUpdate() {
    completedSessions++;
    pomSessions.innerText = (completedSessions) + ' of ' + (sessionCountInput.value) + ' sessions';
    console.log('completed ' + completedSessions + ' sessions');

    if (completedSessions == sessionCountInput.value) {
        togglePom(true);
        Swal.fire("Pom Timer Completed", "Nice work today, you have spent " +  (parseInt(timeSpentInCurrentSession / 60)) + " minutes in focus", "success");
    }
}

/*--------------------------------*/ 
/* RESET POM TIMER STYLES/VALUES  */
/*--------------------------------*/ 

function resetPomClock(reset) {
    if (reset) {

        // check if input values have been changed from default settings
        let defaultWorkDuration = '45';
        let defaultBreakDuration = '15';
        let defaultSessionDuration = '4';

        if ((workDurationInput.value !== defaultWorkDuration) || 
        (breakDurationInput.value !== defaultBreakDuration) || 
        (sessionCountInput.value !== defaultSessionDuration)) {

            //  if they have, replace default tag with custom tag
            if(!pomTaglineTagDef) return;
            if (getComputedStyle(pomTaglineTagDef).display == 'block') {
                pomTaglineTagDef.style.display = 'none';
                pomTaglineTagCus.style.display = 'block';
            }
            resetVariableCall();

        // else keep default tag active
        } else {
            pomTaglineTagDef.style.display = 'block';
            pomTaglineTagCus.style.display = 'none';
            resetVariableCall();
        }

    }
}

function resetVariableCall() {
    // update work/break time
    updatedWorkSessionDuration = minuteToSeconds(workDurationInput.value);
    updatedBreakSessionDuration = minuteToSeconds(breakDurationInput.value);
    
    // update work/break session text
    pomFocusOutput.innerText = workDurationInput.value + ' Min Focus';
    pomBreakOutput.innerText = breakDurationInput.value + ' Min Break';

    // update session count text
    completedSessions = '1';
    pomSessions.innerText = completedSessions + ' of ' + sessionCountInput.value + ' sessions'; 

    // when resetting -> always revert to play icon
    if(!pausePomIcon) return;
    if (getComputedStyle(pausePomIcon).display == 'block') {
        pausePomIcon.style.display = 'none';
        playPomIcon.style.display = 'block';
    }
    // change resetBtn back to initial state
    resetPomBtn.style.pointerEvents = 'none';
    pomResetIconDis.style.display = 'block';
    pomResetIconAct.style.display = 'none';
}

/*----------------------------------------------------*/ 
/* WHEN PLAY BTN IS FIRST CLICKED ACTIVATE RESET BTN  */
/*----------------------------------------------------*/ 

function enableResetIcon() {
    resetPomBtn.style.pointerEvents = 'all';
    pomResetIconDis.style.display = 'none';
    pomResetIconAct.style.display = 'block';
}

/*-----------------------------------------*/ 
/* CIRCLE ANIMATION (USING PROGRESSBAR.JS) */
/*-----------------------------------------*/ 

function calculateSessionProgress() {
    // calculate the completion rate of this session
    const sessionDuration = (type === 'Work') ? workSessionDuration : breakSessionDuration;
    return ((timeSpentInCurrentSession/sessionDuration) * 1);
}

/*-----------------*/
/*-----------------*/
/* STOPWATCH TIMER */
/*-----------------*/
/*-----------------*/

/*----------------*/
/* INTIATING HTML */
/*----------------*/

// Dis = Disabled && Act = Active
let elaspedTimeOutput = document.querySelector('.timeElapsed');

// buttons
let stopwatchLap = document.querySelector('.stopwatch-lap');
let stopwatchPlay = document.querySelector('.stopwatch-play');
let stopwatchReset = document.querySelector('.stopwatch-reset');

// icons
let lapDisIcon = document.querySelector('#lapDisabled');
let lapActIcon = document.querySelector('#lapActive');
let sPlayIcon = document.querySelector('#sPlay');
let sPauseIcon = document.querySelector('#sPause');
let sResetDisIcon = document.querySelector('#sResetDis');
let sResetActIcon = document.querySelector('#sResetAct');

// outputs
let stopwatchTime = document.querySelector('.timeTitle');

/*---------------------*/
/* DECLARING VARIABLES */
/*---------------------*/

let isPlaying = false;

let initialStopwatchTime = '00 : 00 : 00';
stopwatchTime.innerText = initialStopwatchTime;

timeInStopwatch = 0;
stopwatch = null;

let lapNumber = 1;

/*-----------------*/
/* EVENT LISTENERS */
/*-----------------*/

// START
stopwatchPlay.addEventListener('click', () => {
    if (!isPlaying) {
        // PLAY
        togglePlayBtn();
        clearInterval(stopwatch);
        stopwatch = setInterval(() => {
            startStopwatch();
        }, 1000);
        isPlaying = true;
    } else {
        // PAUSE
        clearInterval(stopwatch);
        togglePlayBtn();
        isPlaying = false;
    }
});

// RESET
stopwatchReset.addEventListener('click', () => {
    clearInterval(stopwatch);
    toggleAllOff();
    stopwatchTime.innerText = initialStopwatchTime;
    timeInStopwatch = 0;
    elaspedTimeOutput.innerHTML = '';
    isPlaying = false;
});

// LAP
stopwatchLap.addEventListener('click', () => {
    addElapsedTime();
});

/*------------------*/
/* TOGGLE STOPWATCH */
/*------------------*/

function togglePlayBtn() {
    if(!sPlayIcon) return;
    if (getComputedStyle(sPlayIcon).display == 'block') {
        toggleAllOn();
    } else {
        toggleAllOff();
    }
}

function toggleAllOn() {
    sPlayIcon.style.display = 'none';
    sPauseIcon.style.display = 'block';
    // activate lap button
    lapDisIcon.style.display = 'none';
    lapActIcon.style.display = 'block';
    // activate reset button
    sResetDisIcon.style.display = 'none';
    sResetActIcon.style.display = 'block';
    // add pointer events to other buttons
    stopwatchLap.style.pointerEvents = 'all';
    stopwatchReset.style.pointerEvents = 'all';
}

function toggleAllOff() {
    sPlayIcon.style.display = 'block';
    sPauseIcon.style.display = 'none';
    // de-activate lap button
    lapDisIcon.style.display = 'block';
    lapActIcon.style.display = 'none';
    // de-activate reset button
    sResetDisIcon.style.display = 'block';
    sResetActIcon.style.display = 'none';
    // remove pointer events to other buttons
    stopwatchLap.style.pointerEvents = 'none';
    stopwatchReset.style.pointerEvents = 'none';
}

/*-----------------*/
/* STOPWATCH TIMER */
/*-----------------*/

function startStopwatch() {
    timeInStopwatch++;
    timeAcumulatedInSession();
}

function timeAcumulatedInSession() {
    const secondsTimed = timeInStopwatch;
    let stopWatchResult = ''; // clear result

    const sSeconds = (secondsTimed % 60); // seconds left in the timer
    const sMinutes = parseInt(secondsTimed / 60) % 60; // minutes left in the timer
    const sHours = parseInt(secondsTimed / 3600); // hours left in the timer

    function addFrontZero(watchTime) {
        return watchTime < 10 ? `0${watchTime}` : watchTime; // add leading zeroes when minutes/seconds are less than 10
    }

    stopWatchResult += `${(addFrontZero(sHours))} : ${(addFrontZero(sMinutes))} : ${(addFrontZero(sSeconds))}`;

    stopwatchTime.innerText = stopWatchResult.toString(); // render timer left to screen
}

/*--------------*/
/* ELAPSED TIME */
/*--------------*/

function addElapsedTime() {

    let lapTitleOutput = ('lap ' + (lapNumber++));
    let lappedTimeOutput = stopwatchTime.innerText;

    const elapsedTime = document.createElement('li');
    elapsedTime.setAttribute('class', 'lapBox'); // <output class="item"> </output>

    elapsedTime.innerHTML = `
    <div class="lapTitle"><p id="lapTitle">${lapTitleOutput}</p></div>
    <div class="contentFill"></div>
    <div class="lappedTime"><p id="lappedTime">${lappedTimeOutput}</p></div>
    `;

    // finally add the <output> to <div>
    elaspedTimeOutput.append(elapsedTime);
}

/*--------------*/
/*--------------*/
/* MUSIC PLAYER */
/*--------------*/
/*--------------*/

// let likedSongsArr = [];

/*----------------*/
/* INTIATING HTML */
/*----------------*/

// display divs
let preSetSongs = document.querySelector('.preSetSongs'); // song list
let noLikedSongs = document.querySelector('.noLikedSongsDisplay'); // no liked song display

//songs divs
let song1 = document.querySelector('#song1'); // song 1 from playlist
let song2 = document.querySelector('#song2'); // song 2 from playlist
let song3 = document.querySelector('#song3'); // song 3 from playlist
let song4 = document.querySelector('#song4'); // song 4 from playlist
let song5 = document.querySelector('#song5'); // song 5 from playlist

// buttons 
let likedSongsBtn = document.querySelector('.LikedSongs');

let playSong1 = document.querySelector('#playSong1');
let playSong2 = document.querySelector('#playSong2');
let playSong3 = document.querySelector('#playSong3');
let playSong4 = document.querySelector('#playSong4');
let playSong5 = document.querySelector('#playSong5');

let loveIcon1 = document.querySelector('#loveIcon1');
let loveIcon2 = document.querySelector('#loveIcon2');
let loveIcon3 = document.querySelector('#loveIcon3');
let loveIcon4 = document.querySelector('#loveIcon4');
let loveIcon5 = document.querySelector('#loveIcon5');

// icons
let likedSongsIcon = document.querySelector('#likedSongsIcon');
let likedSongsAct = document.querySelector('#likedSongsAct');

// song track 1
let songPlayIcon_1 = document.querySelector('.songPlayIcon_1');
let songPauseIcon_1 = document.querySelector('.songPauseIcon_1');

let loveDisabled_1 = document.querySelector('.loveDisabled_1');
let loveActive_1 = document.querySelector('.loveActive_1');

// song track 2
let songPlayIcon_2 = document.querySelector('.songPlayIcon_2');
let songPauseIcon_2 = document.querySelector('.songPauseIcon_2');

let loveDisabled_2 = document.querySelector('.loveDisabled_2');
let loveActive_2 = document.querySelector('.loveActive_2');

// song track 3
let songPlayIcon_3 = document.querySelector('.songPlayIcon_3');
let songPauseIcon_3 = document.querySelector('.songPauseIcon_3');

let loveDisabled_3 = document.querySelector('.loveDisabled_3');
let loveActive_3 = document.querySelector('.loveActive_3');

// song track 4
let songPlayIcon_4 = document.querySelector('.songPlayIcon_4');
let songPauseIcon_4 = document.querySelector('.songPauseIcon_4');

let loveDisabled_4 = document.querySelector('.loveDisabled_4');
let loveActive_4 = document.querySelector('.loveActive_4');

// song track 5
let songPlayIcon_5 = document.querySelector('.songPlayIcon_5');
let songPauseIcon_5 = document.querySelector('.songPauseIcon_5');

let loveDisabled_5 = document.querySelector('.loveDisabled_5');
let loveActive_5 = document.querySelector('.loveActive_5');

// audio files
let songTrack1 = document.querySelector('#songTrack1'); // free falling ~ John Mayor
let songTrack2 = document.querySelector('#songTrack2'); // Study Music1 ~ Youtuber
let songTrack3 = document.querySelector('#songTrack3'); // Study Music2 ~ Youtuber
let songTrack4 = document.querySelector('#songTrack4'); // Finding Hope ~ 7clouds
let songTrack5 = document.querySelector('#songTrack5'); // Need To Asdd New Song

/*-------------------*/
/* DECLARE VARIABLES */
/*-------------------*/

// check if any songs have been liked
let likedSongsCheck = false;

// Interval Clear
let updateTime = null;

//check if songs are playing
let song1Playing = false;
let song2Playing = false;
let song3Playing = false;
let song4Playing = false;
let song5Playing = false;

/*-----------------*/
/* EVENT LISTENERS */
/*-----------------*/

// liked songs
likedSongsBtn.addEventListener('click', () => {
    toggleAllLikedSongs();
});

// default study songs 
playSong1.addEventListener('click', () => {
    togglePlayBtn1();
});

playSong2.addEventListener('click', () => {
    togglePlayBtn2();
});

playSong3.addEventListener('click', () => {
    togglePlayBtn3();
});

playSong4.addEventListener('click', () => {
    togglePlayBtn4();
});

playSong5.addEventListener('click', () => {
    togglePlayBtn5();
});

// liked song icons
loveIcon1.addEventListener('click', (e) => {
    toggleLikedSong1();
});

loveIcon2.addEventListener('click', () => {
    toggleLikedSong2();
});

loveIcon3.addEventListener('click', () => {
    toggleLikedSong3();
});

loveIcon4.addEventListener('click', () => {
    toggleLikedSong4();
});

loveIcon5.addEventListener('click', () => {
    toggleLikedSong5();
});

/*----------------------------*/
/* TOGGLES PLAY/PAUSE BUTTONS */
/*----------------------------*/

function togglePlayBtn1() {
    if(!songPlayIcon_1) return;
    if (getComputedStyle(songPlayIcon_1).display == 'block') {
        songPlayIcon_1.style.display = 'none';
        songPauseIcon_1.style.display = 'block';
        // PLAY SONG
        songTrack1.play(); 
        window.clearInterval(updateTime);
        song1Playing = true;

        // IF OTHER SONGS ARE PLAYING PAUSE THEM
        checkSongTrack1Playing();
    } else {
        songPlayIcon_1.style.display = 'block';
        songPauseIcon_1.style.display = 'none';
        // PAUSE SONG
        songTrack1.pause();
        window.clearInterval(updateTime);
        song1Playing = false;
    }
}

function togglePlayBtn2() {
    if(!songPlayIcon_2) return;
    if (getComputedStyle(songPlayIcon_2).display == 'block') {
        songPlayIcon_2.style.display = 'none';
        songPauseIcon_2.style.display = 'block';
        // PLAY SONG
        songTrack2.play(); 
        window.clearInterval(updateTime);
        song2Playing = true;

        // IF OTHER SONGS ARE PLAYING PAUSE THEM
        checkSongTrack2Playing();

    } else {
        songPlayIcon_2.style.display = 'block';
        songPauseIcon_2.style.display = 'none';
        // PAUSE SONG
        songTrack2.pause();
        window.clearInterval(updateTime);
        song2Playing = false;
    }
}

function togglePlayBtn3() {
    if(!songPlayIcon_3) return;
    if (getComputedStyle(songPlayIcon_3).display == 'block') {
        songPlayIcon_3.style.display = 'none';
        songPauseIcon_3.style.display = 'block';
        // PLAY SONG
        songTrack3.play(); 
        window.clearInterval(updateTime);
        song3Playing = true;

        // IF OTHER SONGS ARE PLAYING PAUSE THEM
        checkSongTrack3Playing();
    } else {
        songPlayIcon_3.style.display = 'block';
        songPauseIcon_3.style.display = 'none';
        // PAUSE SONG
        songTrack3.pause();
        window.clearInterval(updateTime);
        song3Playing = false;
    }
}

function togglePlayBtn4() {
    if(!songPlayIcon_4) return;
    if (getComputedStyle(songPlayIcon_4).display == 'block') {
        songPlayIcon_4.style.display = 'none';
        songPauseIcon_4.style.display = 'block';
        // PLAY SONG
        songTrack4.play(); 
        window.clearInterval(updateTime);
        song4Playing = true;

        // IF OTHER SONGS ARE PLAYING PAUSE THEM
        checkSongTrack4Playing();
    } else {
        songPlayIcon_4.style.display = 'block';
        songPauseIcon_4.style.display = 'none';
        // PAUSE SONG
        songTrack4.pause();
        window.clearInterval(updateTime);
        song4Playing = false;
    }
}

function togglePlayBtn5() {
    if(!songPlayIcon_5) return;
    if (getComputedStyle(songPlayIcon_5).display == 'block') {
        songPlayIcon_5.style.display = 'none';
        songPauseIcon_5.style.display = 'block';
        // PLAY SONG
        songTrack5.play(); 
        window.clearInterval(updateTime);
        song5Playing = true;

        // IF OTHER SONGS ARE PLAYING PAUSE THEM
        checkSongTrack5Playing();
    } else {
        songPlayIcon_5.style.display = 'block';
        songPauseIcon_5.style.display = 'none';
        // PAUSE SONG
        songTrack5.pause();
        window.clearInterval(updateTime);
        song5Playing = false;
    }
}

/*---------------------*/
/* TOGGLES LIKED SONGS */
/*---------------------*/

function toggleAllLikedSongs() {
    if(!likedSongsIcon) return;
    if (getComputedStyle(likedSongsIcon).display == 'block') {
        likedSongsIcon.style.display = 'none';
        likedSongsAct.style.display = 'block';
        displayLikedSongs();
    } else {
        likedSongsIcon.style.display = 'block';
        likedSongsAct.style.display = 'none';
        // toggle displays
        preSetSongs.style.display = 'block';
        noLikedSongs.style.display = 'none';
        displayAllSongs();
    }
}

function toggleLikedSong1() {
    if(!loveDisabled_1) return;
    if (getComputedStyle(loveDisabled_1).display == 'block') {
        loveDisabled_1.style.display = 'none';
        loveActive_1.style.display = 'block';
        song1.classList.add('liked');
    } else {
        loveDisabled_1.style.display = 'block';
        loveActive_1.style.display = 'none';
        song1.classList.remove('liked');
    }
}

function toggleLikedSong2() {
    if(!loveDisabled_2) return;
    if (getComputedStyle(loveDisabled_2).display == 'block') {
        loveDisabled_2.style.display = 'none';
        loveActive_2.style.display = 'block';
        song2.classList.add('liked');
    } else {
        loveDisabled_2.style.display = 'block';
        loveActive_2.style.display = 'none';
        song1.classList.remove('liked');
    }
}

function toggleLikedSong3() {
    if(!loveDisabled_3) return;
    if (getComputedStyle(loveDisabled_3).display == 'block') {
        loveDisabled_3.style.display = 'none';
        loveActive_3.style.display = 'block';
        song3.classList.add('liked');
    } else {
        loveDisabled_3.style.display = 'block';
        loveActive_3.style.display = 'none';
        song4.classList.add('liked');
    }
}

function toggleLikedSong4() {
    if(!loveDisabled_4) return;
    if (getComputedStyle(loveDisabled_4).display == 'block') {
        loveDisabled_4.style.display = 'none';
        loveActive_4.style.display = 'block';
        song4.classList.add('liked');
    } else {
        loveDisabled_4.style.display = 'block';
        loveActive_4.style.display = 'none';
        song4.classList.add('liked');
    }
}

function toggleLikedSong5() {
    if(!loveDisabled_5) return;
    if (getComputedStyle(loveDisabled_5).display == 'block') {
        loveDisabled_5.style.display = 'none';
        loveActive_5.style.display = 'block';
        song5.classList.add('liked');
    } else {
        loveDisabled_5.style.display = 'block';
        loveActive_5.style.display = 'none';
        song5.classList.add('liked');
    }
}

/*-----------------------*/
/* LOOPED SONGS FUNCTION */
/*-----------------------*/

let songLooped = 0;

songTrack4.addEventListener('timeupdate', function() {
    let songBuffer = .44;
    if(this.currentTime > this.duration - songBuffer){
        this.currentTime = 0;
        this.play();
        checkLoopedSong();
    }
});

// check looped song only repeats 4 times
function checkLoopedSong() {
    if (songLooped === 5) {
        songTrack4.pause();
        window.clearInterval(updateTime);
    } else {
        songLooped = songLooped + 1;
        console.log(songLooped);
    }
}

/*----------------------------------------*/
/* TOGGLE OTHER SONGS WHEN ONE IS PLAYING */
/*----------------------------------------*/

function checkSongTrack1Playing() {
    if (song1Playing) {
        if (song2Playing == true) {
            togglePlayBtn2();
    
        } else if (song3Playing == true) {
            togglePlayBtn3();
    
        } else if (song4Playing == true) {
            togglePlayBtn4();

        } else if (song5Playing == true) {
            togglePlayBtn5();
        }
    }
}

function checkSongTrack2Playing() {
    if (song2Playing) {
        if (song1Playing == true) {
            togglePlayBtn1();
    
        } else if (song3Playing == true) {
            togglePlayBtn3();
    
        } else if (song4Playing == true) {
            togglePlayBtn4();

        } else if (song5Playing == true) {
            togglePlayBtn5();
        }
    }
}

function checkSongTrack3Playing() {
    if (song3Playing) {
        if (song1Playing == true) {
            togglePlayBtn1();
    
        } else if (song2Playing == true) {
            togglePlayBtn2();

        } else if (song4Playing == true) {
            togglePlayBtn4();

        } else if (song5Playing == true) {
            togglePlayBtn5();
        }
    }
}

function checkSongTrack4Playing() {
    if (song4Playing) {
        if (song1Playing == true) {
            togglePlayBtn1();
    
        } else if (song2Playing == true) {
            togglePlayBtn2();

        } else if (song3Playing == true) {
            togglePlayBtn3();

        } else if (song5Playing == true) {
            togglePlayBtn5();
        }
    }
}

function checkSongTrack5Playing() {
    if (song5Playing) {
        if (song1Playing == true) {
            togglePlayBtn1();
    
        } else if (song2Playing == true) {
            togglePlayBtn2();

        } else if (song3Playing == true) {
            togglePlayBtn3();

        } else if (song4Playing == true) {
            togglePlayBtn4();
        }
    }
}

/*---------------------*/
/* DISPLAY LIKED SONGS */
/*---------------------*/

function displayLikedSongs() {
    if ((song1.classList.contains('liked')) || (song2.classList.contains('liked')) || 
    (song3.classList.contains('liked')) || (song4.classList.contains('liked')) ||
    (song5.classList.contains('liked'))) {

        likedSongsCheck = true;

        // toggle displays
        preSetSongs.style.display = 'block';
        noLikedSongs.style.display = 'none';

        // check which songs don't have a liked classlist added
        if (!song1.classList.contains('liked')) {
            song1.style.display = 'none';
        }
        
        if (!song2.classList.contains('liked')) {
            song2.style.display = 'none';
        }
        
        if(!song3.classList.contains('liked')) {
            song3.style.display = 'none';
        }
        
        if(!song4.classList.contains('liked')) {
            song4.style.display = 'none';
        }

        if(!song5.classList.contains('liked')) {
            song5.style.display = 'none';
        }

    } else {
        console.log('no liked songs');
        // toggle displays
        preSetSongs.style.display = 'none';
        noLikedSongs.style.display = 'block';
    }
}

function displayAllSongs() {
    song1.style.display = 'flex';
    song2.style.display = 'flex';
    song3.style.display = 'flex';
    song4.style.display = 'flex';
    song5.style.display = 'flex';
}

/*------------------*/
/*------------------*/
/* PROJECT OVERVIEW */
/*------------------*/
/*------------------*/

let storedProjSel;

/*-----------------*/
/* INITIATING HTML */
/*-----------------*/

let projectDropDown = document.querySelector('.chooseProject');
let projectgridBox = document.querySelector('.gridBox');
let renderedProjectDueDate = document.querySelector('.projectDueDate');
let progressBarStatus = document.querySelector('#progressBarStatus'); // project completion bar ~ no plugin used (all me!)

/*-------------------*/
/* DECLARE VARIABLES */
/*-------------------*/

progressBarStatus.style.width = '0px';

let optionSelected = projectDropDown.options[projectDropDown.selectedIndex];
let renderProjectDropdown;
let taskValueOS = 0; // task value on screen ~ counter
let storedSelection = optionSelected.id;

/*---------------------------------*/
/* LOAD PROJECTS INTO SELECT INPUT */
/*---------------------------------*/

// check project array for projects
window.onload = function() {
    storedProjSel = localStorage.getItem('storedProjSel'); // store selected project id for future visits
    console.log('dropdown project selected: ' + storedProjSel);

    if (projects.length > 0) {
        // render each project name to dropdown box
        updateProjectDropDown(storedProjSel);
    } else {
        // if no projects, display that information on project box
        projectDropDown.innerHTML = '';
        let noProjects = document.createElement('option');
        noProjects.innerHTML = 'No Projects';
        noProjects.value = 'No Projects';
        projectDropDown.appendChild(noProjects);
    }
}

/*------------------------------------------------*/
/* WHEN PROJECT ARRAY IS UPDATED, UPDATE DROPDOWN */
/*------------------------------------------------*/

function updateProjectDropDown(storedProjSel) {

    // render default first option in before projects
    projectDropDown.innerHTML = '';
    let defaultOption = document.createElement('option');
    defaultOption.innerHTML = 'Choose a Project';
    defaultOption.value = '';
    defaultOption.setAttribute('class', 'proj placeholder');
    projectDropDown.appendChild(defaultOption);

    // search project array for projects
    projects.forEach(function(project) {
        // render each project name to dropdown box
        let projOpt = document.createElement('option');
        projOpt.innerHTML = project.name;
        projOpt.value = project.id;
        projOpt.id = project.id;
        projectDropDown.append(projOpt);

        // if stored overview project ID exists
        if (storedProjSel !== null) {
            if (storedProjSel == projOpt.value) {
                projectDropDown.options[storedProjSel].selected = true;
                window.setTimeout(() => {
                    optionSelected = projectDropDown.options[projectDropDown.selectedIndex];
                    renderSelectedProject();
                }, 1000);
            }
        }
    });
}

/*------------------------------*/
/* ONCHANGE GET SELECTED OPTION */
/*------------------------------*/

projectDropDown.oninput = function() {
    checkWhichProjectSelected();
}

/*-------------------------------*/
/* CHECK WHICH OPTION IS SELCTED */
/*-------------------------------*/

function checkWhichProjectSelected() {
    // find selected option from dropdown
    optionSelected = projectDropDown.options[projectDropDown.selectedIndex];
    storedSelection = optionSelected.value;
    localStorage.setItem('storedProjSel', storedSelection); // store selected project ID

    // check if project due date exists and make according changes
    checkProjectDueDateInput(storedSelection);
}

function checkProjectDueDateInput(storedSelection) {

    // confirm which project the selected project is from and add due date to it
    projects.forEach(function(project) {

        // if selected project ID == project in database check due date entry
        if (storedSelection == project.id) {

            // if project doesnt have a due date, add project due day to database
            if (project.due === null) {

                // switch displays
                document.querySelector('.overviewInsights').style.display = 'none';
                document.querySelector('.overviewContainer').style.display = 'none';
                document.querySelector('.addProjectDueDate').style.display = 'block';

                // declare due date submit btn
                let dueDateEntrySubmit = document.querySelector('#due-date-entry-submit');

                // run event listener for submit
                dueDateEntrySubmit.addEventListener('click', () => {
                    window.setTimeout(() => {
                        updateProjectDueDate();
                    }, 500);
                });

                function updateProjectDueDate() {

                    // get day & month input
                    let projDueDateDay = document.querySelector('#due-date-day').value;
                    let projDueDateMonth = document.querySelector('#due-date-month').value;

                    // create project due date
                    let projectDueDate = projDueDateDay + ' ' + projDueDateMonth;

                    // add project due date to selected project & update localstorage
                    project.due = projectDueDate;
                    localStorage.setItem('projects', JSON.stringify(projects));

                    // set default display settings
                    document.querySelector('.overviewInsights').style.display = 'flex';
                    document.querySelector('.overviewContainer').style.display = 'block';
                    document.querySelector('.addProjectDueDate').style.display = 'none';

                    // render newly updated project overview to screen
                    renderSelectedProject();
                }

            } else {
                // set default display settings
                document.querySelector('.overviewInsights').style.display = 'flex';
                document.querySelector('.overviewContainer').style.display = 'block';
                document.querySelector('.addProjectDueDate').style.display = 'none';

                // render project with updated due date to screen
                renderSelectedProject();
            }
            
        } else {
            document.querySelector('.overviewInsights').style.display = 'flex';
            document.querySelector('.overviewContainer').style.display = 'block';
            document.querySelector('.addProjectDueDate').style.display = 'none';
            
            // render default project overview settings to screen
            renderSelectedProject();
        }
    });
}

/*-----------------------------------*/
/* RENDER PROJECT OVERVIEW TO SCREEN */
/*-----------------------------------*/

function renderSelectedProject() {
    renderProjectDropdown = projects.forEach(function(project) {
        if (optionSelected.id == project.id) { // selected option id == one of a project id
            
            console.log('option selected id: ' + optionSelected.id + ' is connected to the project: ' + project.name);

            /*---------------------------*/
            /* RENDER DUE DATE TO SCREEN */
            /*---------------------------*/

            renderedProjectDueDate.innerHTML = '';
            renderedProjectDueDate.innerHTML = project.due;

            if (project.tasks.length !== 0) {

                /*----------------------------------------*/
                /* CALCULATE PROGRESS BAR COMPLETION RATE */
                /*----------------------------------------*/
                // 1. calculate the total number of tasks in selected project
                // 2. calculate the number of completed tasks in selected project
                // 3. calculate step 2 as a percentage of step 1
                // 4. Animate progress bar to display the value of step 3

                let projectLength;
                let numberOfCompletedTasks = 0;
                let completedTasksLength;
                let progressBarWidth;

                project.tasks.forEach(function(taskCheck) {
                    if (taskCheck.completed === true) {
                        numberOfCompletedTasks = numberOfCompletedTasks + 1;
                    }
                });

                projectLength = project.tasks.length;
                completedTasksLength = numberOfCompletedTasks;
                progressBarWidth = ((completedTasksLength / projectLength) * 100) + '%'; // calc %

                window.setTimeout(() => {
                    progressBarStatus.style.width = progressBarWidth; //  animate bar after 1 second
                }, 1000);

                /*------------------------------------*/
                /* RENDER OVERVIEW OF TASKS TO SCREEN */
                /*------------------------------------*/

                // clear projectgridBox content
                projectgridBox.innerHTML = '';

                project.tasks.forEach(function(quickTask) {

                    // increase id value for every task div created
                    taskValueOS = taskValueOS + 1;
            
                    // make a <div> element and set attributes
                    const overviewItem = document.createElement('div'); 
                    overviewItem.setAttribute('class', 'overviewItem isNotCompleted'); 
                    overviewItem.setAttribute('id', taskValueOS); 
            
                    if (quickTask.completed === true) {
                        overviewItem.classList.replace('isNotCompleted', 'isCompleted');
                    }
            
                    overviewItem.innerHTML = `
                    <p class="task_name">${quickTask.name}</p>
                    <img class="task_check_icon" src="../assets/taskComplete.svg" alt="">
                    `;
            
                    projectgridBox.append(overviewItem);
                });

            } else {
                // clear grid box and due date 
                projectgridBox.innerHTML = '';

                // render blank task view display
                for (let i = 0; i < 10; i++) {
                    const overviewItem = document.createElement('div'); 
                    overviewItem.setAttribute('class', 'overviewItem'); 
                    projectgridBox.append(overviewItem);
                }
                // render progress bar width to 0%;
                progressBarStatus.style.width = '0%';
            }
        }

        if (optionSelected.value == '') {
            // clear grid box and due date 
            projectgridBox.innerHTML = '';
            renderedProjectDueDate.innerHTML = '';

            // render default date to screen
            renderedProjectDueDate.innerHTML = '...';

            // render blank task view display
            for (let i = 0; i < 10; i++) {
                const overviewItem = document.createElement('div'); 
                overviewItem.setAttribute('class', 'overviewItem'); 
                projectgridBox.append(overviewItem);
            }
            // render progress bar width to 0%;
            progressBarStatus.style.width = '0%';
         }
    });
}

/*---------------*/
/*---------------*/
/* ACRONYM MAKER */
/*---------------*/
/*---------------*/

let acronymsArr = []; // array of acronyms

/*----------------*/
/* INTIATING HTML */
/*----------------*/

// form
let acrInput = document.querySelector('.acroInput');
let AcrSubmit = document.querySelector('#AcrSubmit');

// output
let acrOutput = document.querySelector('.acronymOutput');

/*-----------------*/
/* EVENT LISTENERS */
/*-----------------*/

// default study songs 
AcrSubmit.addEventListener('click', () => {
    toggleAcronymState();
});

function toggleAcronymState() {
    // check acronym input isn't undefined, only spaces or empty
    if (acrInput.value.trim().length == 0 || acrInput.value == '') {
        console.log('acronym hasnt been inputed correctly');
        return false;
    } else {
        AcrSubmit.style.backgroundColor = '#BDA3F0';
        window.setTimeout(() => { // wait 1 second then update acronym display
            AcrSubmit.style.backgroundColor = '#8e72d6';
            createAcronym();
        },  1000);
    }
}

// function to split, map & join input
function getInputFirstLetters(str) {
    const firstLetters = str
      .split(' ') // removes white spaces from words
      .map(word => word[0]) // find letter indexed at first position for each word
      .join(''); // concatinate letter together to form acronym
  
    return firstLetters;
}

// create acronym ~ short value, long value and array object
function createAcronym() {
    // assign acronym and user input to variables
    let acronymShort = getInputFirstLetters(acrInput.value); // make acronym uppercase 
    let acronymLong  = acrInput.value;
    
    // console log output of variables declared above
    console.log(acronymShort + ' = ' + acronymLong);
    
    // make an object
    const newAcronym = {
        id: Date.now(),
        short: acronymShort,
        long: acronymLong,
    };

    addNewAcronym(newAcronym);
}

function addNewAcronym(acronymItem) {
    acronymsArr.push(acronymItem); // push acronym to array (in reverse order)
    addAcronymToLocalStorage(acronymsArr); // push array to localstorage (function)
    acrInput.value = ''; // clear the acronym input value
}

function renderAcronyms(acronymsArr) {
    // clear taskItem input
    acrOutput.innerHTML = '';

    acronymsArr.forEach((acronym) => {
        const acrItem = document.createElement('div');
        acrItem.setAttribute('class', 'acronymItem');
        acrItem.setAttribute('data-key', acronym.id);
    
        acrItem.innerHTML = `
        <div class="acronymShort">${acronym.short}</div>
        <div class="acronymLong">${acronym.long}</div>
        <img id="delAcronym" class="delAcronym" src="../assets/delTaskIcon.svg" alt="">
        `;
    
        // add the acronym to output div
        acrOutput.append(acrItem);
    });

    if (acronymsArr.length > 0) {
        // add an extra classname called 'newestAcro' to the first child in the array
        document.querySelector('.acronymItem:first-child').classList.add('newestAcro');
    }
}

function addAcronymToLocalStorage(acronymsArr) {
    // convert the array to string then store it.
    localStorage.setItem('acronymsArr', JSON.stringify(acronymsArr));
    acronymsArr = acronymsArr.reverse();
    renderAcronyms(acronymsArr); // render array to screen
}

function getAcronymFromLocalStorage() {
    const acronymReference = localStorage.getItem('acronymsArr');
    // if reference exists
    if (acronymReference) {
        // converts back to array and store it in acronym array
        acronymsArr = JSON.parse(acronymReference);
        console.log('Acronyms Array ', acronymsArr);

        // check if array has any entries
        if (acronymsArr.length > 0) {
            acronymsArr = acronymsArr.reverse();
            renderAcronyms(acronymsArr); // render entries to screen
        } else {
            console.log('Acronym Array Is Empty');
            renderInitialAcronymSetup();
        }
    } else {
        console.log('Local Storage Cannot Find Acronym Array');
        renderInitialAcronymSetup();
    }
}

function deleteAcronym(id) {
    acronymsArr.forEach((acronym) => {
      // if the selected acronym's (parent) ID equals ID in Acronym Array
      if (acronym.id == id) {
            // console log 'acronym.id' & 'id' to see they are the same
            console.log(acronym.id);
            console.log(id);
    
            // find the index of the selected acronym
            let findAcronymToDel = acronymsArr.indexOf(acronym);
    
            // delete it from array
            acronymsArr.splice(findAcronymToDel, 1);
      }
    });
    // update localstorage
    addAcronymToLocalStorage(acronymsArr);
}

// get acronyms from localstorage on window load
getAcronymFromLocalStorage();

acrOutput.addEventListener('click', function(event) {
    // check if click is on a delete button
    if (event.target.classList.contains('delAcronym')) {
        // get data-key of parent div when del btn is clicked
        deleteAcronym(event.target.parentElement.getAttribute('data-key'));
    }

    // if last acronym in array is deleted display initial setup
    if (acronymsArr.length === 0 ) {
        renderInitialAcronymSetup();
    }
});

function renderInitialAcronymSetup() {
    // clear projectgridBox input
    acrOutput.innerHTML = '';
    // render blank task view display
    for (let i = 0; i < 6; i++) {
        const acrItem = document.createElement('div');
        acrItem.setAttribute('class', 'acronymItem'); 
        acrOutput.append(acrItem);
    }
}

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

function renderCalendar() {
    date.setDate(1);

    // Attatching JS to HTML elements

    let calDays = document.querySelector('.days');
    
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
    ];
    
    // let weekday = [
    //     "Monday",
    //     "Tuesday",
    //     "Wednesday", 
    //     "Thursday",
    //     "Friday",
    //     "Saturday",
    //     "Sunday"
    // ][date.getDay()];
    
    // Adding current Month/Year to Calender Top
    document.querySelector("#currMonth").innerHTML = months[date.getMonth()];
    document.querySelector("#currYear").innerHTML = date.getFullYear();
    
    // Adding Month Days (prev, current, next) to Calender

    let days = "";
    
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div id="prev-month-days">${prevLastDay - x + 1}</div>`;
    }
    
    for (let i = 1; i <= lastDay; i++) {
        if((i === new Date().getDate()) && (date.getMonth() === new Date().getMonth())) {
            days += `<div class="today">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }

    if (nextDays > 0) { 
        for (let j = 1; j <= nextDays; j++) { 
            days += `<div id="next-month-days">${j}</div>`; 
            calDays.innerHTML = days;  
        }
    } else { 
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