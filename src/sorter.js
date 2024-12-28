import { todoManager } from "./todoManager.js"
import { isToday, parse } from "date-fns"

export const todoSorter = {
    today() {
        return todoManager.getTodos().filter(todo => {
            const parsedDate = parse(todo.dueDate, "yyyy-MM-dd", new Date());
            if (isToday(parsedDate)) {
                return todo;
            }
        });
    },

    ongoing() {
        return todoManager.getTodos().filter(todo => {
            if (todo.isCompleted === false && todo.isMissed === false) {
                return todo;
            }
        });
    },

    completed() {
        return todoManager.getTodos().filter(todo => {
            if (todo.isCompleted === true) {
                return todo;
            }
        });
    }
}

// todaysTodos;