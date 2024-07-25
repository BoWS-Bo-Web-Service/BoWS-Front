import React, { useState } from 'react';
import axios from 'axios';

const AppDeploymentForm = ()=> {
    const [formData, setFormData] = useState({
        projectName: '',
        domain: '',
        backendImageName: '',
        frontendImageName: '',
        dbPassword: '',
        dbEndpoint: '',
        dbUserName: '',
        dbUserPassword: ''
    });

    const fieldLabels = {
        projectName: '프로젝트 이름',
        domain: '도메인 (도메인 등록 후 적어주세요)',
        backendImageName: '백엔드 이미지 이름',
        frontendImageName: '프론트엔드 이미지 이름',
        dbPassword: '데이터베이스 비밀번호',
        dbEndpoint: '데이터베이스 엔드포인트',
        dbUserName: '데이터베이스 사용자 이름',
        dbUserPassword: '데이터베이스 사용자 비밀번호'
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://bows.co.kr:8080/api/create', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error:', error);
            alert('애플리케이션 배포에 실패했습니다');
        }
    };

    const handleDestroy = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('http://bows.co.kr:8080/api/destroy', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error:', error);
            alert('애플리케이션 삭제에 실패했습니다');
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6">애플리케이션 배포</h2>
                {Object.keys(formData).map((key) => (
                    <div key={key} className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor={key}>
                            {fieldLabels[key]}
                        </label>
                        <input
                            type="text"
                            name={key}
                            id={key}
                            value={formData[key]}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                ))}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    애플리케이션 배포하기
                </button>
            </form>

            <button className="mt-10 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    onClick={handleDestroy}
            >
                애플리케이션 제거하기
            </button>
        </div>
    )
};

export default AppDeploymentForm;