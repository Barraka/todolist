import './styles.css';
import './addtask.css';
import taskDom from './taskDom.js';
import addmenu from './addmenu.js';

let addtask = document.querySelector('.adddiv');
addtask.addEventListener('click', addmenu.showmodal);
let home = document.querySelector('.home');
home.addEventListener('click', taskDom.showCategories);
let projectsllink = document.querySelector('.projects');
projectsllink.addEventListener('click', taskDom.showProjects);
let lists = document.querySelector('.lists');
lists.addEventListener('click', taskDom.showLists);

taskDom.showCategories();