import React, {useState} from 'react';
import trash_bin_icon from '../../assets/trash_bin_icon.svg'
import edit_icon from '../../assets/edit_icon.svg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faGlobe} from "@fortawesome/free-solid-svg-icons";
import {calculateAge} from '../../utils/dateUtils.js';
import axios from "axios";
import {useNavigate, useRouteLoaderData} from "react-router-dom";
import {SERVER_URL} from '../../constants/network.js'
import LoadingSpinner from "../common/LoadingSpinner.jsx";

const ProjectItem = ({ isLast, projectId, projectName, domain, projectCreatedTime }) => {
    const { accessToken } = useRouteLoaderData('root');
    const projectAge = calculateAge(projectCreatedTime);
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleProjectDelete = async () => {
        setShowConfirmDialog(false);
        setIsDeleting(true);
        try {
            const response = await axios.delete(`${SERVER_URL}/api/projects/${projectId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            alert("프로젝트가 삭제되었습니다");
            window.location.href="/";
        } catch (error) {
            console.error('Error:', error);
            alert("프로젝트 삭제에 실패했습니다");
        } finally {
            setIsDeleting(false);
        }
    };

    const ConfirmDialog = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg flex flex-col gap-2">
                <p className="flex mb-4">정말로 프로젝트를 삭제하시겠습니까?</p>
                <div className="flex justify-end">
                    <button className="px-4 py-1 text-gray-800 rounded mr-2"
                            onClick={() => setShowConfirmDialog(false)}>
                        x 취소
                    </button>
                    <button className="px-4 py-1 bg-red-500 text-white rounded"
                            onClick={handleProjectDelete}>
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`h-[90px] w-full flex items-center justify-between bg-white pl-8 border-gray-300 hover:cursor-pointer
        ${isLast ? 'rounded-b-lg border-b-0' : ''}`}>
            {showConfirmDialog && <ConfirmDialog />}
            {isDeleting && <LoadingSpinner loading={isDeleting} message={"프로젝트 삭제 중..."} />}
            <div className="flex items-center" onClick={() => navigate(`/projects/${projectId}`)}>
                <div className="text-gray-900 text-xl">{projectName}</div>
                <div className="text-gray-500 text-sm flex ml-10">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faGlobe} />
                        <p className="ml-2">{domain}</p>
                    </div>
                    <div className="flex items-center ml-5">
                        <FontAwesomeIcon icon={faClock} />
                        <p className="ml-2">{projectAge}</p>
                    </div>
                </div>
            </div>
            <div className="flex gap-5 space-x-2">
                <button className="flex items-center gap-2 mr-10 text-red-500 hover:text-red-700"
                        onClick={() => setShowConfirmDialog(true)}>
                    <img alt="trash bin icon" src={trash_bin_icon}/> 프로젝트 삭제
                </button>
            </div>
        </div>
    );
};

export default ProjectItem;