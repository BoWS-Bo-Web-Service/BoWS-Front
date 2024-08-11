import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import {Link} from "react-router-dom";

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(null);

    const checkDuplicateUsername = () => {
        const isDuplicate = Math.random() < 0.5;
        setIsUsernameDuplicate(!isDuplicate);
        console.log('아이디 중복 확인:', isDuplicate ? '중복' : '사용 가능');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('회원가입 제출');
    };

    return (
        <div className="flex flex-col items-center w-full">
            <form className="w-[300px]" onSubmit={handleSubmit}>
                <div className="mb-4 flex items-center">
                    <div className="flex-grow relative">
                        <input
                            type="text"
                            placeholder="아이디"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setIsUsernameDuplicate(null);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-black transition duration-150 ease-in-out"
                        />
                        {isUsernameDuplicate === true && (
                            <Check className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                        )}
                        {isUsernameDuplicate === false && (
                            <X className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500" size={20} />
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={checkDuplicateUsername}
                        className="bg-gray-200 text-gray-700 border-y border-r border-gray-300 px-3 py-2 rounded-r-md hover:opacity-80 transition duration-150"
                    >
                        중복확인
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition duration-150 ease-in-out"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition duration-150 ease-in-out"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="초대코드"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black transition duration-150 ease-in-out"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:opacity-80 transition duration-150"
                >
                    회원가입하기
                </button>
            </form>
            <Link to="/login">
                <div className="text-center mt-4">
                    <p className="text-gray-500 hover:opacity-80">기존 아이디로 로그인하기</p>
                </div>
            </Link>
        </div>
    );
};

export default RegisterForm;