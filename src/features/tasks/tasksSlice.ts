import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TasksState } from '../../types';
import type { RootState } from '../../app/store';
import { createAppAsyncThunk } from '../../app/withTypes';
import fetchData from '../../utils/fetchData';
import type { Task } from '../../types';

export const fetchTasks = createAppAsyncThunk('tasks/fetchTasks', async () => {
    const response = await fetchData('/resources/tasks.json');
    return response.tasks;
});

const initialState: TasksState = {
    tasks: [],
    status: 'idle',
    error: null
}

type TaskUpdate = Pick<Task, 'taskId' | 'title' | 'description' | 'dueDate' | 'status' | 'priority'>;

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        taskAdded(state, action: PayloadAction<Task>) {
            state.tasks.push(action.payload);
        },
        taskDeleted(state, action: PayloadAction<string>) {
            const index = state.tasks.findIndex((task: Task) => task.taskId === action.payload);
            if (index !== undefined) {
                state.tasks.splice(index, 1);
            }
        },
        taskUpdated(state, action: PayloadAction<TaskUpdate>) {
            const { taskId, title, description, status, priority, dueDate } = action.payload;
            const existingTask = state.tasks.find((task: Task) => task.taskId === taskId);
            if (existingTask) {
                existingTask.title = title;
                existingTask.description = description;
                existingTask.status = status;
                existingTask.priority = priority;
                existingTask.dueDate = dueDate;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown Error';
            })
      },
});
  
export const { taskAdded, taskDeleted, taskUpdated } = tasksSlice.actions;

export default tasksSlice.reducer;

export const selectAllTasks = (state: RootState) => state.tasks.tasks;

export const selectTaskById = (state: RootState, taskId: string) =>
    state.tasks.tasks.find(task => task.taskId === taskId);

export const selectTasksStatus = (state: RootState) => state.tasks.status;
export const selectTasksError = (state: RootState) => state.tasks.error;
