import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Check, X } from 'lucide-react';
import formValidator from "../utils/formValidator.js";
import {SERVER_URL} from "../constants/network.js";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        userId: '',
        name: '',
        password: '',
        confirmPassword: '',
        invitationCode: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isUserIdAvailable, setIsUserIdAvailable] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === 'userId') {
            setIsUserIdAvailable(false);
        }
    };

    const checkDuplicateUsername = async () => {
        if (!formData.userId) {
            setErrors(prevErrors => ({ ...prevErrors, userId: '아이디를 입력해주세요.' }));
            return;
        }
        setIsLoading(true);
        axios.get(`${SERVER_URL}/api/members/check-userId`, {
                params: { userId: formData.userId },
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
            const { isAvailable } = response.data;
            setIsUserIdAvailable(isAvailable);
            setErrors(prevErrors => ({ ...prevErrors, userId: isAvailable ? '' : '이미 사용 중인 아이디입니다.' }))
            })
            .catch((error) => {
                alert('아이디 중복 검증 중 에러가 발생했습니다');
            })
            .finally(() => setIsLoading(false));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = formValidator.validateForm(formData, 'register');
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0 || !isUserIdAvailable) {
            return;
        }

        setIsLoading(true);

        axios.post(`${SERVER_URL}/api/members/register`,
            {
                userId: formData.userId,
                name: formData.name,
                password: formData.password,
                invitationCode: formData.invitationCode
                },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                alert("회원가입 성공");
                navigate("/login");
                })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.errorMessage) {
                    alert(`회원가입 실패: ${error.response.data.errorMessage}`);
                } else {
                    alert('회원가입 중 에러가 발생했습니다. 다시 시도해주세요.');
                }
            })
            .finally(() => setIsLoading(false));
    };

    const isFormValid = () => {
        const conditions = [
            !!formData.userId,
            !!formData.name,
            !!formData.password,
            !!formData.confirmPassword,
            !!formData.invitationCode,
            isUserIdAvailable,
        ];
        console.log('Form Validity Conditions:', conditions);
        return conditions.every(condition => condition === true);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <form className="w-[300px]" onSubmit={handleSubmit}>
                <div className="mb-4 flex items-center">
                    <div className="flex-grow relative">
                        <input
                            type="text"
                            name="userId"
                            placeholder="아이디"
                            value={formData.userId}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border ${errors.userId ? 'border-red-500' : 'border-gray-300'} 
                            rounded-l-md focus:outline-none focus:ring-1 focus:ring-black transition duration-150 ease-in-out`}
                        />
                        {isUserIdAvailable !== null && isUserIdAvailable && (
                            <Check className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500"
                                   size={20}/>
                        )}
                        {isUserIdAvailable !== null && !isUserIdAvailable && (
                            <X className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500" size={20}/>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={checkDuplicateUsername}
                        className="bg-gray-200 text-gray-700 border-y border-r border-gray-300 px-3 py-2 rounded-r-md hover:opacity-80 transition duration-150"
                        disabled={isLoading}
                    >
                        중복확인
                    </button>
                </div>
                {errors.userId && <p className="text-red-500 text-sm mt-1 mb-2">{errors.userId}</p>}
                <div className="mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="이름(본명)"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black transition duration-150 ease-in-out`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4">
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
                <div className="mb-4">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="비밀번호 확인"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black transition duration-150 ease-in-out`}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        name="invitationCode"
                        placeholder="초대코드"
                        value={formData.invitationCode}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.invitationCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-1 focus:ring-black transition duration-150 ease-in-out`}
                    />
                    {errors.invitationCode && <p className="text-red-500 text-sm mt-1">{errors.invitationCode}</p>}
                </div>
                <button
                    type="submit"
                    className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md transition duration-150 
                    ${isFormValid() ? 'hover:opacity-80' : 'opacity-50 cursor-not-allowed'}`}
                    disabled={!isFormValid() || isLoading}
                >
                    {isLoading ? '회원가입 중...' : '회원가입하기'}
                </button>
            </form>
            <Link to="/login">
                <div className="text-center mt-4">
                    <p className="text-gray-500 hover:opacity-80">기존 아이디로 로그인하기</p>
                </div>
            </Link>
        </div>
    );
}

export default RegisterForm;