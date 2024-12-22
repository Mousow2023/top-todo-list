import { projectManager } from "./projectManager.js";

export const projectDOM = {
    renderProjects(container) {
        const projects = projectManager.getProjects();

        container.innerHTML = projects
            .map(project => `
                <li class="nav-link sub-project" data-project-name="${project.name}">
                    <h4>${project.name}</h4>
                    <div class="icons">
                        <svg class="update-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>edit</title>
                            <path
                                d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                        </svg>
                        <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>delete</title>
                            <path
                                d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>
                    </div>
                </li>
            `)
            .join("");

        // Attach event tisteners to delete icons
        this.handleProjectDeletion(container);

        // Attach event listener for project update
        this.handleProjectUpdate(container);
    },

    setupProjectDialog(dialogSelector, showButtonSelector, cancelButtonSelector) {
        const projectDialog = document.querySelector(dialogSelector);
        const showDialogButton = document.querySelector(showButtonSelector);
        const closeDialogButton = document.querySelector(cancelButtonSelector);

        showDialogButton.addEventListener("click", () => projectDialog.showModal());
        closeDialogButton.addEventListener("click", () => projectDialog.close());
    },

    handleProjectForm(formSelector, dialogSelector, containerSelector) {
        const form = document.querySelector(formSelector);
        const dialog = document.querySelector(dialogSelector);
        const container = document.querySelector(containerSelector);

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const input = form.querySelector(".project-name");
            const projectName = input.value.trim();

            if (!projectName) {
                return;
            }

            try {
                // Save the project to localStorage
                projectManager.addProject(projectName);
                this.renderProjects(container);
                dialog.close();
                input.value = "";
            } catch (error) {
                alert(error.message)
            }
        })
    },

    handleProjectDeletion(container) {
        container.addEventListener("click", (event) => {
            if (event.target.closest(".delete-icon")) {
                const projectElement = event.target.closest(".sub-project");
                const projectName = projectElement.dataset.projectName;

                try {
                    projectManager.deleteProject(projectName);
                    this.renderProjects(container);
                } catch (error) {
                    alert(error.message);
                };
            }
        });
    },

    handleProjectUpdate(container) {
        container.addEventListener("click", (event) => {
            if (event.target.closest(".update-icon")) {
                const projectElement = event.target.closest(".sub-project");

                const projects = projectManager.getProjects();
                const projectName = projectElement.dataset.projectName;
                const project = projects.find(project => project.name === projectName)

                if (!project) {
                    alert(`hangleUpdate did not find project`);
                    return;
                }

                this.setupUpdateDialog(project, ".update-project-dialog", container)
            }
        });
    },

    setupUpdateDialog(project, dialogSelector, projectsContainer) {
        const dialog = document.querySelector(dialogSelector);
        const cancelButton = dialog.querySelector(".cancel-button");
        const input = dialog.querySelector(".project-name");
        const form = dialog.querySelector("form");
        const projectName = project.name;

        dialog.showModal();

        input.value = projectName;

        function onSubmit(event) {
            event.preventDefault();

            // Get the new inputed name
            const newName = input.value.trim();

            // If the name hasn't change change close the dialog
            if (newName === projectName) {
                dialog.close();
            }

            // Check if the new name already exists
            const projects = projectManager.getProjects();
            if (projects.some(proj => proj.name === newName && proj.name !== projectName)) {
                return;
            }

            // Get the index of the project
            const index = projects.findIndex(p => p.name === projectName)
            projects[index].name = newName;

            projectManager.saveProjects(projects);
            this.renderProjects(projectsContainer);
            dialog.close();
        }

        form.addEventListener("submit", onSubmit.bind(this), { once: true })

        cancelButton.addEventListener("click", () => dialog.close())
    }
}