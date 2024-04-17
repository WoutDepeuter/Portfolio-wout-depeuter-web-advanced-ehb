'use strict';

// Get the button element
let addButton = document.getElementById("Add");

// Add an event listener to the button
addButton.addEventListener("click", addTask);

// Function to execute when the button is clicked
function addTask() {
  // Get the element where you want to add the task
  let tasksElement = document.getElementById("Tasks");

  // Set the innerHTML of the tasks element to some text (replace "text" with the text you want to add)
  tasksElement.innerHTML = "New Task Added!";
}
