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

let crNewTaskBtn = document.querySelector("#crNewTaskBtn");
let crTaskBtn = document.querySelector("#createTaskBtn");
let remTaskBtn = document.querySelector("#deleteTaskBtn");

let CrTask = document.querySelector(".task-wrapper");
let RemTask = document.querySelector(".create-wrapper");

crNewTaskBtn.addEventListener('click', ()=> {  // new task form opens up when you click on the new task button
    switchVisible();
}); 

remTaskBtn.addEventListener('click', ()=> {  // new task form closes when you click del button
    switchVisible();
});

/*--------------------*/
/* DASHBOARD ELEMENTS */
/*--------------------*/

let pomstopTimer = document.querySelector(".timers");
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
        pomstopTimer.style.opacity = '0.3', calBox.style.opacity = '0.3',
        achievements.style.opacity = '0.3', musicPlayer.style.opacity = '0.3',
        acronyms.style.opacity = '0.3', projOverviewBox.style.opacity = '0.3';
        
    } else {
        CrTask.style.display = 'block';
        RemTask.style.display = 'none';

        // retun other dashboard elements opacity to normal when task creator is closed 
        pomstopTimer.style.opacity = '1', calBox.style.opacity = '1', 
        achievements.style.opacity = '1', musicPlayer.style.opacity = '1',
        acronyms.style.opacity = '1', projOverviewBox.style.opacity = '1';
    }
}

/*---------------------------------------*/
/*---------------------------------------*/
/* STORING/DISPLAYING PROJECT NAME INPUT */
/*---------------------------------------*/
/*---------------------------------------*/

/*

Project Data model:
- All projects are stored in an array called projects, which is stored in localStorage as localStorage.getItem('projects').
- This is synched with the variable allProjects on pageload/change
- data is in the following format:
[
	{
		"name": "Project 1 Name",
		"due": "Sat Dec 17 2022 03:24:00 GMT+1100 (Australian Eastern Daylight Time)",
		"id": Date.now(),
		"tasks": [
			{
				"id": Date.now(),
				"name": "taskNameInput.value", // this is equal to "project 1 task 1"
				"due": "dueDateInput.value",
				"priority": "prioritySelected.value",
				"estimate": "timeEstimated.value",
                "project": "projectName",
				"completed": false,
			},
			...
		]
	},
	...
]
*/

let projects = []; // Project Array ~ Contains tasks associated with each project
let colArray = ['skips', 'blue', 'purple', 'green', 'red', 'orange', 'pink'];
let selectedValue;

let projectSubmitBtn = document.querySelector("#saveprojectname"); // gets project submit btn
let projectInput = document.querySelector("#newprojsave"); // gets project name input

/*

Style Additions 

projBtnImg ~ Allows code to remove submit btn (its an img) when the number of projects are equal to 8
projectLabel ~ Allows code to style project input label when there is an error or alert

*/

let projBtnImg = document.querySelector("#new-proj-icon"); 
let projectLabel = document.querySelector('#new-project'); // gets project label

/* 

Output Areas - for tasks and projects

outputProjects ~ area where projects are displayed after being created

*/

let outputProjects = document.querySelector('.projects');


//mapping colours to project box and task list (project box)
// function projectColMatch() {
//     if (projects.length > 0) {
//         console.log('project colmatch ' + projects.length);
//         if (projects[0]) {
//             console.log('first project exists ' + projects[0]);
//             document.querySelector('.hiddenbox').style.color = '#4ab5c5';
//             document.querySelector('.hiddenbox').style.border = '1.5px solid #4ab5c5';

//             let projSelected = document.querySelector('.projcheckbox:checked');
            
//             if (projSelected == null) {
//                 console.log('nothing selected');
//             } else {
//                 console.log('item selected');
//                 document.querySelectorAll('.projcheckbox:checked, .hiddenbox').style.background = 'white';
//             }

//         } else {
//             console.log('no projects to match colours');
//             return false;
//         }
//     } else {
//         console.log('no projects to match colours');
//         return false;
//     } 
// }

/*---------------------------------------*/
/*---------------------------------------*/
/* STORING/DISPLAYING PROJECT NAME INPUT */
/*---------------------------------------*/
/*---------------------------------------*/

// add an eventListener on btn click, and listen for project name submit
projectSubmitBtn.addEventListener('click', ()=> { 
    checkInputName();
});

// mapped colour counter
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

function addProjectName(item) {
    increaseProjectVal();
    // if item is not empty
    if (item !== '') {

        // make a projectname object, which has id, name
        const project = {
		    name: item,
            color: selectedValue,
            id: Date.now(),
		    tasks: []
         };

        // then add it to project names array
        projects.push(project);
        addProjectsToLocalStorage(projects); // then renders them between <output>

        // finally clear the input box value
        projectInput.value = '';
    }
}

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

function addProjectsToLocalStorage(projects) {
    // convert the array to string then store it.
    localStorage.setItem('projects', JSON.stringify(projects));
    // render array to screen
    renderProjects(projects);
}

// function helps to get everything from local storage
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

// checks if array has reached 6 items and if it does disable project name submit btn
function stopArray() {
    if (projects.length === 6) {
        // console.log('project array has reached max capacity ');
        projBtnImg.style.display = 'none';
    } else {
        console.log(projects.length);
        projBtnImg.style.display = 'block';
    }
}

// removes project name submit btn when no. of projects equal 8
stopArray();

// check condition of new project entry
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
            projectLabel.style.color = 'tomato'; // change label colour to red == alert
        } 

		// project name doesn't exist == safe to add
		else {
			console.log(projectInput.value, 'can be added to database');
		  	projectLabel.style.color = '#dbdbdb'; // change label back to normal = safe
          	addProjectName(projectInput.value); 
        }
    } 
	
	// project array has no entries so name can be added 
	else {
        console.log(projectInput.value + ' is your first project');
        addProjectName(projectInput.value);
    }
}

/*--------------------------*/
/*--------------------------*/
/* STORING/DISPLAYING TASKS */
/*--------------------------*/
/*--------------------------*/

let taskForm = document.querySelector('.tasks-form');  // form 

let taskName = document.getElementById('taskNameInput');  // task name input
let taskDueDate = document.getElementById('duedate');  // task due date input
let taskPriority = document.getElementById('p-measure');  // task priority value
let taskEstimate = document.getElementById('completetime');  // task priority input

let taskItemOutput = document.querySelector(".taskListOutput"); // task list output div

taskForm.addEventListener('submit', function(e) {  // add an eventListener on button click
    e.preventDefault();
    checkFormData();
});

function checkFormData() {
    // sets formValid parameter
    let formValid = false;
    console.log(formValid);

    let selectedProject = document.querySelector('.projcheckbox:checked'); // get selected project

    // check form is properly filled out
    if (
        taskName.value === '' || taskName.value.trim().length == 0 ||
        taskDueDate.value === '' || taskDueDate.value.trim().length == 0 ||
        taskPriority.value === '' || taskPriority.value.trim().length == 0 ||
        taskEstimate.value === '' || taskEstimate.value.trim().length == 0 ||
        selectedProject == null
        ) {
            alert('please fill out required fields!'); 
            // check individual inputs for errors
            if (taskName.value === '' || taskName.value.trim().length == 0) {
                console.log('No task name inputed'); 
                document.querySelector('#task-name').style.color = 'tomato';
            } else {
                document.querySelector('#task-name').style.color = '#dbdbdb';
            }
            
            if (taskDueDate.value === '' || taskDueDate.value.trim().length == 0) {
                console.log('No due date selected'); 
                document.querySelector('#dueLabel').style.color = 'tomato';
            } else {
                document.querySelector('#dueLabel').style.color = '#dbdbdb';
            }
            
            if (taskPriority.value === '' || taskPriority.value.trim().length == 0) {
                console.log('No priority selected'); 
                document.querySelector('#priorityLabel').style.color = 'tomato';
            } else {
                document.querySelector('#priorityLabel').style.color = '#dbdbdb';
            }
            
            if (taskEstimate.value === '' || taskEstimate.value.trim().length == 0) {
                console.log('No completion time inputed'); 
                document.querySelector('#estimateLabel').style.color = 'tomato';
            } else {
                document.querySelector('#estimateLabel').style.color = '#dbdbdb';
            }

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

        let projectID = selectedProject.id; // gets project name id
        let projectName = selectedProject.getAttribute('parentname');
        let projectCol = selectedProject.getAttribute('color');

        // console logs
        console.log('Task Name: ' + taskName.value);
        console.log('Due Date: ' + taskDueDate.value);
        console.log('Priority: ' + taskPriority.value);
        console.log('Completion Time: ' + taskEstimate.value);
        console.log('Project ID: ' + projectID);
        console.log('Project Name: ' + projectName);
        console.log('Project Colour: ' + projectCol);

        // make a task object
        const newTask = {
            id: Date.now(),
            name: taskName.value,
            date: taskDueDate.value,
            priority: taskPriority.value,
            estimate: taskEstimate.value,
            project: projectName,
            color: projectCol,
            completed: false
        };

        switchVisible();
        addNewTask(projectID, newTask);
    }
}

function addNewTask(projectID, task) {
    // gets selected project from array, finds the task array and adds new task to it
    let matchedProject = projects.find(project=> project.id == projectID);
    console.log(matchedProject);
    matchedProject.tasks.push(task);

    //renders projects to div
    addTasksToLocalStorageArray(matchedProject);

    // finally clear the input box value
    if (document.querySelector('.projcheckbox:checked') == true) {
        document.querySelector('.projcheckbox:checked') = false;
    }

    taskName.value = '';
    taskDueDate.value = '';
    taskPriority.value = '';
    taskEstimate.value = '';
}

function renderTasks() {

    // clear taskItem input
    taskItemOutput.innerHTML = '';

    let renderTaskItem;

    // run through each item inside project's tasklist array
    renderTaskItem = projects.forEach((project) => {
        project.tasks.forEach(function(task) {

            // checks if the item is selected or not
            const complete = task.completed ? 'checked': null;
    
            // make a <output> element and set attributes
            const taskOutput = document.createElement('div'); // <output> </output>
            taskOutput.setAttribute('class', 'taskItem'); // <output class="item"> </output>
            taskOutput.setAttribute('data-key', task.id); // <output class="item" data-key="20200708"> </output>
    
            if (task.completed === true) {
                taskOutput.classList.add('taskCompleted');
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
    
            // finally add the <output> to <div>
            taskItemOutput.append(taskOutput);
        });
    });
}

function addTasksToLocalStorageArray(matchedProject) {
    // convert the array to string then store it.
    localStorage.setItem('projects', JSON.stringify(projects));
    // render array to screen
    renderTasks(matchedProject);
    toggleTaskListDisplay();
}

//function helps to get everything from local storage
function getTasksFromLocalStorageArray() {
    let storageItems = JSON.parse(localStorage.getItem('projects'));
    storageItems;
    renderTasks(projects);
}

// toggle the task's status between complete and not complete
function toggleTask(id) {
    projects.forEach((project) => {
        project.tasks.forEach(function(task) {
            if (task.id == id) {
                // toggle the value
                task.completed = !task.completed;
            }
        });
        addTasksToLocalStorageArray(projects);
    });
}

// delete selected task and update localstorage
function deleteTask(id) {
    projects.forEach((project) => {
        project.tasks.forEach(function(task) {
            if (task.id == id) {
                console.log(id);
                console.log(task.id);
                console.log('removed task'); 
                project.tasks.splice(task, 1); // removes task from project 
            }
        });
        addTasksToLocalStorageArray(projects); // updates localstorage and project array
        toggleTaskListDisplay(); //  checks project array for tasks and updates html div accordingly
    });
}

getTasksFromLocalStorageArray(); // gets tasks from project array

// listen for click events on checkbox and delete
taskItemOutput.addEventListener('click', function(event) {
    // check if the event is on checkbox
    if (event.target.type === 'checkbox') {
        // toggle the task 'complete' state
        toggleTask(event.target.parentElement.getAttribute('data-key'));
    }
     // check if that is a delete-button
    if (event.target.classList.contains('delSingleTaskBtn')) {
        // get id from data-key attribute's value of parent <div> where the delete-button is present
        deleteTask(event.target.parentElement.getAttribute('data-key'));
    }
});

//console.log('Project Array Local Storage ', localStorage.getItem('projects'));
console.log('Project Array', projects);

/*----------------------------*/
/*----------------------------*/
/* TASK SCREEN DISPLAY TOGGLE */
/*----------------------------*/
/*----------------------------*/

let headWrapperDiv = document.querySelector(".head-wrapper"); // gets header wrapper div
let newTaskBtn = document.querySelector("#crNewTaskBtn"); // gets new task button
let taskListInfo = document.querySelector(".before-list"); // gets before task list div
let bottomGradient = document.querySelector(".bottomTaskGradient"); // gets before task list div

function toggleTaskListDisplay() {

	// check if project array has any entries
	if (projects.length > 0) {

		let tasksExist = false;
		let isEveryProjectEmpty;

		// check project's task array exists and has any entries
		isEveryProjectEmpty = projects.forEach(function(project) {
            if (typeof project.tasks !== 'undefined' && project.tasks.length > 0) {
                console.log(project.name);
			    console.log(`${project.tasks.length} tasks`);
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

let togglePomodoro = document.querySelector('#toggle-pomodoro');
let toggleStopwatch = document.querySelector('#toggle-stopwatch');
let pomodoroWrapper = document.querySelector('.pom-wrapper');
let stopwatchWrapper = document.querySelector('.stopwatch-wrapper');

togglePomodoro.addEventListener("click", ()=> {
    togglePomStop(); // calling the function
});

toggleStopwatch.addEventListener("click", ()=> {
    togglePomStop(); // calling the function
});

//  Toggles focus mode on/off - changing icon design
function togglePomStop() {
    if(!CrTask) return;
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

workDurationInput.value = '45';
breakDurationInput.value = '15';

pomFocusOutput.innerText = workDurationInput.value + ' Min Focus'; // inital focus text = initial work duration value
pomBreakOutput.innerText = breakDurationInput.value + ' Min Break'; // inital break text = initial break duration value

let workSessionDuration = 2700; // in seconds = 45 mins (60*45)
let currentTimeLeftInSession = 2700; 

let breakSessionDuration = 900; // in seconds = 15 mins (60%15)

// achievements (pom focus)
let timeSpentInCurrentSession = 0;

// progress bar (styling + initalising) ~ using progressbar.js plugin
const ProgressBar = require('progressbar.js');
const progressBar = new ProgressBar.Circle('#pClock', {
    color: '#50E9C0', // green/blue
    strokeWidth: 4,
    easing: 'easeInOut',
    text: { value: '45:00', },
    trailColor: '#f4f5f4', // faded white
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

            //  if they have replace default tag with custom tag
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

/*---------------------------------------------------*/ 
/* WHEN PLAY BTN IS FIRST CLICKED ACTIVATE REST BTN  */
/*---------------------------------------------------*/ 

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