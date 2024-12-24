import { Todo, todoManager } from "./todoManager.js";

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
    }
}