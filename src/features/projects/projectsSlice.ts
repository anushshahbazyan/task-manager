import { createSlice } from '@reduxjs/toolkit';
import type { ProjectsState } from '../../types';
import type { RootState } from '../../app/store';
import { createAppAsyncThunk } from '../../app/withTypes';
import fetchData from '../../utils/fetchData';

export const fetchProjects = createAppAsyncThunk('projects/fetchProjects', async () => {
    const response = await fetchData('/resources/projects.json');
    return response.projects;
});

const initialState: ProjectsState = {
    projects: [],
    status: 'idle',
    error: null
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown Error';
            })
      },
});

export default projectsSlice.reducer;


export const selectAllProjects = (state: RootState) => state.projects.projects;

export const selectProjectById = (state: RootState, projectId: string) =>
    state.projects.projects.find(project => project.projectId === projectId);

export const selectProjectsStatus = (state: RootState) => state.projects.status;
export const selectProjectsError = (state: RootState) => state.projects.error;
