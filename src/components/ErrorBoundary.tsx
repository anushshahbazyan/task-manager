import ErrorComponent from './Error';
import './ErrorBoundary.css';
import { isRouteErrorResponse, type ErrorResponse } from "react-router";

export function ErrorBoundary(error: Error | ErrorResponse | unknown) {
    if (isRouteErrorResponse(error)) {
        return (
            <ErrorComponent
                errorTitle={`${error.status} ${error.statusText}`}
                errorMessage={error.data}
            />
        );
    }
    if (error instanceof Error) {
        return (
            <ErrorComponent
                errorTitle='Error'
                errorMessage={error.message}
            />
        );
    }
    return (
        <ErrorComponent
            errorTitle='Error'
            errorMessage='An error occurred.'
        />
    );
}
