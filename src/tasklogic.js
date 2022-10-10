let tasklogic = (function() {
    let id=0;
    let overdue=[];
    let today=[];
    let tomorrow=[];
    let upcomming=[];    

    function sortTasks() {
        overdue=[];
        today=[];
        tomorrow=[];
        upcomming=[];
        let sorted=mytasks.getallTasks;
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
        constructor (title,description="",dueDate="",priority="",project="", existingID='') {
            if(existingID){
                this.id=existingID;
                if(parseInt(existingID)>id)id=parseInt(existingID);
            }
            else this.id=++id;
            this.title=title;
            this.description=description;
            this.dueDate=dueDate;
            this.priority=priority;
            this.project=project;
            }   
    }    
    class AllTasks {
        constructor() {
            let existingData=localStorage.getItem('mytasks');
            console.log(existingData);
            this.tasks=[];
            this.accomplished=[];
            this.trash=[];
            if(existingData){
                let retrievedData=JSON.parse(existingData);
                for(let i=retrievedData.length-1;i>=0;i--) {
                    let thisTask=new Task(retrievedData[i].title,retrievedData[i].description,retrievedData[i].dueDate,retrievedData[i].priority,retrievedData[i].project,retrievedData[i].id)
                    this.tasks.push(thisTask);
                }
            }
        }
        printTasks() {
            console.log(JSON.parse(localStorage.getItem('mytasks')));
        }
        newTask(o){
            let t=new Task(o.title,o.description,o.dueDate,o.priority,o.project);
            this.tasks.push(t);
            localStorage.setItem('mytasks',JSON.stringify(this.tasks));
            return t;
        }
        deleteTask(t) {
            for(let x=this.tasks.length-1;x>=0;x--) {
                if(this.tasks[x].id===parseInt(t)){
                    let rec=this.tasks.splice(x,1);
                    this.trash.push(rec);
                }
            }
            localStorage.setItem('mytasks',JSON.stringify(this.tasks));
        }
        validateTask(t) {
            for(let x=this.tasks.length-1;x>=0;x--) {
                if(this.tasks[x].id===parseInt(t)){
                    let rec=this.tasks.splice(x,1);
                    this.accomplished.push(rec);
                }
            }
            localStorage.setItem('mytasks',JSON.stringify(this.tasks));
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
                    this.tasks[x].title=o.title;
                    this.tasks[x].description=o.description;
                    this.tasks[x].dueDate=o.dueDate;
                    this.tasks[x].priority=o.priority;
                    this.tasks[x].project=o.project;
                }
            }
            localStorage.setItem('mytasks',JSON.stringify(this.tasks));
        }
        getProjectID(id) {
            for(let x=this.tasks.length-1;x>=0;x--) {
                if(this.tasks[x].id===parseInt(id)){
                    return this.tasks[x].project;
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
    let existingData=JSON.parse(localStorage.getItem('myprojects'));
    if(existingData){
        projectList=existingData;
        console.log(projectList);
        for(let i=projectList.length-1;i>=0;i--) {
            if(projectList[i].id>id)id=projectList[i].id;
        }
    }
    function addProject(s) {
        id++;
        projectList.push({id:id,name:s});
        localStorage.setItem('myprojects',JSON.stringify(projectList));
        return id;
    }
    function getProject() {
        return projectList;
    }
    function deleteProject(s) {
        for(let x=projectList.length-1;x>=0;x--) {
            if(projectList[x].name===s)projectList.splice(x,1);
        }
        localStorage.setItem('myprojects',JSON.stringify(projectList));
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
        localStorage.setItem('myprojects',JSON.stringify(projectList));
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
    let existingData=localStorage.getItem('mylists');
    if(existingData){
        listOfLists=JSON.parse(existingData);
        for(let i=listOfLists.length-1;i>=0;i--) {
            if(listOfLists[i].id>id)id=listOfLists[i].id;
        }
    }
    function createList(n) {
        id++;
        listOfLists.push({id:id,name:n,list:''});
        localStorage.setItem('mylists',JSON.stringify(listOfLists));
    }
    function addToList(id,t) {
        for(let i=listOfLists.length-1;i>=0;i--) {
            if(listOfLists[i].id===parseInt(id))listOfLists[i].list.push(t);
        }
        localStorage.setItem('mylists',JSON.stringify(listOfLists));
    }
    function deleteList(id) {
        for(let i=listOfLists.length-1;i>=0;i--) {
            if(listOfLists[i].id===parseInt(id))listOfLists.splice(i,1);
        }
        localStorage.setItem('mylists',JSON.stringify(listOfLists));
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
        localStorage.setItem('mylists',JSON.stringify(listOfLists));
    }
    function updatelist(id,s) {
        for(let i=listOfLists.length-1;i>=0;i--) {
            if(listOfLists[i].id===parseInt(id))listOfLists[i].list=s;
        }
        localStorage.setItem('mylists',JSON.stringify(listOfLists));
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

export {projects, listsLogic, tasklogic as default};