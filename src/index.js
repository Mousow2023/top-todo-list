import { projectDOM } from "./projectsDOM.js";
import "./styles.css";
import "./reset.css";

// Initialize the projects section
projectDOM.setupProjectDialog(".new-project-dialog", ".new-project", ".cancel-button");
projectDOM.handleProjectForm(".project-form", ".new-project-dialog", ".nav-list");

// Render the projects
const projectsContainer = document.querySelector(".nav-list");
projectDOM.renderProjects(projectsContainer);


// The new todo dialog
const newTodoButton = document.querySelector(".new-task");
const todoDialog = document.querySelector(".new-todo-dialog");
const closeTodoDialog = document.querySelector(".close-todo-dialog");

newTodoButton.addEventListener("click", () => {
    todoDialog.showModal();
})

closeTodoDialog.addEventListener("click", () => {
    todoDialog.close();
})
