import { createHashRouter, RouterProvider } from 'react-router';
import './App.css';
import ProjectList from './components/ProjectList';
import TaskList from './components/TaskList';
import TaskEntry from './components/TaskEntry';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HydrateFallback } from './components/HydrateFallback';

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
    }
    ]);
    
    return (
        <RouterProvider router={router} />
    );
}

export default App;
