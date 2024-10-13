import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { ErrorWrapper } from "@pages/Error/Error.styled.tsx";

const Error = () => {
    const error = useRouteError();

    if (!isRouteErrorResponse(error)) {
        return (
            <ErrorWrapper className={"error"}>
                <h1>No error</h1>
            </ErrorWrapper>
        );
    }

    return (
        <ErrorWrapper className={"error"}>
            <h1>Oops !</h1>
            <h2>{error.status}</h2>
            <p>{error.statusText}</p>
            {error.data?.message && <p>{error.data.message}</p>}
        </ErrorWrapper>
    );
};

export default Error;
