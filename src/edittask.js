let trythis=1;
//----Add task layout
let edittaskmodule=(()=> {
    
    // let modal = document.querySelector('.taskcontainer');
    // modal.classList.remove('taskcontainerhidden');
    // modal.classList.add('taskcontainervisible');
    let maincontent = document.querySelector('.maincontent');
    let priochosen='';
    let prioritylabel2;
    let priorityinput;
    let titleinput;
    let descriptioninput;
    let deadlineinput;
    let projectinput="";
    let projectddl;

    let this_id;
    function displayedit(e) {   
        //Create divs & cancel button
        let modalouter = document.createElement('div');
        modalouter.classList.add('modalouter');
        let modalbody = document.createElement('div');
        modalbody.classList.add('modalbody');   
        this_id=e.currentTarget.parentElement.getAttribute('data-id');
        let this_task=tasklogic.mytasks.retrieveTask(this_id);
        priochosen=parseInt(e.currentTarget.parentElement.getAttribute('data-prio'));
        modalbody.innerHTML="";
        let cancel = document.createElement('div');
        cancel.classList.add('cancel');
        cancel.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"/></svg>';
        modalbody.appendChild(cancel);
        
        //Task title
        let modaltitle = document.createElement('div');
        modaltitle.classList.add('modaltitle');
        let titleouter = document.createElement('div');
        titleouter.classList.add('formouter');
        let titlelabel = document.createElement('label');
        titlelabel.classList.add('formlabel');
        titleinput = document.createElement('input');
        titleinput.classList.add('forminput');
        titlelabel.for="title";
        titleinput.id="title";
        titleinput.placeholder="Your Task";
        titleinput.required=true;
        titleinput.type="text";
        titleinput.setCustomValidity('Enter the task you want to set');
        
        //Description
        let descriptionouter = document.createElement('div');
        descriptionouter.classList.add('formouter');
        let descriptionlabel = document.createElement('label');
        descriptionlabel.classList.add('formlabel');
        descriptioninput = document.createElement('textarea');
        descriptioninput.classList.add('forminput');
        descriptionlabel.for="desc";
        descriptioninput.id="desc";
        descriptioninput.placeholder="A brief description...";
        descriptioninput.type="text";
        descriptioninput.rows=2;
        
        //Priority
        let priorityouter = document.createElement('div');
        priorityouter.classList.add('formouter');
        let prioritylabel = document.createElement('label');
        prioritylabel.classList.add('formlabel');
        prioritylabel2 = document.createElement('div');
        prioritylabel2.classList.add('priohint');
        priorityinput = document.createElement('div');
        priorityinput.classList.add('priorityinput');
        let prio1 = document.createElement('div');
        let prio2 = document.createElement('div');
        let prio3 = document.createElement('div');        
        prioritylabel.textContent="Set priority:";
        priorityinput.appendChild(prio1);
        priorityinput.appendChild(prio2);
        priorityinput.appendChild(prio3);
        prio1.classList.add('prioitem', 'prio1');
        prio2.classList.add('prioitem', 'prio2');
        prio3.classList.add('prioitem', 'prio3');
        prio1.setAttribute('data-prio','1');
        prio2.setAttribute('data-prio','2');
        prio3.setAttribute('data-prio','3');
        
        //Project
        // let joinproject = document.createElement('div');
        // joinproject.classList.add('joinproject');
        // let projectddl = document.createElement('select');
        // joinproject.classList.add('projectddl');
        // joinproject.appendChild(projectddl);
        // joinproject.textContent="Add to project:";

        let joinproject = document.createElement('div');
        joinproject.classList.add('joinproject');
        let ddlist=projects.getProject();
        if(ddlist.length) {
            projectddl = document.createElement('select');
            //set empty default
            let optiondiv = document.createElement('option');
            optiondiv.classList.add('optiondiv');
            optiondiv.setAttribute('value',``);
            optiondiv.textContent='';
            projectddl.appendChild(optiondiv);
            //populate with existing projects
            for(let i=ddlist.length-1;i>=0;i--) {
                let optiondiv = document.createElement('option');
                optiondiv.classList.add('optiondiv');
                optiondiv.setAttribute('value',`${ddlist[i].name}`);
                optiondiv.textContent=ddlist[i].name;
                projectddl.appendChild(optiondiv);
                
                //if(projectinput===optiondiv.textContent)optiondiv.setAttribute('selected');
            }            
        }
        else projectddl = document.createElement('div');
        projectddl.classList.add('projectddl');
        //create drop-down list
        if(ddlist.length===0) projectddl.textContent='No project created';
        let createProject = document.createElement('div');
        createProject.classList.add('createProject');
        createProject.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>';

        joinproject.textContent="Add to project:";
        joinproject.appendChild(projectddl);
        joinproject.appendChild(createProject);        
        createProject.addEventListener('click',showAddProject);
        

        //Deadline
        let deadlineouter = document.createElement('div');
        deadlineouter.classList.add('formouter');
        let deadlinelabel = document.createElement('label');
        deadlinelabel.classList.add('formlabel');
        deadlineinput = document.createElement('input');
        deadlineinput.classList.add('forminput');
        deadlinelabel.textContent="Due:";
        deadlineinput.type="date";
        
        //Retrive existing info
        titleinput.value=this_task.title;
        descriptioninput.value=this_task.description;
        titleinput.value=this_task.title;
        projectddl=this_task.project;
        deadlineinput.value=this_task.dueDate;
        
        //Submit button
        let submit = document.createElement('div');        
        submit.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M21.05 33.1 35.2 18.95l-2.3-2.25-11.85 11.85-6-6-2.25 2.25ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"/></svg>';        
        submit.classList.add('submit');
        
        modalbody.appendChild(modaltitle);
        titleouter.appendChild(titlelabel);
        titleouter.appendChild(titleinput);
        modalbody.appendChild(titleouter);
        descriptionouter.appendChild(descriptionlabel);
        descriptionouter.appendChild(descriptioninput);
        modalbody.appendChild(descriptionouter);
        priorityouter.appendChild(prioritylabel);
        priorityouter.appendChild(prioritylabel2);
        priorityouter.appendChild(priorityinput);
        modalbody.appendChild(priorityouter);
        modalbody.appendChild(joinproject);
        deadlineouter.appendChild(deadlinelabel);
        deadlineouter.appendChild(deadlineinput);
        modalbody.appendChild(deadlineouter);        
        modalbody.appendChild(submit);

        modalouter.appendChild(modalbody);
        maincontent.appendChild(modalouter);

        modaltitle.textContent='Edit task:';
        

        if(priochosen>0) {
            eval(`prio${priochosen}`).classList.add('prioselect');
        }
        // e.target.classList.add('prioselect');

        submit.addEventListener('click',modifytask);
        cancel.addEventListener('click',erasefields);
        prio1.addEventListener('click',chooseprio);
        prio2.addEventListener('click',chooseprio);
        prio3.addEventListener('click',chooseprio);
        prio1.addEventListener('mouseover',priohintOver);
        prio1.addEventListener('mouseout',priohintOut);
        prio2.addEventListener('mouseover',priohintOver);
        prio2.addEventListener('mouseout',priohintOut);
        prio3.addEventListener('mouseover',priohintOver);
        prio3.addEventListener('mouseout',priohintOut);
        // addmenu.setinitialStyle();
        titleinput.focus();
        
    }
    function showAddProject() {
        let joinproject = document.querySelector('.joinproject');
        let projectDiv = document.createElement('div');
        projectDiv.classList.add('projectDiv');
        let projectDivName = document.createElement('div');
        projectDivName.classList.add('projectDivName');
        let projectDivInput = document.createElement('input');
        projectDivInput.classList.add('projectDivInput');
        let projectDivSvg = document.createElement('div');
        projectDivSvg.classList.add('projectDivSvg');
        projectDivSvg.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>';
        projectDivName.textContent='New project:';
        projectDiv.appendChild(projectDivName);
        projectDiv.appendChild(projectDivInput);
        projectDiv.appendChild(projectDivSvg);
        joinproject.appendChild(projectDiv);
        projectDiv.classList.add('projectDivAdd');
        projectDivSvg.addEventListener('click',taskAppendProject);
    }
    function taskAppendProject() {
        let joinproject = document.querySelector('.joinproject');
        let projectDiv = document.querySelector('.projectDiv');
        let projectddl = document.querySelector('.projectddl');
        let newProjectName=document.querySelector('.projectDivInput').value;
        projectinput=newProjectName;
        projects.addProject(newProjectName);
        projectDiv.remove();
        let ddlist=projects.getProject();
        if(ddlist.length) {
            projectddl.remove();
            projectddl=document.querySelector('select');
            if(projectddl===null)projectddl = document.createElement('select');
            //set empty default
            let optiondiv = document.createElement('option');
            optiondiv.classList.add('optiondiv');
            optiondiv.setAttribute('value',`${newProjectName}`);
            optiondiv.textContent=newProjectName;
            projectddl.appendChild(optiondiv);
            joinproject.appendChild(projectddl);
        }
    }
    
    function erasefields() {
        let modalouter = document.querySelector('.modalouter');
        modalouter.remove();
        // let modalbody=document.querySelector('.modalbody');
        // let inputs = modalbody.querySelectorAll('input');
        // for(ele of inputs)ele.value="";
        // addmenu.hidemodal();
    }
    
    function modifytask() {
        if(titleinput.value==="") {
            titleinput.reportValidity();
        }
        else {
            let returntask= {title:titleinput.value,description:descriptioninput.value, dueDate:deadlineinput.value, priority:priochosen,project:projectinput};
            erasefields();
            tasklogic.mytasks.editTask(this_id,returntask);            
            taskDom.showCategories();
        }
    }
    function chooseprio(e) {
        if(priochosen===parseInt(e.target.getAttribute('data-prio'))) {
            priochosen='';
            e.target.classList.remove('prioselect');
        }
        else {
            priochosen=parseInt(e.target.getAttribute('data-prio'));
            for(x of priorityinput.children)x.classList.remove('prioselect');
            e.target.classList.add('prioselect');
        }
    }
        
    function priohintOver(e) {
        let temp=parseInt(e.target.getAttribute('data-prio'));
        let val;
        if(temp===1)val='low';
        if(temp===2)val='medium';
        if(temp===3)val='high';
        prioritylabel2.textContent=val;
    }
    function priohintOut() {
        prioritylabel2.textContent='';
    }
    // ----
    return {displayedit}
    
})();