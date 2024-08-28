import React from 'react';
import { useRouteError } from "react-router-dom";
import ErrorPage from './ErrorPage';

const RouterErrorBoundary = () => {
    const error = useRouteError();
    const status = error.response.status;

    return <ErrorPage errorStatus={status} />;
};

export default RouterErrorBoundary;