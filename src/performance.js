import {todoManager} from "./todoManager.js";

const TASKS = todoManager.getTodos();

export const performance = {

    allTasks() {
        return TASKS.length;
    },

    taskCompleted() {
        const completedTasks = TASKS.filter(todo => todo.isCompleted === true);
        
        if (completedTasks.length > 0) {
            return completedTasks.length;
        } else {
            return 0;
        }
    },

    tasksPending() {
        const pendingTaksks = TASKS.filter(todo => todo.isCompleted === false && todo.isMissed === false);
        
        if (pendingTaksks.length > 0) {
            return pendingTaksks.length;
        } else {
            return 0;
        }
    },

    missedTaks() {
        const missedTasks = TASKS.filter(task => task.isMissed === true);

        if (missedTasks.length > 0) {
            return missedTasks.length;
        } else {
            return 0;
        }
    },

    completionRate() {
        const rate = (this.taskCompleted() * 100) / this.allTasks();
        return Math.round(rate);;
    }
}