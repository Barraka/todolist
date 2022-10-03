let addtask = document.querySelector('.adddiv');
addtask.addEventListener('click', addmenu.showmodal);


tasklogic.mytasks.newTask({'title':"a",'description':"A thing to do",'dueDate':'2022-09-05','priority':'2','project':"myProject"});
tasklogic.mytasks.newTask({'title':"b",'description':"",'dueDate':'2022-09-04','priority':'1','project':""});
tasklogic.mytasks.newTask({'title':"c",'description':"o",'dueDate':'2022-09-08','priority':'3','project':""});
tasklogic.mytasks.newTask({'title':"d",'description':"in",'dueDate':'2022-10-03','priority':'','project':""});
tasklogic.mytasks.newTask({'title':"e",'description':"",'dueDate':'2022-10-03','priority':'','project':"other"});
tasklogic.mytasks.newTask({'title':"f",'description':"",'dueDate':'2022-10-04','priority':'','project':""});
tasklogic.mytasks.newTask({'title':"g",'description':"6",'dueDate':'2022-10-05','priority':'','project':""});
// tasklogic.mytasks.newTask("b","",'2022-09-04','');
// tasklogic.mytasks.newTask("c","",'2022-09-08','');
// tasklogic.mytasks.newTask("d","",'2022-10-03','');
// tasklogic.mytasks.newTask("e","",'2022-10-03','');
// tasklogic.mytasks.newTask("f","",'2022-10-04','');
// tasklogic.mytasks.newTask("g","",'2022-10-05','');

// tasklogic.generateGroups();
taskDom.showCategories();