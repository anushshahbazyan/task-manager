import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import './AddEditTaskForm.css';
import type { EditTaskFormElements } from '../types';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { taskUpdated, selectTaskById, selectAllTasks, taskAdded } from '../features/tasks/tasksSlice';
import createTaskId from '../utils/createTaskId';

export const AddEditTaskForm = () => {
    const { taskId } = useParams();
    const location = useLocation();
    const isNewTaskPage = location.pathname.indexOf('new') !== -1;

    let task = useAppSelector((state) => selectTaskById(state, taskId!));
    const tasksLength = useAppSelector((state) => selectAllTasks(state)).length;

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (!task) {
        task = {
            taskId: createTaskId(tasksLength),
            title: '',
            description: '',
            status: '',
            priority: '',
            dueDate: ''
        }
    }

    const onSaveTaskClicked = (e: React.FormEvent<EditTaskFormElements>) => {
        e.preventDefault();

        const { elements } = e.currentTarget;
        const title = elements.taskTitle.value;
        const description = elements.taskDescription.value;
        const priority = elements.taskPriority.value;
        const status = elements.taskStatus.value;
        const dueDate = elements.taskDueDate.value;
        const action = isNewTaskPage ? taskAdded : taskUpdated;

        if (title && description && priority && status) {
            dispatch(action({ taskId: task.taskId, title, description, status, priority, dueDate }));
            navigate(`/tasks/${taskId}`);
        }
    }

    return (
        <section>
            { isNewTaskPage ? <h2>New Task</h2> : <h2>Edit Task</h2> }
            <form onSubmit={onSaveTaskClicked}>
                <div className='form-content'>
                    <label htmlFor="taskTitle">Task Title</label>
                    <input type="text" id="taskTitle" name="taskTitle" defaultValue={task.title} required />
                    <label htmlFor="taskDescription">Content</label>
                    <textarea id="taskDescription" name="taskDescription" defaultValue={task.description} required />
                    <label htmlFor="taskPriority">Task Priority</label>
                    <select id="taskPriority" name="taskPriority" defaultValue={task.priority} required>
                        <option value='Low'>Low</option>
                        <option value='Medium'>Medium</option>
                        <option value='High'>High</option>
                    </select>
                    <label htmlFor="taskStatus">Task Status</label>
                    <select id="taskStatus" name="taskStatus" defaultValue={task.status} required>
                        <option value='To Do'>To Do</option>
                        <option value='In Progress'>In Progress</option>
                        <option value='Done'>Done</option>
                    </select>
                    <label htmlFor="taskDueDate">Task Due Date</label>
                    <input type='date' id="taskDueDate" name="taskDueDate" defaultValue={task.dueDate} required />
                    <button className='add'>Save Task</button>
                </div>
            </form>
        </section>
    );
}
