taskDom= (function() {
    let maincontent = document.querySelector('.maincontent');
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
            overdue_ul.textContent="Overdue";
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
        today_ul.textContent="Today";
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
            tomorrow_ul.textContent="Tomorrow";
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
            upcomming_ul.textContent="Upcomming";
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
        project.textContent=t.project;
        tasktitle.textContent=t.title;
        taskdescription.textContent=t.description;
        checkbox.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h30V9H9v30Z"/></svg>';
        edit.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M9 39h2.2l22.15-22.15-2.2-2.2L9 36.8Zm30.7-24.3-6.4-6.4 2.1-2.1q.85-.85 2.1-.85t2.1.85l2.2 2.2q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Zm-5.35-1.05-1.1-1.1 2.2 2.2Z"/></svg>';
        trash.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z"/></svg>';
        if(option==='none')deadline.textContent='Today';
        else if(option==='tomorrow')deadline.textContent=new Date(t.dueDate).toDateString().slice(0,3);
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
        return taskcard;
    }
    function validateDone(e) {
        let target=e.currentTarget.parentElement;
        setTimeout(()=>{
            target.innerHTML='';
            target.classList.add('validate');
            //tasklogic.mytasks.completeTask(id); 
            showCategories();
        },500);
    }
    //----
    return {showCategories};
})();
