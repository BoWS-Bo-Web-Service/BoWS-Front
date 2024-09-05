import axios from 'axios';
import {redirect} from "react-router-dom";
import {SERVER_URL} from "../constants/network.js";

export const isTokenError = (error) => {
    return error.response && error.response.status === 401;
};

export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${SERVER_URL}/api/token/refresh`, { refreshToken });
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        return true;
    } catch (error) {
        return false;
    }
};

export const handleTokenError = async (error) => {
    if (isTokenError(error)) {
        const exceptionClass = error.response.data.exceptionClass;
        if (exceptionClass === "ExpiredTokenException") {
            const refreshSuccess = await refreshToken();
            if (refreshSuccess) {
                window.location.reload();
                return;
            }
        }
        if (exceptionClass === "ExpiredRefreshTokenException") {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            redirect('/login');
            return;
        }
    }
    throw error;
};