import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from '../features/tasks/tasksSlice';
import projectsSlice from '../features/projects/projectsSlice';

export const store = configureStore({
    reducer: {
        projects: projectsSlice,
        tasks: tasksSlice,
    }
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
