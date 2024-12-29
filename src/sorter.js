import { todoManager } from "./todoManager.js"
import { isToday, parse } from "date-fns"

const TODOS = todoManager.getTodos();

export const todoSorter = {
    today() {
        return TODOS.filter(todo => {
            const parsedDate = parse(todo.dueDate, "yyyy-MM-dd", new Date());
            if (isToday(parsedDate)) {
                return todo;
            }
        });
    },

    ongoing() {
        return TODOS.filter(todo => {
            if (todo.isCompleted === false && todo.isMissed === false) {
                return todo;
            }
        });
    },

    completed() {
        return TODOS.filter(todo => {
            if (todo.isCompleted === true) {
                return todo;
            }
        });
    },

    missed() {
        return TODOS.filter(todo => {
            if (todo.isMissed === true) {
                return todo;
            }
        });
    }
}

// todaysTodos;