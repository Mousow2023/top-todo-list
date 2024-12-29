import { performance } from "./performance.js";

export const performanceDom = {
    renderPerformanceBox(container) {
        container.innerHTML = `
            <div class="stat">
                <span class="stat-label">All Tasks</span>
                <span class="stat-value">${performance.allTasks()}</span>
            </div>
            <div class="stat">
                <span class="stat-label">Tasks Completed</span>
                <span class="stat-value">${performance.taskCompleted()}</span>
            </div>

            <div class="stat">
                <span class="stat-label">Pending Tasks</span>
                <span class="stat-value">${performance.tasksPending()}</span>
            </div>

            <div class="stat">
                <span class="stat-label">Missed Deadlines</span>
                <span class="stat-value">${performance.missedTaks()}</span>
            </div>

            <div class="stat">
                <span class="stat-label">Completion Rate</span>
                <span class="stat-value">${performance.completionRate()}%</span>
            </div>

            <div class="performance-footer">
                Keep up the <span class="highlight">great work</span>!
                Focus on reducing missed deadlines.
            </div>
        `
    }
}