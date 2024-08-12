import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { SERVER_URL } from '../../constants/network.js'
import LoadingSpinner from "../common/LoadingSpinner.jsx";
import FormValidator from "../../utils/formValidator.js";
import FileUploader from './FileUploader';

const NewProjectForm = ()=> {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        projectName: '',
        domain: '',
        backendImageName: '',
        frontendImageName: '',
        dbPassword: '',
        dbEndpoint: '',
        dbUserName: '',
        dbUserPassword: '',
        dbStorageSize: 1
    });
    const [file, setFile] = useState(null);

    const fieldLabels = {
        projectName: '프로젝트 이름 (영어 소문자, 숫자, - . _만 사용 가능합니다)',
        domain: '도메인 (도메인 등록 후 적어주세요)',
        backendImageName: 'BE 컨테이너 이미지 이름',
        frontendImageName: 'FE 컨테이너 이미지 이름',
        dbPassword: '데이터베이스 비밀번호',
        dbEndpoint: '데이터베이스 엔드포인트',
        dbUserName: '데이터베이스 사용자 이름',
        dbUserPassword: '데이터베이스 사용자 비밀번호',
        dbStorageSize: 'DB 스토리지 크기 (1-3GB, 숫자만 적어주세요)'
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleFileChange = (selectedFile) => {
        if (selectedFile && selectedFile.name.endsWith('.sql')) {
            setFile(selectedFile);
            setErrors(prev => ({ ...prev, file: '' }));
        } else {
            setFile(null);
            setErrors(prev => ({ ...prev, file: '유효한 .sql 파일을 선택해주세요' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = FormValidator.validateForm(formData, 'project');

        if (!file) {
            validationErrors.file = 'schema.sql 파일을 선택해주세요';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsLoading(true);
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            if (file) {
                formDataToSend.append('dbSchemaFile', file);
            }

            const response = await axios.post(`${SERVER_URL}/api/projects`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert("프로젝트 생성 성공");
            window.location.href=`/projects/${response.data}`;
        } catch (error) {
            console.error('Error:', error);
            alert('프로젝트 생성에 실패했습니다' + error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            projectName: '',
            domain: '',
            backendImageName: '',
            frontendImageName: '',
            dbPassword: '',
            dbEndpoint: '',
            dbUserName: '',
            dbUserPassword: '',
            dbStorageSize: 1,
        });
        setFile(null);
        setErrors({});
    }

    return (
        <div className="flex flex-col w-full h-[60%]">
            <LoadingSpinner loading={isLoading} message={"프로젝트 빌드 중..."} />
            <form className="items-center flex-1 justify-center" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-2">
                    {Object.keys(formData).map((key) => (
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
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                                    errors[key] ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                                }`}
                            />
                            {errors[key] && (
                                <p className="text-sm text-red-500 mt-1">{errors[key]}</p>
                            )}
                        </div>
                    ))}
                </div>
                <FileUploader onFileChange={handleFileChange} error={errors.file} />
                <div className="flex gap-2 justify-end">
                    <Link to="/">
                        <button type="button" className="w-[140px] h-[40px] text-gray-700 hover:opacity-[80%] rounded-xl"
                                onClick={handleCancel}>
                            x 작성 취소
                        </button>
                    </Link>
                    <button type="submit"
                            className="w-[140px] h-[40px] border bg-[#007AFF] hover:opacity-[80%] rounded-xl text-white">
                        배포하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewProjectForm;