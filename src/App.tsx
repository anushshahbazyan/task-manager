import './App.css';
import { createHashRouter, RouterProvider } from 'react-router';

import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import TaskEntry from './components/TaskEntry';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HydrateFallback } from './components/HydrateFallback';
import { AddEditTaskForm } from './components/AddEditTaskForm';

function App() {
    const router = createHashRouter([{
        path: '/',
        element: <ProjectList />,
        errorElement: <ErrorBoundary />,
        hydrateFallbackElement: <HydrateFallback />
    }, {
        path: '/tasks/:id',
        element: <TaskList />,
        errorElement: <ErrorBoundary />,
        hydrateFallbackElement: <HydrateFallback />
    }, {
        path: '/tasks/:id/:taskId',
        element: <TaskEntry />,
        errorElement: <ErrorBoundary />,
        hydrateFallbackElement: <HydrateFallback />
    }, {
        path: 'tasks/new',
        element: <AddEditTaskForm />,
        errorElement: <ErrorBoundary />,
        hydrateFallbackElement: <HydrateFallback />
    }, {
        path: 'tasks/:id/:taskId/edit',
        element: <AddEditTaskForm />,
        errorElement: <ErrorBoundary />,
        hydrateFallbackElement: <HydrateFallback />
    }]);
    
    return (
        <RouterProvider router={router} />
    );
}

export default App;
