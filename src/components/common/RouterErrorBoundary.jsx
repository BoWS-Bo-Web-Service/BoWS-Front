import React from 'react';
import { useRouteError } from "react-router-dom";
import ErrorPage from './Errorpage.jsx';
import {handleTokenError} from "../../utils/tokenUtils.js";

const RouterErrorBoundary = () => {
    const error = useRouteError();
    const status = error.response?.status;

    handleTokenError(error);
    return <ErrorPage errorStatus={status} />;
};

export default RouterErrorBoundary;