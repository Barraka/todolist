taskDom= (function() {
    let maincontent = document.querySelector('.maincontent');
    function showLists() {
        maincontent.innerHTML='';
        let allLists=listsLogic.getfullList();
        let numberOfLists=allLists.length;
        for(let i=0;i<numberOfLists;i++) {
            let categoryOuter = document.createElement('div');
            categoryOuter.classList.add('categoryOuter','grow-wrap');
            categoryOuter.setAttribute('data-id',allLists[i].id);
            let categoryInner = document.createElement('div');
            categoryInner.classList.add('categoryInner');
            let projectAddOuter = document.createElement('div');
            projectAddOuter.classList.add('projectAddOuter');
            let projectTitle = document.createElement('div');
            projectTitle.classList.add('projectTitle', 'categorytxt');
            projectTitle.textContent=allLists[i].name;
            //add edit icon
            let projectEditIcon = document.createElement('div');
            projectEditIcon.classList.add('projectEditIcon');
            projectEditIcon.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 39h2.2l22.15-22.15-2.2-2.2L9 36.8Zm30.7-24.3-6.4-6.4 2.1-2.1q.85-.85 2.1-.85t2.1.85l2.2 2.2q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Zm-5.35-1.05-1.1-1.1 2.2 2.2Z"/></svg>';
            let projectTrashIcon = document.createElement('div');
            projectTrashIcon.classList.add('projectTrashIcon');
            projectTrashIcon.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg>';
            //combine both to projectAddOuter
            projectAddOuter.appendChild(projectTitle);
            projectAddOuter.appendChild(projectEditIcon);
            projectAddOuter.appendChild(projectTrashIcon);
            categoryOuter.appendChild(projectAddOuter);
            let textArea = document.createElement('textarea');
            textArea.classList.add('textArea');
            textArea.setAttribute('draggable','true');
            categoryOuter.appendChild(textArea);
            textArea.value=allLists[i].list;
            
            textArea.addEventListener('keydown',resizeBox);
            
            projectEditIcon.addEventListener('click',editListName);
            projectTrashIcon.addEventListener('click',deleteList);
            textArea.addEventListener('blur',updateData);
            maincontent.appendChild(categoryOuter);
            if(textArea.scrollHeight>20)textArea.style.height=textArea.scrollHeight+'px';
        }
        function resizeBox(e) {
            if(e.key==='Enter') {
                let currentHeight=e.currentTarget.clientHeight;
                e.currentTarget.style.height=`calc(${currentHeight}px + 1em)`;
            }
        }
        function editListName(e) {
            let target=e.currentTarget.previousSibling;
            target.setAttribute('contenteditable','true');
            target.focus();
            target.addEventListener('blur',stopEditListName);
            target.addEventListener('keydown',stopEditListName);
        }
        function stopEditListName(e) {
            if(e.type==='keydown' && e.key !=='Enter')return;
            e.currentTarget.setAttribute('contenteditable','false');
            let this_id=e.currentTarget.parentElement.parentElement.getAttribute('data-id');
            let newName=e.currentTarget.textContent;
            if(newName==='')e.currentTarget.textContent='Default';
            else listsLogic.renameList(this_id,newName);
            //projects.updateProjectName(pid,newName);
        }
        function updateData(e) {
            let this_id=e.currentTarget.parentElement.getAttribute('data-id');
            let updatedList=e.currentTarget.value;
            listsLogic.updatelist(this_id,updatedList);
        }
        function deleteList(e) {
        
            let pName=e.currentTarget.parentElement.firstElementChild.textContent;
            let pid=e.currentTarget.parentElement.parentElement.getAttribute('data-id');
            let taskList=tasklogic.mytasks.tasksPerProject(pid);
            if(taskList.length>0) {
                let errorDiv = document.createElement('div');
                errorDiv.classList.add('errorDiv'); 
                let closeSvg = document.createElement('div');
                closeSvg.classList.add('closeSvg');
                closeSvg.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"/></svg>';
                let errorText = document.createElement('div');
                errorText.classList.add('errorText');
                errorText.textContent='You cannot delete a project with existing tasks';
                errorDiv.appendChild(errorText);
                errorDiv.appendChild(closeSvg);
                closeSvg.addEventListener('click',e=>errorDiv.remove());
                e.currentTarget.parentElement.appendChild(errorDiv);
            }
            else {
                projects.deleteProject(pName);
                showProjects();
            }
            
        }
    }
    function showProjects() {
        maincontent.innerHTML='';
        let theProjects=projects.getProject();
        let numberOfProjects=theProjects.length;
        for(let i=0;i<numberOfProjects;i++) {
            let categoryOuter = document.createElement('div');
            categoryOuter.classList.add('categoryOuter');
            categoryOuter.setAttribute('data-id',theProjects[i].id);
            let projectAddOuter = document.createElement('div');
            projectAddOuter.classList.add('projectAddOuter');
            let projectTitle = document.createElement('div');
            projectTitle.classList.add('projectTitle', 'categorytxt');
            projectTitle.textContent=theProjects[i].name;
            //add edit icon
            let projectEditIcon = document.createElement('div');
            projectEditIcon.classList.add('projectEditIcon');
            projectEditIcon.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 39h2.2l22.15-22.15-2.2-2.2L9 36.8Zm30.7-24.3-6.4-6.4 2.1-2.1q.85-.85 2.1-.85t2.1.85l2.2 2.2q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Zm-5.35-1.05-1.1-1.1 2.2 2.2Z"/></svg>';
            let projectTrashIcon = document.createElement('div');
            projectTrashIcon.classList.add('projectTrashIcon');
            projectTrashIcon.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg>';
            //combine both to projectAddOuter
            projectAddOuter.appendChild(projectTitle);
            projectAddOuter.appendChild(projectEditIcon);
            projectAddOuter.appendChild(projectTrashIcon);
            categoryOuter.appendChild(projectAddOuter);
            let allTasks=tasklogic.mytasks.getallTasks;
            let currentProjectId=theProjects[i].id;
            // projectTitle.setAttribute('contenteditable','true');
            for(let k=allTasks.length-1;k>=0;k--) {
                if(parseInt(allTasks[k].project)===parseInt(theProjects[i].id)) {
                    console.log('create div for individual task');
                    let partOfaProject = document.createElement('li');
                    partOfaProject.classList.add('partOfaProject');
                    partOfaProject.textContent=allTasks[k].title;
                    categoryOuter.appendChild(partOfaProject);
                }
            }
            projectEditIcon.addEventListener('click',editProjectName);
            projectTrashIcon.addEventListener('click',deleteProject);
            maincontent.appendChild(categoryOuter);
        }
    function editProjectName(e) {
        let target=e.currentTarget.previousSibling;
        target.setAttribute('contenteditable','true');
        target.focus();
        target.addEventListener('blur',stopEditProjectName);
        target.addEventListener('keydown',stopEditProjectName);
    }
    function stopEditProjectName(e) {
        if(e.type==='keydown' && e.key !=='Enter')return;
        e.currentTarget.setAttribute('contenteditable','false');
        let pid=e.currentTarget.parentElement.parentElement.getAttribute('data-id');
        let newName=e.currentTarget.textContent;
        if(newName==='')e.currentTarget.textContent='Default';
        projects.updateProjectName(pid,newName);
    }   
    function deleteProject(e) {
        
        let pName=e.currentTarget.parentElement.firstElementChild.textContent;
        let pid=e.currentTarget.parentElement.parentElement.getAttribute('data-id');
        let taskList=tasklogic.mytasks.tasksPerProject(pid);
        if(taskList.length>0) {
            let errorDiv = document.createElement('div');
            errorDiv.classList.add('errorDiv'); 
            let closeSvg = document.createElement('div');
            closeSvg.classList.add('closeSvg');
            closeSvg.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"/></svg>';
            let errorText = document.createElement('div');
            errorText.classList.add('errorText');
            errorText.textContent='You cannot delete a project with existing tasks';
            errorDiv.appendChild(errorText);
            errorDiv.appendChild(closeSvg);
            closeSvg.addEventListener('click',e=>errorDiv.remove());
            e.currentTarget.parentElement.appendChild(errorDiv);
        }
        else {
            projects.deleteProject(pName);
            showProjects();
        }
        
    }
    }
    function showCategories() {
        maincontent.innerHTML='';
        let allgroups=tasklogic.generateGroups();
        let overdue=allgroups.overdue;
        let today=allgroups.today;
        let tomorrow=allgroups.tomorrow;
        let upcomming=allgroups.upcomming;
        //Overdue
        if(overdue.length>0) {
            let overdue_ul=document.createElement('ul');
            overdue_ul.classList.add('overdue_ul', 'task_category');
            let overduetxt = document.createElement('div');
            overduetxt.classList.add('overduetxt', 'categorytxt');
            overduetxt.textContent="Overdue";
            maincontent.appendChild(overduetxt);
            overdue.forEach(x=>{
                let overdue_li=document.createElement('li');
                // overdue_li.classList.add('overdue_li', 'list_item');
                // overdue_li.textContent=x.title;
                // overdue_ul.appendChild(overdue_li);
                let card=createTaskCard(x);
                overdue_ul.appendChild(card);
            });
            maincontent.appendChild(overdue_ul);
        }
        //Today
        let today_ul=document.createElement('ul');
        today_ul.classList.add('today_ul', 'task_category');
        let todaytxt = document.createElement('div');
        todaytxt.classList.add('todaytxt', 'categorytxt');
        todaytxt.textContent="Today";
        maincontent.appendChild(todaytxt);
        today.forEach(x=> {
            let today_li=document.createElement('li');
            // today_li.classList.add('today_li', 'list_item');
            // today_li.textContent=x.title;
            // today_ul.appendChild(today_li);
            let card=createTaskCard(x,'none');
            today_ul.appendChild(card);
        });
        maincontent.appendChild(today_ul);
        //Tomorrow
        if(tomorrow.length>0) {
            let tomorrow_ul=document.createElement('ul');
            tomorrow_ul.classList.add('tomorrow_ul', 'task_category');
            let tomorrowtxt = document.createElement('div');
            tomorrowtxt.classList.add('tomorrowtxt', 'categorytxt');
            tomorrowtxt.textContent="Tomorrow";
            maincontent.appendChild(tomorrowtxt);
            tomorrow.forEach(x=> {
                let tomorrow_li=document.createElement('li');
                // tomorrow_li.classList.add('tomorrow_li', 'list_item');
                // tomorrow_li.textContent=x.title;
                // tomorrow_ul.appendChild(tomorrow_li);
                let card=createTaskCard(x,'tomorrow');
                tomorrow_ul.appendChild(card);
            });
            maincontent.appendChild(tomorrow_ul);
        }
        
        //Upcomming
        if(upcomming.length>0) {
            let upcomming_ul=document.createElement('ul');
            upcomming_ul.classList.add('upcomming_ul', 'task_category');
            let upcommigntxt = document.createElement('div');
            upcommigntxt.classList.add('upcommigntxt', 'categorytxt');
            upcommigntxt.textContent="Upcomming";
            maincontent.appendChild(upcommigntxt);
            upcomming.forEach(x=> {
                let upcomming_li=document.createElement('li');
                // upcomming_li.classList.add('upcomming_li', 'list_item');
                // upcomming_li.textContent=x.title;
                // upcomming_ul.appendChild(upcomming_li);
                let card=createTaskCard(x);
                upcomming_ul.appendChild(card);
            });
            maincontent.appendChild(upcomming_ul);
        }
        
    
    }
    function check(e) {
        if(e.currentTarget.hasAttribute('data-checked')) {
            e.currentTarget.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30Z"/></svg>';
            e.currentTarget.removeAttribute('data-checked');
        }
        else {
            e.currentTarget.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M20.95 31.95 35.4 17.5l-2.15-2.15-12.3 12.3L15 21.7l-2.15 2.15ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30ZM9 9v30V9Z"/></svg>';
            e.currentTarget.setAttribute('data-checked', 'true');
            validateDone(e);
        }
    }
    function deleteTask(e) {
        let outer=e.currentTarget.parentElement;
        outer.innerHTML='';
        outer.classList.add('squeeze');
        let id=outer.getAttribute('data-id');
        setTimeout(()=> {
            tasklogic.mytasks.deleteTask(id);   
            showCategories();        
        },500);
    }
    function validateDone(e) {
        let outer=e.currentTarget.parentElement;
        // outer.classList.add('validate');
        // outer.innerHTML='';
        let id=outer.getAttribute('data-id');
        setTimeout(()=>{            
            outer.classList.add('validate');
        outer.innerHTML='';
             
         },700);
         setTimeout(()=> {
            tasklogic.mytasks.validateTask(id); 
            showCategories();
         },1400);
    }
    function editTask(e) {
        edittaskmodule.displayedit(e);
    }
    function createTaskCard(t,option='') {
        let taskcard = document.createElement('div');
        taskcard.classList.add('taskcard');
        let checkbox = document.createElement('div');
        checkbox.classList.add('checkbox');
        let prio = document.createElement('div');
        prio.classList.add('prio');
        let project = document.createElement('div');
        project.classList.add('project');
        let tasktitle = document.createElement('div');
        tasktitle.classList.add('tasktitle');
        let taskdescription = document.createElement('div');
        taskdescription.classList.add('taskdescription');
        let deadline = document.createElement('div');
        deadline.classList.add('deadline');
        let edit = document.createElement('div');
        edit.classList.add('edit');
        let trash = document.createElement('div');
        trash.classList.add('trash');
    
        // if(t.priority>0)prio.classList.add(`prio${t.priority}`);
        if(t.priority>0)taskcard.classList.add(`prio${t.priority}`);
        else taskcard.classList.add(`prio0`);
        taskcard.setAttribute('data-prio',`${t.priority}`);
        project.textContent=projects.getProjectName(t.project);
        tasktitle.textContent=t.title;
        taskdescription.textContent=t.description;
        checkbox.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30Z"/></svg>';
        edit.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 39h2.2l22.15-22.15-2.2-2.2L9 36.8Zm30.7-24.3-6.4-6.4 2.1-2.1q.85-.85 2.1-.85t2.1.85l2.2 2.2q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Zm-5.35-1.05-1.1-1.1 2.2 2.2Z"/></svg>';
        trash.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg>';
        if(option==='none')deadline.textContent='Today';
        else if(option==='tomorrow')deadline.textContent=new Date(t.dueDate).toDateString().slice(0,3);
        else if(t.dueDate==='')deadline.textContent='';
        else deadline.textContent=new Date(t.dueDate).toLocaleDateString();
    
        taskcard.appendChild(checkbox);
        taskcard.appendChild(tasktitle);
        taskcard.appendChild(taskdescription);
        taskcard.appendChild(prio);
        taskcard.appendChild(project);       
        
        taskcard.appendChild(deadline);
        taskcard.appendChild(edit);
        taskcard.appendChild(trash);
        taskcard.setAttribute('data-id',t.id);
        checkbox.addEventListener('mouseup',check);
        trash.addEventListener('click',deleteTask);
        edit.addEventListener('click',editTask);
        return taskcard;
    }
    
    //----
    return {showCategories, showProjects, showLists};
})();
