class Project {
    constructor(name) {
        this.name = name;
    }
}

export const projects = JSON.parse(localStorage.getItem("projects")) || new Project("Main");

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
        event.preventDefault();

        const input = form.querySelector(".project-name");
        const projectName = input.value.trim();

        if (projectName) {
            input.value = "";

            dialog.close();

            // Create the project
            const project = new Project(projectName);
            // Add the project to the list of projects
            projects.push(project);
            // Update local storage
            saveToStorage(projects);

            return projects;
        }
    });
}

// Save projects to localStorage
function saveToStorage(listOfprojects) {
    return localStorage.setItem("projects", JSON.stringify(listOfprojects));
}

// Iterate over save project and append them to the container
// export function renderProjects(container, projects) {
//     for (let i = 0; i < projects.length; i++) {
//         const project = projects[i];

//         // Create the li
//         const listItem = document.createElement(li);

//         listItem.classList.add("nav-link");
//         listItem.classList.add("sub-project");
//         listItem.innherHtml = `<h4>${project}</h4>`

//         container.appendChild(listItem);
//     }

//     return container;
// }


// from index.js
console.log(handleProjectCreation(".project-form", ".new-project-dialog"));

// Get the container of the projects
// const projectsContainer = document.querySelector(".nav-list");
// projectsContainer.innerHTML = renderProjects(container, projects);