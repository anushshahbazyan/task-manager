import './ProjectList.css';
import { useEffect } from "react";
import { Link } from "react-router";

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProjects, selectAllProjects, selectProjectsError, selectProjectsStatus } from '../features/projects/projectsSlice';
import type { Project } from '../types';
import { HydrateFallback } from './HydrateFallback';
import ErrorComponent from './Error';

export default function ProjectList() {
    const dispatch = useAppDispatch();
    const projects = useAppSelector(selectAllProjects);
    const projectStatus = useAppSelector(selectProjectsStatus);
    const projectError = useAppSelector(selectProjectsError);

    useEffect(() => {
        if (projectStatus === 'idle') {
            dispatch(fetchProjects());
        }
    }, [projectStatus, dispatch]);

    const saveProjectName = (project: Project) => {
        const projectItem = localStorage.getItem('project');
        if (!projectItem || projectItem && JSON.parse(projectItem).projectId !== project.projectId) {
            localStorage.setItem('project', JSON.stringify(project));
        }
    };

    if (projectStatus === 'pending') {
        return <HydrateFallback />;
    }

    if (projectError) {
        return (
            <ErrorComponent
                errorTitle='Error'
                errorMessage={projectError}
            />
        );
    }

    return (
        <div className="container" data-testid="projectListContainer">
            <h1 className='title'>Welcome to Task Manager</h1>
            <div className="project-item">
                <h2>Project Name</h2>
                <h2>Due Date</h2>
            </div>
            { projects.map((project: Project, index: number) => {
                return (
                    <div key={`${index}-${project.projectId}`} className="project-item">
                        <Link to={`/tasks/${project.projectId}`} onClick={() => saveProjectName(project)}>
                            <div> { project.projectName } </div>
                        </Link>
                        <div> { new Date(project.dueDate).toLocaleDateString() } </div>
                    </div>
                );
            }) }
        </div>
    );
}
