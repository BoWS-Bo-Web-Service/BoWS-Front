import React from 'react';
import {SquareLoader} from 'react-spinners';

const LoadingSpinner = ({ loading, message }) => {
    return (
        loading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                <div className="text-center">
                    <SquareLoader color="#ffffff" loading={loading} size={100} />
                    <p className="text-white mt-2">{message}</p>
                </div>
            </div>
        ) : null
    );
};

export default LoadingSpinner;