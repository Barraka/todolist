
let addmenu=(()=>{    
    function createmenu() {
        let taskcontainer = document.createElement('div');
        taskcontainer.classList.add('taskcontainer');
        taskcontainer.classList.add('taskcontainerhidden');
        let taskcontainerinner = document.createElement('div');
        taskcontainerinner.classList.add('taskcontainerinner');
        let addoptions = document.createElement('div');
        addoptions.classList.add('addoptions');
        let newtask = document.createElement('div');
        newtask.classList.add('newtask', 'newitem');
        let newproject = document.createElement('div');
        newproject.classList.add('newproject', 'newitem');
        let newlist = document.createElement('div');
        newlist.classList.add('newlist', 'newitem');
        newtask.textContent="New Task";
        newproject.textContent="New Project";
        newlist.textContent='New List';
        let modalbody = document.createElement('div');
        modalbody.classList.add('modalbody');        
        taskcontainer.appendChild(taskcontainerinner);
        addoptions.appendChild(newtask);
        addoptions.appendChild(newproject);
        addoptions.appendChild(newlist);
        taskcontainerinner.appendChild(addoptions);
        taskcontainerinner.appendChild(modalbody);
        newtask.addEventListener('click',newtaskmodule);
        newproject.addEventListener('click',newprojectmodule);
        newlist.addEventListener('click',newlistmodule);
        newtask.addEventListener('click',newtaskmodule.displaytask);
        newproject.addEventListener('click',manangeMenuStyles);
        newlist.addEventListener('click',manangeMenuStyles);
        newtask.addEventListener('click',manangeMenuStyles);
        let linkcontent = document.querySelector('.links');
        linkcontent.appendChild(taskcontainer);
        removeMenuStyles();
        setinitialStyle();
    }
    function manangeMenuStyles(e=newtask) {        
        removeMenuStyles();
        e.currentTarget.classList.add('menuSelected');
    }
    function removeMenuStyles() {
        let addoptions = document.querySelector('.addoptions');
        for(let x of addoptions.children)x.classList.remove('menuSelected');
    }
    function setinitialStyle() {
        let newtask = document.querySelector('.newtask');
        newtask.classList.add('menuSelected');
    }
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
    }    
    return {createmenu, showmodal,hidemodal};
})();
