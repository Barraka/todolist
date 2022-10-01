
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
        // manangeMenuStyles(newtask);
        setinitialStyle();
    }

    function manangeMenuStyles(e=newtask) {
        
        removeMenuStyles();
        // if(e.hasAttribute('class') && e.classList.contains('newtask'))newtask.classList.add('menuSelected');        
        // else e.currentTarget.classList.add('menuSelected');
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
    
    
    return {removeMenuStyles,manangeMenuStyles,createmenu, setinitialStyle};
})();
