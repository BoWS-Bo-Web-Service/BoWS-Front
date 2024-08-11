import React, { useState } from 'react';
import {Link} from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex flex-col items-center w-full">
            <form className="w-[300px]">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="아이디"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition duration-150 ease-in-out"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition duration-150 ease-in-out"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:opacity-80 transition duration-150"
                >
                    아이디로 로그인
                </button>
            </form>

            <Link to="/register">
                <div className="text-center mt-4">
                    <p className="text-gray-500 hover:opacity-80">회원가입</p>
                </div>
            </Link>
        </div>
    );
};

export default LoginForm;