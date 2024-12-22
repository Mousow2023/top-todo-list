class Project {
    constructor(name) {
        this.name = name;
    }
}

const LOCAL_STORAGE_KEY = "projects";

export const projectManager = {
    getProjects() {
        return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [new Project("main")];
    },

    addProject(projectName) {
        // Get the list of projects from localStorage
        const projects = this.getProjects();

        // Check if the project's name already exists
        if (projects.some(project => project.name.toLowerCase() === projectName.toLowerCase())) {
            throw new Error("Project already exists");
        }

        const newProject = new Project(projectName);
        projects.push(newProject);

        // Save the projects to localStorage
        this.saveProjects(projects);
    },

    saveProjects(projects) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects))
    },

    deleteProject(projectName) {
        const projects = this.getProjects();
        const updatedProjects = projects.filter(project => project.name !== projectName);

        // if (updatedProjects.length === projects.length) {
        //     // throw new Error("Project not found");
        //     console.log(updatedProjects)
        //     console.log(projects)
        // }

        this.saveProjects(updatedProjects);
    },
}