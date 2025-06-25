import './TaskList.css';
import { useEffect, useState } from "react";
import { Link } from "react-router";
import fetchData from "../utils/fetchData";
import { type Project } from './ProjectList';

export type Task = {
    taskId: string,
    title: string,
    description: string,
    priority: string,
    status: string,
    dueDate: string,
}

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        const doFetching = async () => {
            const data = await fetchData('/src/resources/tasks.json');
            setTasks(data.tasks || []);
        }
        doFetching();
    }, []);

    useEffect(() => {
        const retrieveProject = () => {
            const data = localStorage.getItem('project');
            setProject(data ? JSON.parse(data) : null);
        }
        retrieveProject();
    }, []);

    return (
        <div className="container">
            <h1 className='title'>{`${project?.projectName}`} Project Tasks</h1>
            <div className="task-item">
                <h2>Task Name</h2>
                <h2>Description</h2>
                <h2>Priority</h2>
                <h2>Status</h2>
                <h2>Due Date</h2>
            </div>
            { tasks.map((task: Task, index: number) => {
                return (
                    <div key={`${index}-${task.taskId}`} className="task-item">
                        <Link to={`/tasks/${project?.projectId}/${task.taskId}`}>
                            <div> { task.title } </div>
                        </Link>
                        <div> { task.description } </div>
                        <div> { task.priority } </div>
                        <div> { task.status } </div>
                        <div> { new Date(task.dueDate).toLocaleString() } </div>
                    </div>
                );
            }) }
        </div>
    );
}