class Task {
    constructor (title,description,dueDate,priority,project="") {
        this.title=title;
        this.description=description;
        this.dueDate=dueDate;
        this.priority=priority;
        this.project=project;
        }   
}
let read=new Task("read","Any book","12/12/23",3);
console.log(read);

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
    let modal = document.querySelector('.taskcontainer');
    modal.classList.remove('taskcontainerhidden');
    modal.classList.add('taskcontainervisible');
}