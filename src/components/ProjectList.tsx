import './ProjectList.css';
import { useEffect, useState } from "react";
import { Link } from "react-router";
import fetchData from "../utils/fetchData";

export type Project = {
    projectId: string,
    projectName: string,
    dueDate: string,
}

export default function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const doFetching = async () => {
            const data = await fetchData('/src/resources/projects.json');
            setProjects(data.projects || []);
        }
        doFetching();
    }, []);

    const saveProjectName = (project: Project) => {
        const projectItem = localStorage.getItem('project');
        if (!projectItem || projectItem && JSON.parse(projectItem).projectId !== project.projectId) {
            localStorage.setItem('project', JSON.stringify(project));
        }
    };

    return (
        <div className="container">
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
                        <div> { new Date(project.dueDate).toLocaleString() } </div>
                    </div>
                );
            }) }
        </div>
    );
}