// TODO Logic
const listOfProject = [];

// The Todo object
class Todo {
    static priorities = ["low", "medium", "high"];

    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

const defaultProject = new Project("Default");
listOfProject.push(defaultProject);


// Probably from the todo form
let title = "title";
let description = "";
let dueDate = "20-12-2024";
let priority = "High";
let project = "";

const testValues = [title, description, dueDate, priority, project];

const todo = new Todo(...testValues);

// function valuesAreValid(todoList) {
//     // Check if the project is not empty and valid
//     if (todoList.project === "") {
//         todoList.project = defaultProject;
//     } else {
//         if (!listOfProject.includes(todoList.project)) {
//             alert("Invalid project");
//             return false;
//         }
//     }

//     // Check if the name is not empty
//     if (todoList.title === "") {
//         // alert("Invalid title");
//         return false;
//     }

//     // Check if the due date is a valid date and is not a past date
//     if (todoList.dueDate === "") {
//         // alert("Invalid dueDate");
//         return false;
//     }

//     // Check if the priority is in the list of prioties
//     if (!todoList.priorities.includes(todo.priority.toLowerCase())) {
//         // alert("Invalid priority");
//         return false;
//     }

//     return true;
// }

// console.log(valuesAreValid(todo))

// function createTodo() {
//     if (valuesAreValid(todo)) {
//         return todo;
//     } else {
//         return false;
//     }
// }

// console.log(createTodo());

// projects.js
class Project {
    constructor(name) {
        this.name = name;
    }
}

export const projects = getProjects()

export function displayProjectDialog() {
    // The new project dialog
    const projectDialog = document.querySelector(".new-project-dialog");
    const showDialogButton = document.querySelector(".new-project");
    const closeDialogButton = document.querySelector(".cancel-button");

    showDialogButton.addEventListener("click", () => {
        projectDialog.showModal();
    });

    closeDialogButton.addEventListener("click", () => {
        projectDialog.close();
    });
}

export function handleProjectCreation(formSelector, dialogSelector) {
    const form = document.querySelector(formSelector);
    const dialog = document.querySelector(dialogSelector)

    form.addEventListener("submit", (event) => {
        localStorage.removeItem('projects');

        event.preventDefault();

        const input = form.querySelector(".project-name");
        const projectName = input.value.trim();

        if (projectName) {
            input.value = "";

            dialog.close();

            // Create the project if it does not exist already
            for (let i = 0; i < projects.length; i++) {
                const element = projects[i];
                if (element.name.toLowerCase() == projectName.toLowerCase()) {
                    return alert("Project already exist");
                }
            }

            const project = new Project(projectName);

            // Add the project to the list of projects
            projects.push(project);
            // Update local storage
            localStorage.setItem("projects", JSON.stringify(projects));

            // Render the projects from localStorage
            renderProjects(document.querySelector(".nav-list"), getProjects());
        }
    });

    return getProjects();
}

// Iterate over save project and append them to the container
export function renderProjects(container, projects) {
    const accumulator = [];
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];

        accumulator.push(`
            <li class="nav-link sub-project">
                <h4>${project.name}</h4>
            </li>
        `);

        // Create the li
        const listItem = document.createElement("li");

        listItem.classList.add("nav-link");
        listItem.classList.add("sub-project");
        listItem.innerHTML = `<h4>${project.name}</h4>`;
    }

    container.innerHTML = accumulator.join("");
}

export function getProjects() {
    return JSON.parse(localStorage.getItem("projects")) || [new Project("Main")];
}

handleIconDisplay(container) {
    container.addEventListener("mouseenter", (event) => {
        const projectElement = event.target.closest(".projects-container");
        if (projectElement) {
            const icons = projectElement.querySelector(".icons");
            icons.style.display = "flex";
        }
    }, true)

    container.addEventListener("mouseleave", (event) => {
        const projectElement = event.target.closest(".sub-project");
        if (projectElement) {
            const icons = projectElement.querySelector(".icons");
            icons.style.display = "none";
        }
    }, true)
}