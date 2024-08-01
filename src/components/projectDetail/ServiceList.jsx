import React, {useEffect, useState} from 'react';
import ServiceItem from "./ServiceItem.jsx";
import axios from "axios";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faGlobe} from "@fortawesome/free-solid-svg-icons";
import {calculateAge} from "../../utils/dateUtils.js";
import {SERVER_URL} from '../../constants/network.js'

const ServiceList = () => {

    const params = useParams();
    const projectId = params.projectId;
    const [projectDetail, setProjectDetail] = useState({});
    const [serviceMetadata, setServiceMetadata] = useState([]);
    const projectAge = calculateAge(projectDetail.projectCreatedTime);

    const fetchServices = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/projects/${projectId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setProjectDetail(response.data);
            setServiceMetadata(response.data.serviceMetadata);
            console.log(response.data.serviceMetadata);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col w-full mb-10">
                <div className="text-2xl font-bold mb-5">
                    {projectDetail.projectName}
                </div>
                <div className="flex gap-5 text-sm text-gray-400">
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faGlobe}/>
                        {projectDetail.domain}
                    </div>
                    <div className="flex gap-2 items-center">
                        <FontAwesomeIcon icon={faClock}/>
                        {projectAge}
                    </div>
                </div>
            </div>
            <div className="rounded-lg w-[1280px] border border-gray-300">
                <div className="h-[65px] border-b border-gray-300 rounded-t-lg flex items-center bg-white">
                    <div className="flex flex-1 justify-center text-gray-700 text-sm text font-semibold">서비스 이름</div>
                    <div className="flex flex-1 justify-center text-gray-700 text-sm text font-semibold">External-IP</div>
                    <div className="flex flex-1 justify-center text-gray-700 text-sm text font-semibold">포트</div>
                    <div className="flex flex-1 justify-center text-gray-700 text-sm text font-semibold">시작 시간</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
                    {serviceMetadata.map((project, index) => (
                        <ServiceItem key={index} isLast={index === serviceMetadata.length - 1} {...project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceList;