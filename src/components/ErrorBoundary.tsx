import './ErrorBoundary.css';
import { isRouteErrorResponse, type ErrorResponse } from "react-router";

export function ErrorBoundary(error: Error | ErrorResponse | unknown) {
    if (isRouteErrorResponse(error)) {
        return (
            <div className='error-container'>
                <h1>
                    {error.status} {error.statusText}
                </h1>
                <p>{error.data}</p>
            </div>
        );
    }
    if (error instanceof Error) {
        return (
            <div className='error-container'>
                <h1>Error</h1>
                <p>{error.message}</p>
            </div>
        );
    }
    return (
        <div className='error-container'>
            <h1>Error</h1>
            <p>An error occurred.</p>
        </div>
    );
}
