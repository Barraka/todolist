tasklogic = (function() {
    let id=0;
    let overdue=[];
    let today=[];
    let tomorrow=[];
    let upcomming=[];
    

    function retrieveTasks() {
        //set the last id
    }
    function sortTasks() {
        overdue=[];
        today=[];
        tomorrow=[];
        upcomming=[];
        sorted=mytasks.getallTasks.sort((a,b)=> {return new Date(a.dueDate) - new Date(b.dueDate);});
        
        let now=new Date();
        let tomorrowdate=new Date();
        let yesterdaydate=new Date();
        tomorrowdate.setDate(now.getDate()+1);
        yesterdaydate.setDate(now.getDate()-1);
        sorted.forEach(x=> {        
            let compDate= new Date(x.dueDate);
            //calculate overdue
            if(compDate<=yesterdaydate)overdue.push(x);
            //calculate today
            else if(compDate.getDate()===now.getDate() && compDate.getMonth()===now.getMonth() && compDate.getFullYear() && now.getFullYear())today.push(x);
            //calculate tomorrow        
            else if(compDate.getDate()===tomorrowdate.getDate() && compDate.getMonth()===tomorrowdate.getMonth() && compDate.getFullYear() && tomorrowdate.getFullYear())tomorrow.push(x);
            else upcomming.push(x);
        });
    }
    class Task {
        constructor (title,description="",dueDate="",priority="",project="") {
            this.id=++id;
            this.title=title;
            this.description=description;
            this.dueDate=dueDate;
            this.priority=priority;
            this.project=project;
            if(this.dueDate==='')this.dueDate=new Date();
            }   
    }
    
    class AllTasks {
        constructor() {
            this.tasks=[];
            this.accomplished=[];
            this.trash=[];
        }
        // newTask(title,description="",dueDate="",priority="",project=""){
        newTask(o){
            let t=new Task(o.title,o.description,o.dueDate,o.priority,o.project);
            this.tasks.push(t);
            console.log(t);
            return t;
        }
        deleteTask(t) {
            for(let x=this.tasks.length-1;x>=0;x--) {
                if(this.tasks[x].id===parseInt(t)){
                    let rec=this.tasks.splice(x,1);
                    this.trash.push(rec);
                }
            }
        }
        validateTask(t) {
            for(let x=this.tasks.length-1;x>=0;x--) {
                if(this.tasks[x].id===parseInt(t)){
                    let rec=this.tasks.splice(x,1);
                    this.accomplished.push(rec);
                }
            }
        }
        retrieveTask(id) {
            for(let x=this.tasks.length-1;x>=0;x--) {
                if(this.tasks[x].id===parseInt(id)){
                    return this.tasks[x];
                }
            }
        }
        editTask(id,o) {
            for(let x=this.tasks.length-1;x>=0;x--) {
                if(this.tasks[x].id===parseInt(id)){
                    o.id=parseInt(id);
                    this.tasks[x]=o;
                }
            }
        }
        get getallTasks() {
            return this.tasks;
        }
        get getnumberTotal() {
            return this.tasks.length;
        }
        get getTrash() {
            return this.trash;
        }
    }
    function generateGroups() {
        sortTasks();
        return{overdue,today,tomorrow,upcomming};
    }
    let mytasks=new AllTasks();
    //----
    return {overdue,today,tomorrow,upcomming,generateGroups,mytasks}
})();

let projects=(function project(){
    let projectList=[];
    let id=0;
    function addProject(s) {
        if(!findProjectExists(s)){
            id++;
            projectList.push({id:id,name:s});
            return true;
        }
        else return false;
    }
    function getProject() {
        return projectList;
    }
    function findProjectExists(s) {
        for(let x=projectList.length-1;x>=0;x--) {
            if(projectList[x].name===s)return true;
        }
        return false;
    }
    // -----
    return {
        addProject,
        getProject,
    }
})();


