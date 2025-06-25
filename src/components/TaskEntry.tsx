import './TaskEntry.css';
import { useEffect, useState } from "react";
import { useParams } from 'react-router';
import fetchData from "../utils/fetchData";
import { type Project } from './ProjectList';
import { type Task } from './TaskList';

export default function TaskEntry() {
    const { taskId } = useParams();
    const [task, setTask] = useState<Task | null>(null);
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        const doFetching = async () => {
            const data = await fetchData('/src/resources/tasks.json');
            const task = data.tasks.find((task: Task) => task.taskId === taskId) || null;
            setTask(task);
        }
        doFetching();
    }, [taskId]);

    useEffect(() => {
        const retrieveProject = () => {
            const data = localStorage.getItem('project');
            setProject(JSON.parse(data || ''));
        }
        retrieveProject();
    }, []);

    return (
        <div className="detail-container">
            { task &&
                <>
                    <h3 className='title'>Project - {`${project?.projectName}`}</h3>
                    <h3 className='title'>Task - {`${task?.title}`}</h3>
                    <div className="task-detail">
                        <div className='bold-item'>Description</div>
                        <div> { task.description } </div>
                        <div className='bold-item'>Priority</div>
                        <div> { task.priority } </div>
                        <div className='bold-item'>Status</div>
                        <div> { task.status } </div>
                        <div className='bold-item'>Due Date</div>
                        <div> { new Date(task.dueDate).toLocaleString() } </div>
                    </div>
                </>
            }
        </div>
    );
}