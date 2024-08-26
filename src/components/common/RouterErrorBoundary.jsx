import React from 'react';
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import ErrorPage from './ErrorPage';

const RouterErrorBoundary = () => {
    const error = useRouteError();

    return <ErrorPage error={error} />;
};

export default RouterErrorBoundary;