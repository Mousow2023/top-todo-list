import "./styles.css";
import "./reset.css";

class Project {
    constructor(name) {
        this.name = name;
    }
}

const listOfProject = [];

// The Todo object
class Todo {
    static priorities = ["low", "medium", "high"];

    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

const defaultProject = new Project("Default");
listOfProject.push(defaultProject);


// Probably from the todo form
let title = "title";
let description = "";
let dueDate = "20-12-2024";
let priority = "High";
let project = "";

const testValues = [title, description, dueDate, priority, project];

const todo = new Todo(...testValues);

// function valuesAreValid(todoList) {
//     // Check if the project is not empty and valid
//     if (todoList.project === "") {
//         todoList.project = defaultProject;
//     } else {
//         if (!listOfProject.includes(todoList.project)) {
//             alert("Invalid project");
//             return false;
//         }
//     }

//     // Check if the name is not empty
//     if (todoList.title === "") {
//         // alert("Invalid title");
//         return false;
//     }

//     // Check if the due date is a valid date and is not a past date
//     if (todoList.dueDate === "") {
//         // alert("Invalid dueDate");
//         return false;
//     }

//     // Check if the priority is in the list of prioties
//     if (!todoList.priorities.includes(todo.priority.toLowerCase())) {
//         // alert("Invalid priority");
//         return false;
//     }

//     return true;
// }

// console.log(valuesAreValid(todo))

// function createTodo() {
//     if (valuesAreValid(todo)) {
//         return todo;
//     } else {
//         return false;
//     }
// }

// console.log(createTodo());

const dialog = document.querySelector(".dialog");
const showDialogButton = document.querySelector(".new-project");
const closeDialogButton = document.querySelector(".cancel-button");

showDialogButton.addEventListener("click", () => {
    dialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
    dialog.close();
})
