import { projectManager } from "./projectManager.js";
import { isValid, isBefore, parse } from "date-fns";

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
            alert("Invalid title");
            return false;
        }

        // VALIDATE THE DUE DATE

        // Parse the date from a string (assuming 'yyyy-MM-dd' format)
        const dueDate = parse(todo.dueDate, "yyyy-MM-dd", new Date());

        // Check if the todo's due date is valide 
        if (!isValid(dueDate)) {
            alert("Invalid due date");
            return false;
        }

        // Check if the due date is not a past date
        const today = new Date();
        if (isBefore(dueDate, today)) {
            alert("The due cannot be a past date");
            return false;
        }

        // Check if the todo's priority is in the list of piorities
        const priority = todo.priority.toLowerCase();
        if (!Todo.priorities.includes(priority)) {
            alert("Priority not found");
            return false;
        }

        // Check if the todo's priority is in the list of projects
        const project = todo.project;
        if (!projects.some(proj => proj.name.toLowerCase() === project.toLowerCase())) {
            alert("Project not found");
            return false;
        }

        return true;
    },

    addTodo(todo) {
        const todos = this.getTodos();

        if (!this.isValidTodo(todo)) {
            throw new Error("Invalid");
        }

        todos.push(todo);
        this.saveTodos(todos);
    },

    getTodos() {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    },

    saveTodos(todos) {
        return localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    },

    deleteTodo(todo) {
        const todos = this.getTodos();
        const updatedTodos = todos.filter(tod => tod.title !== todo.title);

        this.saveTodos(updatedTodos);
        console.log(`${todo.title} has been deleted`);
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
            console.log("Todo not found in update todo")
        }
    }
};