import { projectManager } from "./projectManager.js";

export const projectDOM = {
    renderProjects(container) {
        const projects = projectManager.getProjects();

        container.innerHTML = projects
            .map(project => `
                <li class="nav-link sub-project">
                    <h4>${project.name}</h4>
                    <div class="icons">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>edit</title>
                                <path
                                    d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>delete</title>
                                <path
                                    d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                            </svg>
                        </div>
                </li>
            `)
            .join("");
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
    }
}