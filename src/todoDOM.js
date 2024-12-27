import { Todo, todoManager } from "./todoManager.js";
import { projectManager } from "./projectManager.js";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const todoDom = {
    renderTodos(container) {
        const todos = todoManager.getTodos();

        container.innerHTML = todos
            .map(todo => `
                <div class="todo-container ${todo.isCompleted ? 'todo-completed' : ''}"data-todo-title=${todo.title.replace(/\s+/g, "-")}>
                    <div>
                        <h4 class="todo-name">${todo.title}</h4>
                        <p class="project-name">${todo.project}</p>
                    </div>
                    <div class="due-date-container">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>alarm</title>
                            <path
                                d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z" />
                        </svg>
                        <h4>${todo.dueDate}</h4>
                    </div>
                    <div class="priority-container">
                        <h5>${todo.priority}</h5>
                        <h4 class="${todo.priority.toLowerCase()}">High</h4>
                    </div>
                    <div class="todo-buttons">
                        <button class="mark-as-complete">Done</button>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                </div>
            `)
            .join("");

        // Attach event listener to the delete buttons
        this.deleteTodoDom(container);

        // Attach event listener to the done buttons
        this.completedTodoDom(container);
    },

    rederPriorities(container) {
        const priorities = Todo.priorities;

        container.innerHTML = `
        <option value="" disabled selected>Select Priority</option>
        ${priorities
                .map(prior => `
                <option>${capitalizeFirstLetter(prior)}</option>
            `)
                .join("")};
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

    handleTodoSubmission(dialog, container) {
        const form = dialog.querySelector("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form);

            const todo = {
                title: formData.get("title").trim(),
                description: formData.get("description").trim() || "",
                dueDate: formData.get("due-date").trim(),
                priority: formData.get("priority").trim(),
                project: formData.get("project").trim(),
            };

            try {
                todoManager.addTodo(todo);
                this.renderTodos(container);
                form.reset();
                dialog.close();
            } catch (error) {
                alert(error.message);
            }
        });
    },

    deleteTodoDom(container) {
        container.addEventListener("click", (event) => {
            if (event.target.closest(".delete")) {
                const todoElement = event.target.closest(".todo-container");
                const todoTitle = todoElement.dataset.todoTitle;

                // Find the todo
                const todos = todoManager.getTodos();
                const todo = todos.find(t => t.title.replace(/\s+/g, "-") === todoTitle);

                if (!todo) {
                    return;
                }

                // Delete and re-render
                todoManager.deleteTodo(todo);
                this.renderTodos(container);
            }
        });
    },

    completedTodoDom(container) {
        container.addEventListener("click", (event) => {
            if (event.target.closest(".mark-as-complete")) {
                const todoElement = event.target.closest(".todo-container");
                const todoTitle = todoElement.dataset.todoTitle;

                // Find the todo
                const todos = todoManager.getTodos();
                
                const todo = todos.find(t => t.title.replace(/\s+/g, "-") === todoTitle);
                
                if (!todo) {
                    return;
                }
                todoManager.completeTodo(todo);
                this.renderTodos(container);
                // location.reload();

            }
        });
    }

}