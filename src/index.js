let addtask = document.querySelector('.adddiv');
addtask.addEventListener('click', addmenu.showmodal);
let home = document.querySelector('.home');
home.addEventListener('click', taskDom.showCategories);
let projectsllink = document.querySelector('.projects');
projectsllink.addEventListener('click', taskDom.showProjects);
let lists = document.querySelector('.lists');
lists.addEventListener('click', taskDom.showLists);


tasklogic.mytasks.newTask({'title':"a",'description':"A thing to do",'dueDate':'2022-09-05','priority':'2','project':"myProject"});
tasklogic.mytasks.newTask({'title':"Read a book",'description':"",'dueDate':'2022-10-14','priority':'1','project':""});
tasklogic.mytasks.newTask({'title':"c",'description':"o",'dueDate':'2022-10-08','priority':'3','project':""});
tasklogic.mytasks.newTask({'title':"Take out the trash",'description':"in",'dueDate':'2022-10-05','priority':'','project':""});
tasklogic.mytasks.newTask({'title':"e",'description':"",'dueDate':'2022-10-08','priority':'','project':"other"});
tasklogic.mytasks.newTask({'title':"f",'description':"",'dueDate':'2022-10-07','priority':'','project':""});
tasklogic.mytasks.newTask({'title':"g",'description':"6",'dueDate':'2022-10-06','priority':'','project':""});
// tasklogic.mytasks.newTask("b","",'2022-09-04','');
// tasklogic.mytasks.newTask("c","",'2022-09-08','');
// tasklogic.mytasks.newTask("d","",'2022-10-03','');
// tasklogic.mytasks.newTask("e","",'2022-10-03','');
// tasklogic.mytasks.newTask("f","",'2022-10-04','');
// tasklogic.mytasks.newTask("g","",'2022-10-05','');

// tasklogic.generateGroups();
taskDom.showCategories();