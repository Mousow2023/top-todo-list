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
            console.log(projectName);

            dialog.close();
            return projectName;
        }
    })
}