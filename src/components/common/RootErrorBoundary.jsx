import React from 'react';
import { useRouteError } from "react-router-dom";
import Logo from "../../assets/BoWS_logo.svg";

const RootErrorBoundary = () => {
    const error = useRouteError();
    return (
        <div className="flex flex-col items-center h-screen justify-center gap-10">
            <div className="flex flex-col flex-grow-[3] text-3xl justify-end gap-10">
                <img className="h-[100px] mx-auto" alt="Service Logo" src={Logo}/>
                <h2 className="text-center">현재 오류가 발생했습니다.</h2>
            </div>
            <div className="flex flex-grow-[3] text-xl items-start">
                <p>문제의 세부 사항: {error.message || JSON.stringify(error)}</p>
            </div>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={() => (window.location.href = "/")}
            >
                앱 새로 시작하기
            </button>
            <div className="flex flex-grow-[1]"></div>
        </div>
    );
};

export default RootErrorBoundary;