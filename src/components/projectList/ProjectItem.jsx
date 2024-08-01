import React from 'react';
import trash_bin_icon from '../../assets/trash_bin_icon.svg'
import edit_icon from '../../assets/edit_icon.svg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faGlobe} from "@fortawesome/free-solid-svg-icons";
import {calculateAge} from '../../utils/dateUtils.js';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from '../../constants/network.js'

const ProjectItem = ({ isLast, projectId, projectName, domain, projectCreatedTime }) => {

    const projectAge = calculateAge(projectCreatedTime);
    const navigate = useNavigate();

    const handleProjectDelete = async () => {
        try {
            const response = await axios.delete(`${SERVER_URL}/api/projects/${projectId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert("프로젝트가 삭제되었습니다");
            window.location.href="/";
        } catch (error) {
            console.error('Error:', error);
            alert("프로젝트 삭제에 실패했습니다");
        }
    };

    return (
        <div className={`h-[90px] w-full flex items-center justify-between bg-white p-4 border-gray-300 hover:cursor-pointer
        ${isLast ? 'rounded-b-lg border-b-0' : ''}`}>
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
                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                    <img alt="edit icon" src={edit_icon}/> 편집
                </button>
                <button className="flex items-center gap-2 text-red-500 hover:text-red-700"
                        onClick={handleProjectDelete}>
                    <img alt="trash bin icon" src={trash_bin_icon}/> 삭제
                </button>
            </div>
        </div>
    );
};

export default ProjectItem;