import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const NewProjectForm = ()=> {
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
        backendImageName: 'BE 컨테이너 이미지 이름',
        frontendImageName: 'FE 컨테이너 이미지 이름',
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

    // const handleDestroy = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.get('http://bows.co.kr:8080/api/destroy', {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         alert(response.data.message);
    //     } catch (error) {
    //         console.error('Error:', error);
    //         alert('애플리케이션 삭제에 실패했습니다');
    //     }
    // }

    return (
        <div className="flex flex-col w-full h-[60%]">
            <div className="items-center flex-1 justify-center" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-2">
                    {Object.keys(formData).map((key, index) => (
                        <div key={key} className="mb-4 w-full md:w-1/2 px-2">
                            <label className="block text-gray-700 mb-2" htmlFor={key}>
                                {fieldLabels[key]}
                            </label>
                            <input
                                type="text"
                                name={key}
                                id={key}
                                value={formData[key]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-2 justify-end">
                <Link to="/">
                    <button className="w-[140px] h-[40px] text-gray-700 hover:opacity-[80%] rounded-xl">
                        x 작성 취소
                    </button>
                </Link>
                <button type="submit" className="w-[140px] h-[40px] border bg-[#007AFF] hover:opacity-[80%] rounded-xl text-white" onClick={handleSubmit}>
                    배포하기
                </button>
            </div>
        </div>
    )
};

export default NewProjectForm;