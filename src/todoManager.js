import { projectManager } from "./projectManager.js";
import { isValid, isBefore, parse } from "date-fns";

// The Todo object
class Todo {
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