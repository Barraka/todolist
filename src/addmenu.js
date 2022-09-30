
function addmenu() {
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
    
    
    let linkcontent = document.querySelector('.links');
    linkcontent.appendChild(taskcontainer);
}