export type Project = {
    projectId: string,
    projectName: string,
    dueDate: string,
}

export type Task = {
    taskId: string,
    title: string,
    description: string,
    priority: string,
    status: string,
    dueDate: string,
}

export interface ProjectsState {
    projects: Project[],
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null
};

export interface TasksState {
    tasks: Task[],
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null
};

// type safety for form elements
interface EditTaskFormFields extends HTMLFormControlsCollection {
    taskTitle: HTMLInputElement
    taskDescription: HTMLTextAreaElement
    taskPriority: HTMLSelectElement
    taskStatus: HTMLSelectElement
    taskDueDate: HTMLInputElement
}
export interface EditTaskFormElements extends HTMLFormElement {
    readonly elements: EditTaskFormFields
}
