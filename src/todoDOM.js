import { Todo, todoManager } from "./todoManager.js";
import { projectManager } from "./projectManager.js";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const todoDom = {
    rederPriorities(container) {
        const priorities = Todo.priorities;

        container.innerHTML = `
        <option value="" disabled selected>Select Priority</option>
        ${priorities
                .map(prior => `
                <option>${capitalizeFirstLetter(prior)}</option>
            `)
                .join("")}
        `;
    },

    renderProjects(container) {
        const projects = projectManager.getProjects();

        container.innerHTML = `
        <option value="" disabled selected>Select Project</option>
        ${projects
                .map(proj => `
                <option>${capitalizeFirstLetter(proj.name)}</option>
            `)
                .join("")}
        `;
    },

    handleTodoSubmission(form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form);

            const todo = {
                title: formData.get("title").trim() || "",
                project: formData.get("project").trim() || "",
                priority: formData.get("priority").trim() || "",
                dueDate: formData.get("due-date").trim() || "",
                description: formData.get("description").trim() || ""
            }

            try {
                todoManager.addTodo(todo);
                console.log(`${todo.title} has been saved`);
                form.reset();
            } catch (error) {
                alert(error.message);
            }
        });
    },
}