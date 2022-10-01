
class Task {
    constructor (title,description="",dueDate="",priority="",project="") {
        this.title=title;
        this.description=description;
        this.dueDate=dueDate;
        this.priority=priority;
        this.project=project;
        }   
}

class AllTasks {
    constructor() {
        this.tasks=[];
    }
    newTask(title,description="",dueDate="",priority="",project=""){
        let t=new Task(title,description,dueDate,priority,project);
        this.tasks.push(t);
        console.log(t);
        return t;
    }
    get getallTasks() {
        return this.tasks;
    }
    get getnumberTotal() {
        return this.tasks.length;
    }
}
let mytasks=new AllTasks();

    
mytasks.newTask("read","Any book","12/12/23",3);
console.log(mytasks.getallTasks);

let projects=(function project(){
    let projectList=[];
    function addProject(s) {
        if(!findProjectExists(s)){
            project.push(s);
            return true;
        }
        else return false;
    }
    function getProject() {
        return projectList;
    }
    function findProjectExists(s) {
        for(let x=projectList.length;x>0;x--) {
            if(projectList[x]===s)return true;
        }
        return false;
    }
    // -----
    return {
        addProject,
        getProject,
    }
})();

let addtask = document.querySelector('.adddiv');
addtask.addEventListener('click', showmodal);

function showmodal() {
    addmenu.createmenu();
    newtaskmodule.displaytask();
    let modal = document.querySelector('.taskcontainer');
    modal.classList.remove('taskcontainerhidden');
    modal.classList.add('taskcontainervisible');
    
}
function hidemodal() {
    let modal = document.querySelector('.taskcontainer');
    modal.classList.remove('taskcontainervisible');
    modal.classList.add('taskcontainerhidden');
    addmenu.removeMenuStyles();
}
function addTask(t) {
    mytasks.newTask(t.title, t.description,t.deadline,t.priority,t.project);
}

