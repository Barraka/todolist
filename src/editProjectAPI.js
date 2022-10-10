import {projects} from './tasklogic.js';

let apiGenerator = (function() {
    function createElement() {
        let joinproject = document.createElement('div');
        joinproject.classList.add('joinproject');
        let ddlist=projects.getProject();
        let projectddl;
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
                optiondiv.setAttribute('data-pid',`${ddlist[i].id}`);
                optiondiv.textContent=ddlist[i].name;
                projectddl.appendChild(optiondiv);                
            }            
        }
        else projectddl = document.createElement('div');
        projectddl.classList.add('projectddl');
        //create drop-down list
        if(ddlist.length===0) projectddl.textContent='No existing project';        
        let createProject = document.createElement('div');
        createProject.classList.add('createProject');
        createProject.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg>';
        joinproject.textContent="Add to project:";
        joinproject.appendChild(projectddl);
        joinproject.appendChild(createProject);        
        createProject.addEventListener('click',showAddProject);
        return joinproject;
    }  
    //If the user has selected to add a new project:
    function showAddProject() {
        //Create elements:
        let joinproject = document.querySelector('.joinproject');
        let projectDiv = document.createElement('div');
        projectDiv.classList.add('projectDiv');
        projectDiv.classList.add('projectDivAdd');
        let projectDivName = document.createElement('div');
        projectDivName.classList.add('projectDivName');
        let projectDivInput = document.createElement('input');
        projectDivInput.classList.add('projectDivInput');
        let addAndCancel = document.createElement('div');
        addAndCancel.classList.add('addAndCancel');
        let cancelCreateProject = document.createElement('div');
        cancelCreateProject.classList.add('cancelCreateProject');
        cancelCreateProject.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"/></svg>';
        let projectDivSvg = document.createElement('div');
        projectDivSvg.classList.add('projectDivSvg');
        projectDivSvg.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M21.05 33.1 35.2 18.95l-2.3-2.25-11.85 11.85-6-6-2.25 2.25ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"/></svg>';
        projectDivName.textContent='New project:';

        //Mount elements:
        addAndCancel.appendChild(projectDivSvg);
        addAndCancel.appendChild(cancelCreateProject);
        projectDiv.appendChild(projectDivName);
        projectDiv.appendChild(projectDivInput);
        projectDiv.appendChild(addAndCancel);
        joinproject.appendChild(projectDiv);        
        projectDivSvg.addEventListener('click',taskAppendProject);
        cancelCreateProject.addEventListener('click',taskCancelProject);    
        projectDivInput.focus();    
    }
    function taskCancelProject() {
        let projectDiv = document.querySelector('.projectDiv');
        projectDiv.remove();
    }
    function taskAppendProject() {
        let joinproject = document.querySelector('.joinproject');
        let projectDiv = document.querySelector('.projectDiv');
        let projectddl = document.querySelector('.projectddl');
        let thisInput = document.querySelector('.projectDivInput');
        thisInput.setCustomValidity('This field must not be empty');
        let newProjectName=thisInput.value;
        // projectinput=newProjectName;
        if(newProjectName==='') {
            thisInput.reportValidity();
            return;
        }
        projects.addProject(newProjectName);
        projectDiv.remove();
        let ddlist=projects.getProject();
        if(ddlist.length) {
            joinproject.innerHTML='';
            projectddl = document.createElement('select');
            //populate with existing projects
            for(let i=ddlist.length-1;i>=0;i--) {
                let optiondiv = document.createElement('option');
                optiondiv.classList.add('optiondiv');
                optiondiv.setAttribute('value',`${ddlist[i].name}`);
                optiondiv.setAttribute('data-pid',`${ddlist[i].id}`);
                optiondiv.textContent=ddlist[i].name;
                projectddl.appendChild(optiondiv);                
            }
            projectddl.selectedIndex=0;
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
    }
    //----
    return{createElement};
}());

export default apiGenerator;
