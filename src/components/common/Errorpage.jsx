import { useRouteError } from 'react-router-dom';
import Logo from "../../assets/BoWS_logo.svg";
import React from "react";

function ErrorPage({ error }) {
    let title = 'An error occurred!';
    let message = 'Something went wrong.';
    const status = error.response.status;

    console.log(status);

    if (status === 404) {
        title = '404 - 페이지를 찾을 수 없습니다!';
        message = '요청하신 리소스 또는 페이지를 찾을 수 없습니다.';
    } else if (status === 400) {
        title = '400 - 잘못된 요청입니다!';
        message = '요청에 문제가 있습니다. 다시 확인해 주세요.';
    } else if (status === 401) {
        title = '401 - 권한이 없습니다!';
        message = '이 페이지에 접근할 권한이 없습니다. 로그인이 필요할 수 있습니다.';
    } else if (status === 500) {
        title = '500 - 서버 오류!';
        message = '서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.';
    } else if (status === 403) {
        title = '403 - 페이지에 대한 권한이 없습니다!';
        message = '해당 리소스에 대한 권한이 없습니다';
    }

    return (
        <div className="flex flex-col items-center h-screen justify-center gap-10">
            <div className="flex flex-col flex-grow-[3] text-3xl justify-end gap-10">
                <img className="h-[100px] mx-auto" alt="Service Logo" src={Logo}/>
                <h1>{title}</h1>
            </div>
            <div className="flex flex-grow-[3] text-xl items-start">
                <p>{message}</p>
            </div>
            <div className="flex flex-grow-[1]"></div>
        </div>
    );
}

export default ErrorPage;