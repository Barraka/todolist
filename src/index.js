let addtask = document.querySelector('.adddiv');
addtask.addEventListener('click', addmenu.showmodal);
let home = document.querySelector('.home');
home.addEventListener('click', taskDom.showCategories);
let projectsllink = document.querySelector('.projects');
projectsllink.addEventListener('click', taskDom.showProjects);
let lists = document.querySelector('.lists');
lists.addEventListener('click', taskDom.showLists);


// tasklogic.mytasks.newTask({'title':"a",'description':"",'dueDate':'2022-09-05','priority':'2','project':""});
// tasklogic.mytasks.newTask({'title':"Read a book",'description':"",'dueDate':'2022-10-14','priority':'1','project':""});
// tasklogic.mytasks.newTask({'title':"c",'description':"",'dueDate':'2022-10-08','priority':'3','project':""});
// tasklogic.mytasks.newTask({'title':"Take out the trash",'description':"",'dueDate':'2022-10-05','priority':'','project':""});
// tasklogic.mytasks.newTask({'title':"e",'description':"",'dueDate':'2022-10-08','priority':'','project':""});
// tasklogic.mytasks.newTask({'title':"f",'description':"",'dueDate':'2022-10-07','priority':'','project':""});
// tasklogic.mytasks.newTask({'title':"g",'description':"",'dueDate':'2022-10-06','priority':'','project':""});

taskDom.showCategories();