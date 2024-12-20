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
