import { projectDOM } from "./projectsDOM.js";
import { todoDom } from "./todoDOM.js";
import {todoSorter} from "./sorter.js";
import { performanceDom } from "./performanceDom.js";
import "./styles.css";
import "./reset.css";


// Initialize the projects section
projectDOM.setupProjectDialog(".new-project-dialog", ".new-project", ".cancel-button");
projectDOM.handleProjectForm(".project-form", ".new-project-dialog", ".nav-list");

// Render the projects on load
const projectsContainer = document.querySelector(".nav-list");
projectDOM.renderProjects(projectsContainer);
;

// Render the todos on load
const todosContainer = document.querySelector(".todos-container");
todoDom.checkMissedTodos(todosContainer);

// Render the projects and properties in the form
const newTaskButton = document.querySelector(".new-task");
newTaskButton.addEventListener("click", () => {
    // Render the priorities in the form when when it opens
    const prioritiesContainer = document.querySelector(".priorities-container");
    todoDom.rederPriorities(prioritiesContainer);

    // Render the projects in the form when it opens
    const formProjectsContainer = document.querySelector(".projects-container");
    todoDom.renderProjects(formProjectsContainer);
});

// Handle the submission of a todo
const dialog = document.querySelector(".new-todo-dialog");
todoDom.handleTodoSubmission(dialog, todosContainer);

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

const todayButton = document.querySelector(".today");
const allButton = document.querySelector(".all");
const ongoingButton = document.querySelector(".ongoing");
const completedButton = document.querySelector(".completed");

// render the todos for today
todayButton.addEventListener("click", () => {
    todoDom.renderTodos(todosContainer, todoSorter.today())
});

// render the yet to be completed todos
ongoingButton.addEventListener("click", () => {
    todoDom.renderTodos(todosContainer, todoSorter.ongoing())
});

// render the completed todos
completedButton.addEventListener("click", () => {
    todoDom.renderTodos(todosContainer, todoSorter.completed())
})

// render all the todos
allButton.addEventListener("click", () => {
    todoDom.renderTodos(todosContainer);
})

// render the performace box
const performaceBoxContainer = document.querySelector(".performance-box");
performanceDom.renderPerformanceBox(performaceBoxContainer);