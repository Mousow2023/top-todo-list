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
                <div class="todo-container" data-todo-title=${todo.title.replace(/\s+/g, "-")}>
                    <div class="todo-header">
                        <div>
                            <h3 class="todo-title">${capitalizeFirstLetter(todo.title)}</h3>
                            <p class="project-name">Project: ${capitalizeFirstLetter(todo.project)}</p>
                        </div>
                        <span class="todo-status status-${todo.isMissed ? "missed" : todo.isCompleted ? 'completed' : 'pending'}">${todo.isMissed ? "Missed" : todo.isCompleted ? 'Completed' : 'Pending' }</span>
                    </div>
                    <div class="todo-details">
                        <span class="due-date">Due Date: ${todo.dueDate}</span>
                        <span class="priority priority-${todo.priority.toLowerCase()}">${capitalizeFirstLetter(todo.priority)} Priority</span>
                    </div>
                    <div class="todo-actions">
                        <button ${todo.isMissed ? "disabled" : ""} class="btn-complete mark-as-complete">${todo.isCompleted ? 'Unmark' : 'Mark'} as Complete</button>
                        <button class="btn-delete delete">Delete</button>
                        <button ${todo.isMissed ? "disabled" : ""} class="btn-update edit">Update</button>
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
    },

    checkMissedTodos(container) {
        const todos = todoManager.getTodos();

        todos.forEach(todo => {
            if (todoManager.isMissed(todo)) {
                todo.isMissed = true;
            };
        });

        todoManager.saveTodos(todos);
        this.renderTodos(container);
    }
}