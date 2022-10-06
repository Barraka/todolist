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
        let sorted=mytasks.getallTasks;
        let sortedLength=sorted.length;
        for(let i=0;i<sortedLength;i++) {
            // if(sorted[i].dueDate==='')upcomming.push(sorted.splice(i,1)[0]);
        }
        //sorted=mytasks.getallTasks.sort((a,b)=> {return new Date(a.dueDate) - new Date(b.dueDate);});
        sorted.sort((a,b)=> {return new Date(a.dueDate) - new Date(b.dueDate);});
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
        console.log(upcomming);
    }
    class Task {
        constructor (title,description="",dueDate="",priority="",project="") {
            this.id=++id;
            this.title=title;
            this.description=description;
            this.dueDate=dueDate;
            this.priority=priority;
            this.project=project;
            //if(this.dueDate==='')this.dueDate=new Date();
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
        tasksPerProject(pid) {
            let tempList=[];
            for(let x=this.tasks.length-1;x>=0;x--) {
                if(this.tasks[x].project===pid){
                    tempList.push(this.tasks[x]);
                }
            }
            return tempList;
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
    return {overdue,today,tomorrow,upcomming,generateGroups,mytasks,sortTasks}
})();

let projects=(function(){
    let projectList=[];
    let id=0;
    function addProject(s) {
        id++;
            projectList.push({id:id,name:s});
            return id;
    }
    function getProject() {
        return projectList;
    }
    function deleteProject(s) {
        for(let x=projectList.length-1;x>=0;x--) {
            if(projectList[x].name===s)projectList.splice(x,1);
            console.log(projectList);
        }
    }
    function getProjectName(s) {
        for(let x=projectList.length-1;x>=0;x--) {
            if(projectList[x].id===parseInt(s))return projectList[x].name;
        }
        return '';
    }
    function updateProjectName(id,s) {
        for(let x=projectList.length-1;x>=0;x--) {
            if(projectList[x].id===parseInt(id))projectList[x].name=s;
        }
    }
    // -----
    return {
        addProject,
        getProject,
        deleteProject,
        getProjectName,
        updateProjectName,
    }
})();

let listsLogic=(function(){
    let id=0;
    let listOfLists=[];
    let newList
    function createList(n) {
        id++;
        listOfLists.push({id:id,name:n,list:''});
    }
    function addToList(id,t) {
        for(let i=listOfLists.length-1;i>=0;i--) {
            if(listOfLists[i].id===parseInt(id))listOfLists[i].list.push(t);
        }
    }
    function deleteList(id) {
        for(let i=listOfLists.length-1;i>=0;i--) {
            if(listOfLists[i].id===parseInt(id))listOfLists.splice(i,1);
        }
    }
    function deleteListItem(id,tid) {
        for(let i=listOfLists.length-1;i>=0;i--) {
            if(listOfLists[i].id===parseInt(id))listOfLists[i].list.splice(tid,1);
        }
    }
    function renameList(id,s) {
        for(let i=listOfLists.length-1;i>=0;i--) {
            if(listOfLists[i].id===parseInt(id))listOfLists[i].name=s;
        }
    }
    function renameListItem(id,tid,s) {
        for(let i=listOfLists.length-1;i>=0;i--) {
            if(listOfLists[i].id===parseInt(id))listOfLists[i].list[tid]=s;
        }
    }
    function updatelist(id,s) {
        for(let i=listOfLists.length-1;i>=0;i--) {
            if(listOfLists[i].id===parseInt(id))listOfLists[i].list=s;
        }
    }   
    function getfullList() {
        return listOfLists;
    }
    function getListByID(id) {
        return listOfLists[id];
    }
    //----
    return {createList,addToList,deleteList,deleteListItem,renameList,renameListItem,getfullList,getListByID,updatelist};
})();


