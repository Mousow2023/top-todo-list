import { projectDOM } from "./projectsDOM.js";
import { todoDom } from "./todoDOM.js";
import "./styles.css";
import "./reset.css";

// Initialize the projects section
projectDOM.setupProjectDialog(".new-project-dialog", ".new-project", ".cancel-button");
projectDOM.handleProjectForm(".project-form", ".new-project-dialog", ".nav-list");

// Render the projects on load
const projectsContainer = document.querySelector(".nav-list");
projectDOM.renderProjects(projectsContainer);
;

// Render the priorities on load
const prioritiesContainer = document.querySelector(".priorities-container");
console.log(prioritiesContainer);
todoDom.rederPriorities(prioritiesContainer);


// The new todo dialog
const newTodoButton = document.querySelector(".new-task");
const todoDialog = document.querySelector(".new-todo-dialog");
const closeTodoDialog = document.querySelector(".close-todo-dialog");

newTodoButton.addEventListener("click", () => {
    todoDialog.showModal();
})

closeTodoDialog.addEventListener("click", () => {
    todoDialog.close();
});


// try to see the date inside the new todo form
const dialog = document.querySelector(".new-todo-dialog");
const form = dialog.querySelector("form");
form.addEventListener("submit", () => {
    const title = document.getElementById("title").value;
    const priority = document.getElementById("priority").value;
    const dueDate = document.getElementById("due-date").value;
    const description = document.getElementById("description").value;

    const todo = { title, priority, dueDate, description };
    console.log(todo);
});
