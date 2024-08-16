import React, { useState } from 'react';
import {Link} from "react-router-dom";
import FormValidator from "../utils/formValidator.js";
import axios from "axios";
import {SERVER_URL} from "../constants/network.js";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        userId: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = FormValidator.validateForm(formData, 'login');
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsLoading(true);

        axios.post(`${SERVER_URL}/api/members/login`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
            })
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem("token", token);

                alert("로그인 성공");
                window.location.href=`/`;
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('로그인 실패');
            })
            .finally(
                () => setIsLoading(false),
            )
    };

    return (
        <div className="flex flex-col items-center w-full">
            <form className="w-[300px]" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        name="userId"
                        placeholder="아이디"
                        value={formData.userId}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.userId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black transition duration-150 ease-in-out`}
                    />
                    {errors.userId && <p className="text-red-500 text-sm mt-1">{errors.userId}</p>}
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black transition duration-150 ease-in-out`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:opacity-80 transition duration-150"
                    disabled={isLoading}
                >
                    {isLoading ? '로그인 중...' : '아이디로 로그인'}
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