import { projectManager } from "./projectManager.js";
import { isValid, isBefore, parse, isYesterday, endOfDay, startOfDay } from "date-fns";

// The Todo object
export class Todo {
    static priorities = ["low", "medium", "high"];

    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.isCompleted = false;
        this.isMissed = false;
    }

    getInfo() {
        return `${this.title} scheduled in ${this.dueDate}, part of ${this.project}, with a ${this.priority} is ${this.isCompleted ? "completed" : "not completed"}`
    }

    markAsCompleted() {
        this.isCompleted = !this.isCompleted;
        return this.isCompleted;
    }

    markAsMissed() {
        this.isMissed = true;
    }
}

const LOCAL_STORAGE_KEY = "todos";

export const todoManager = {
    isValidTodo(todo) {
        const projects = projectManager.getProjects();

        const title = todo.title.trim();
        if (!title) {
            console.log("Invalid title");
            return false;
        }

        // VALIDATE THE DUE DATE

        // Parse the date from a string (assuming 'yyyy-MM-dd' format)
        const dueDate = parse(todo.dueDate, "yyyy-MM-dd", new Date());

        // Check if the todo's due date is valide 
        if (!isValid(dueDate)) {
            console.log("Invalid due date");
            return false;
        }

        // // Check if the due date is not a past date
        const today = startOfDay(new Date());
        if (isBefore(dueDate, today)) {
            console.log("The due cannot be a past date");
            return false;
        }

        // Check if the todo's priority is in the list of piorities
        const priority = todo.priority.toLowerCase();
        if (!Todo.priorities.includes(priority)) {
            console.log("Priority not found");
            return false;
        }

        // Check if the todo's priority is in the list of projects
        const project = todo.project;
        if (!projects.some(proj => proj.name.toLowerCase() === project.toLowerCase())) {
            console.log("Project not found");
            return false;
        }

        return true;
    },

    addTodo(todo) {
        const todos = this.getTodos();

        if (!this.isValidTodo(todo)) {
            throw new Error("Invalid");
        }

        const { title, description, dueDate, priority, project } = todo;

        const newTodo = new Todo(title, description, dueDate, priority, project);

        todos.push(newTodo);
        this.saveTodos(todos);
    },

    getTodos() {
        // If there's an in-memory cache, use it; otherwise, load from localStorage
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        const todos = storedTodos.map(todoData => {
            const { title, description, dueDate, priority, project, isCompleted, isMissed } = todoData;
            const todo = new Todo(title, description, dueDate, priority, project);
            todo.isCompleted = isCompleted;
            todo.isMissed = isMissed;
            return todo;
        });

        return todos;
    },

    saveTodos(todos) {
        this.todos = todos; // Update in-memory state
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    },

    deleteTodo(task) {
        if (!task.title) {
            return;
        }

        const todos = this.getTodos();
        const updatedTodos = todos.filter(t => t.title.toLowerCase() !== task.title.toLowerCase());

        this.saveTodos(updatedTodos);
    },

    updateTodo(oldTodo, newTodo) {
        const todos = this.getTodos();
        const index = todos.findIndex(tod => tod.title === oldTodo.title);

        // if the todo if found
        if (index !== -1) {
            // TODO
            todos[index] = { ...oldTodo, ...newTodo };
            this.saveTodos(todos);
        } else {
            console.log("Todo not found in update todo");
        }
    },

    completeTodo(todo) {
        const todos = this.getTodos();

        const index = todos.findIndex(tod => tod.title === todo.title);

        if (index !== -1) {
            todos[index].markAsCompleted();
            this.saveTodos(todos);
        }
    },

    isMissed(todo) {
        const dueDate = parse(todo.dueDate, "yyyy-MM-dd", new Date())
        const today = startOfDay(new Date());

        if (isBefore(dueDate, today) && todo.isCompleted === false) {
            return true;
        }

        return false;
    }
};