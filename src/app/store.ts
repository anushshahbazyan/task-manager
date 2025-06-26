import { configureStore } from '@reduxjs/toolkit';
import type { Task } from '../components/TaskList';
import tasksSlice from '../features/tasks/tasksSlice';

export interface TasksState {
    tasks: Task[],
    status: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null
};

export const store = configureStore({
    reducer: {
        tasks: tasksSlice,
    }
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
