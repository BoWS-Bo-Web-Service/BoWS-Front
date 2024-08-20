import React, {useEffect, useState} from 'react';
import ProjectItem from './ProjectItem.jsx';
import axios from "axios";
import {SERVER_URL} from '../../constants/network.js'
import {useRouteLoaderData} from "react-router-dom";

const ProjectList = () => {
    const { token } = useRouteLoaderData('root');
    const [projects, setProjects] = useState([]);
    const numOfProjects = projects.length;

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/projects`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setProjects(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleNoProject = () => {
        return (
            <div className="h-[90px] w-full flex items-center justify-between bg-white p-4 border-gray-300 rounded-b-lg border-b-0">
                아직 프로젝트가 생성되지 않았습니다. 프로젝트를 생성해봅시다 🚀
            </div>
        )
    }

    return (
        <div className="rounded-lg w-[1280px] border border-gray-300">
            <div className="h-[65px] bg-[#F7F7FC] border-b border-gray-300 rounded-t-lg flex items-center">
                <div className="pl-4 text-gray-700 text-sm text ml-4 font-semibold">
                    {numOfProjects}개 프로젝트 실행 중
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
                {numOfProjects === 0 ? handleNoProject() : projects.map((project, index) => (
                    <ProjectItem key={index} isLast={index === projects.length - 1} {...project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectList;