'use strict';

let addButton = document.getElementById("Add");
let removeButton = document.getElementById("Remove");

addButton.addEventListener("click", addTask);
removeButton.addEventListener("click", removeTask);

function addTask() {
  // Get the element where you want to add the task
  let tasksElement = document.getElementById("tasks");

  let task = prompt("Enter task:");

  let newTaskElement = document.createElement("li");

  newTaskElement.textContent = task;

  tasksElement.appendChild(newTaskElement);
}


function removeTask() {
  // Get the tasks element
  let tasksElement = document.getElementById("tasks");

  tasksElement.innerHTML = "";
}
