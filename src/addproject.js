import {projects} from './tasklogic';
import addmenu from './addmenu.js';
import taskDom from './taskDom.js';

export default function newprojectmodule() {
    let modalbody=document.querySelector('.modalbody');
    modalbody.innerHTML="";
    let cancel = document.createElement('div');
    cancel.classList.add('cancel');
    cancel.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z"/></svg>';
    modalbody.appendChild(cancel);
    let projectlabel = document.createElement('label');
    projectlabel.classList.add('projectlabel');
    let projectinput = document.createElement('textarea');
    projectinput.classList.add('projectinput');
    projectinput.placeholder="Your amazing new project";
    projectinput.rows=2;
    projectinput.required=true;
    // projectinput.type="text";
    projectlabel.textContent="What do you want to plan?"
    projectinput.setCustomValidity('Enter your new project');    
    let existingProjects = document.createElement('div');
    existingProjects.classList.add('existingProjects');
    existingProjects.textContent="Existing projects:";

    //Create an element for each existing project:
    let currentProjectList=projects.getProject();
    currentProjectList.forEach(x=> {
        let projectItem = document.createElement('div');
        projectItem.classList.add('projectItem');
        projectItem.textContent=x.name;
        existingProjects.appendChild(projectItem);
    });

    let projecthint = document.createElement('div');
    projecthint.classList.add('projecthint');
    if(currentProjectList.length===0)projecthint.innerHTML="&#128557 no projects yet...";    
    let submittask = document.createElement('div');    
    submittask.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" height="80" width="80" viewBox="0 0 50 50"><path d="M22.65 34h3v-8.3H34v-3h-8.35V14h-3v8.7H14v3h8.65ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm.05-3q7.05 0 12-4.975T41 23.95q0-7.05-4.95-12T24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24.05 41ZM24 24Z"/></svg>';    
    submittask.classList.add('submit');
    
    //Mount the elements:
    modalbody.appendChild(projectlabel);
    modalbody.appendChild(projectinput);
    modalbody.appendChild(existingProjects);
    modalbody.appendChild(projecthint);
    modalbody.appendChild(submittask);
    cancel.addEventListener('click',erasefields);
    submittask.addEventListener('click',appendProject);
    projectinput.focus();

    function erasefields() {
        let inputs = modalbody.querySelectorAll('input');
        for(ele of inputs)ele.value="";
        modalbody.innerHTML='';
        addmenu.hidemodal();
        
    }
    function appendProject() {
        if(projectinput.value==="") {
            projectinput.reportValidity();
        }
        else {
            projects.addProject(projectinput.value);
            projectinput.value="";
            let modalbody = document.querySelector('.modalbody');
            modalbody.innerHTML='';
            addmenu.hidemodal();
            taskDom.showCategories();
        }
    }
}
