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


//----Add task layout
let titleouter = document.createElement('div');
titleouter.classList.add('formouter');
let titlelabel = document.createElement('label');
titlelabel.classList.add('formlabel');
let titleinput = document.createElement('input');
titleinput.classList.add('forminput');

let descriptionouter = document.createElement('div');
descriptionouter.classList.add('descriptionouter');
let descriptionlabel = document.createElement('label');
descriptionlabel.classList.add('formlabel');
let descriptioninput = document.createElement('input');
descriptioninput.classList.add('forminput');

let priorityouter = document.createElement('div');
priorityouter.classList.add('priorityouter');
let prioritylabel = document.createElement('label');
prioritylabel.classList.add('formlabel');
let priorityinput = document.createElement('input');
priorityinput.classList.add('forminput');

let deadlineouter = document.createElement('div');
deadlineouter.classList.add('deadlineouter');
let deadlinelabel = document.createElement('label');
deadlinelabel.classList.add('formlabel');
let deadlineinput = document.createElement('input');
deadlineinput.classList.add('forminput');

let calendar = document.createElement('jsuites-calendar');
calendar.classList.add('deadlineouter');


let submit = document.createElement('div');
submit.classList.add('submit');

titleouter.appendChild(titlelabel);
titleouter.appendChild(titleinput);
modalbody.appendChild(titleouter);
descriptionouter.appendChild(descriptionlabel);
descriptionouter.appendChild(descriptioninput);
modalbody.appendChild(descriptionouter);
priorityouter.appendChild(prioritylabel);
priorityouter.appendChild(priorityinput);
modalbody.appendChild(priorityouter);
deadlineouter.appendChild(deadlinelabel);
deadlineouter.appendChild(deadlineinput);
modalbody.appendChild(deadlineouter);

modalbody.appendChild(calendar);
modalbody.appendChild(submit);


