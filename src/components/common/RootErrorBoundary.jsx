import React from 'react';
import {useRouteError} from "react-router-dom";
import ErrorPage from "./Errorpage.jsx";

const RootErrorBoundary = () => {
    const error = useRouteError();
    let status;

    try {
        const parsedError = JSON.parse(JSON.stringify(error));
        status = parsedError.status;
    } catch (e) {
        status = 500;
    }
    return <ErrorPage errorStatus={status} />;
};

export default RootErrorBoundary;