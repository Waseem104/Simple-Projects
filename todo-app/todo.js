const theme=document.getElementById("toggle-theme");
const taskInput=document.getElementById("search");
const priority=document.getElementById("priority");
const addTaskBtn=document.getElementById("add-task");
const filterSelect=document.getElementById("filter-tasks");
const sortTasks=document.getElementById("sort-tasks");
const taskList=document.getElementById("task-list");

let tasks=JSON.parse(localStorage.getItem('tasks')) || [];
let isDarkMode=JSON.parse(localStorage.getItem("darkmode")) || false;

if(isDarkMode){
    document.body.classList.add("dark-mode");
}

const saveTask=()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
const toggleTheme=()=>{
    isDarkMode=!isDarkMode;
    localStorage.setItem('darkmode',JSON.stringify(isDarkMode));
    document.body.classList.toggle('dark-mode',isDarkMode);

    if (isDarkMode) {
        theme.textContent = "Light Mode";
        theme.style.backgroundColor="#f0f2f5";
        theme.style.color="#333";
    } else {
        theme.textContent = "Dark Mode";
        theme.style.backgroundColor="#333";
        theme.style.color="#f0f2f5";
    }
}
theme.addEventListener("click",toggleTheme)

// add task
addTaskBtn.addEventListener("click",()=>{
    const taskName=taskInput.value.trim();
    const  selectedPriority=priority.value;

    if(taskName){
        if(!selectedPriority){
            alert("please select the priority first");
            return;
        }
        tasks.push({taskName,selectedPriority,completed:false});
        saveTask();
        renderAndCreate();
        taskInput.value='';
    }else{
        alert("please enter a task");
    }
});

// create listItem
const renderAndCreate=()=>{
    taskList.innerHTML='';
    const filteredTasks=tasks.filter(task=>{
        if(filterSelect.value==="active"){
            return !task.completed;
        }
        if(filterSelect==="completed"){
            return task.completed;
        }
        return true;
    });


    filteredTasks.forEach((task,index) => {
        const li=document.createElement("li");
        li.className="listItem";
        li.innerHTML=`
        <span>${task.taskName} (${task.selectedPriority}) </span>
        <div>
          <button id="undo-btn" onclick="toggleCompleted(${index})">${task.completed ? 'Undo':'Done'}</button>
          <button id="delete-btn" onclick="deleteTask(${index})">Delete</button>
        </div>`;
          taskList.appendChild(li);
    });
};

// delete task
window.deleteTask=(index)=>{
    tasks.splice(index,1)
    saveTask();
    renderAndCreate();
}

// toggle completed
window.toggleCompleted=(index)=>{
    tasks[index].completed=!tasks[index].completed;
    saveTask();
    renderAndCreate();
};

// filter tasks
filterSelect.addEventListener("change",renderAndCreate);

// sort by priority
sortTasks.addEventListener("click",()=>{
    tasks.sort((a,b)=>{
        const priorities= { high: 1, medium: 2, low: 3 };
        return priorities[a.selectedPriority] - priorities[b.selectedPriority];
    });
    saveTask();
    renderAndCreate();
});
renderAndCreate();