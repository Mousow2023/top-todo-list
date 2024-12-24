import { Todo, todoManager } from "./todoManager.js";
import { projectManager } from "./projectManager.js";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const todoDom = {
    rederPriorities(container) {
        const priorities = Todo.priorities;

        container.innerHTML = `
        <option disabled selected>Select Priority</option>
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
        <option disabled selected>Select Project</option>
        ${projects
                .map(proj => `
                <option>${capitalizeFirstLetter(proj.name)}</option>
            `)
                .join("")}
        `;
    }
}