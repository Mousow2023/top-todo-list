import { Todo, todoManager } from "./todoManager.js";
import { projectManager } from "./projectManager.js";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export const todoDom = {
    renderTodos(container, todos = todoManager.getTodos()) {
        if (todos.length === 0) {
            container.innerHTML = `
                <h2 class="no-todos">No todos to display</h2>
            `
            return;
        }

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
                        <h4 class="${todo.priority.toLowerCase()}">${todo.priority}</h4>
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

        this.updateTodoDom(document.querySelector(".update-todo-dialog"), container);
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
                console.log(error.message);
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
                location.reload();
            }
        });
    },

    updateTodoDom(dialog, container) {
        container.addEventListener("click", (event) => {
            if (event.target.closest(".edit")) {
                const todoElement = event.target.closest(".todo-container");
                const todoTitle = todoElement.dataset.todoTitle;

                // Find the todo
                const todos = todoManager.getTodos();
                const todo = todos.find(t => t.title.replace(/\s+/g, "-") === todoTitle);

                if(!todo) {
                    console.log("Todo not found");
                    return;
                };

                // Populate the form with the todo's details
                const form = dialog.querySelector("form");
                const cancelButton = dialog.querySelector(".close-todo-dialog");
                const titleInput = form.querySelector("#title");
                const descriptionInput = form.querySelector("#description");
                const priorityInput = form.querySelector("#priority");
                const projectInput = form.querySelector("#project");
                const dueDateInput = form.querySelector("#due-date");

                titleInput.value = todo.title.trim();
                descriptionInput.value = todo.description.trim();
                dueDateInput.value = todo.dueDate.trim();

                // Render projects and set the selected value
                this.renderProjects(projectInput);
                projectInput.value = todo.project.trim();

                // Render priorities and set the selected value
                this.rederPriorities(priorityInput);
                priorityInput.value = todo.priority.trim();

                // Show the dialog
                dialog.showModal();

                const submitHandler = (event) => {
                    event.preventDefault();

                    // set the values of the form
                    const newTodo = {
                        title: form.querySelector("#title").value.trim(),
                        description: form.querySelector("#description").value.trim() || "",
                        dueDate: form.querySelector("#due-date").value.trim(),
                        priority: form.querySelector("#priority").value,
                        project: form.querySelector("#project").value.trim(),
                    };

                    if (!todoManager.isValidTodo(newTodo)) {
                        return;
                    }

                    try {
                        todoManager.updateTodo(todo, newTodo);
                        this.renderTodos(container);
                        form.reset();
                        dialog.close();
                    } catch (error) {
                        console.log(error.message);
                    }
                };

                // Remove any previous submit listeners to avoid duplication
                form.removeEventListener("submit", submitHandler)
                form.addEventListener("submit", submitHandler)

                // Ensure cancel button resets the form and closes the dialog
                cancelButton.addEventListener("click", () => {
                    form.reset();
                    dialog.close();
                })
            }

        })
    }

}