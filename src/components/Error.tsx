export default function ErrorComponent({ errorTitle, errorMessage }: { errorTitle: string, errorMessage: string }) {
    return (<div className='error-container'>
        <h1>{errorTitle}</h1>
        <p>{errorMessage}</p>
    </div>);
};
