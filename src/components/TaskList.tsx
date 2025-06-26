import './TaskList.css';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { PlusIcon } from '@heroicons/react/16/solid';

import { fetchTasks, selectAllTasks, selectTasksError, selectTasksStatus } from '../features/tasks/tasksSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import type { Task, Project } from '../types';
import TaskActions from './TaskActions';
import { HydrateFallback } from './HydrateFallback';

export default function TaskList() {
    const [project, setProject] = useState<Project | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(selectAllTasks);
    const taskStatus = useAppSelector(selectTasksStatus);
    const taskError = useAppSelector(selectTasksError);

    useEffect(() => {
        if (taskStatus === 'idle') {
            dispatch(fetchTasks());
        }
    }, [taskStatus, dispatch]);

    useEffect(() => {
        const retrieveProject = () => {
            const data = localStorage.getItem('project');
            setProject(data ? JSON.parse(data) : null);
        }
        retrieveProject();
    }, []);

    const onAddTaskClicked = () => {
        navigate('/tasks/new');
    }

    if (taskStatus === 'pending') {
        return <HydrateFallback />;
    }

    if (taskError) {
        return (
            <div className='error-container'>
                <h1>Error</h1>
                <p>{taskError}</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className='title'>{`${project?.projectName}`} Project Tasks</h1>
            <button className='add' onClick={onAddTaskClicked}>
                <PlusIcon width={16} height={16} color='#ffffff' />
                <span>Add Task</span>
            </button>
            <div className="task-item">
                <h2>Task Name</h2>
                <h2>Description</h2>
                <h2>Priority</h2>
                <h2>Status</h2>
                <h2>Due Date</h2>
                <h2>Actions</h2>
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
                        <div> { new Date(task.dueDate).toLocaleDateString() } </div>
                        <TaskActions projectId={project?.projectId} taskId={task.taskId} />
                    </div>
                );
            }) }
        </div>
    );
}
