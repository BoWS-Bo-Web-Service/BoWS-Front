import {calculateAge} from "../../utils/dateUtils.js";
import {useState} from "react";
import ServiceStateToggle from "./ServiceStateToggle.jsx";

const ServiceItem = ({isLast, service }) => {
    const [expanded, setExpanded] = useState(false);

    const getStatusColor = (serviceState) => {
        switch (serviceState) {
            case 'Running': return 'bg-green-500';
            case 'Waiting': return 'bg-yellow-500';
            case 'Terminated': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    }

    const formattedAge = calculateAge(service.age);

    return (
        <>
            <div
                className={`h-[90px] serviceList-grid 
                items-center w-full bg-white border-gray-300 relative cursor-pointer ${isLast ? 'rounded-b-lg border-b-0' : ''}`}
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex justify-end items-center h-full">
                    <div className={`w-4 h-4 rounded-full ${getStatusColor(service.state)}`}></div>
                </div>
                <div className="service-item-grid-box">
                    {service.serviceName}
                </div>
                <div className="service-item-grid-box">
                    {service.externalIps === null ? "외부 접속 가능한 IP가 없습니다" : service.externalIps}
                </div>
                <div className="service-item-grid-box">
                    {`[${service.ports}]`}
                </div>
                <div className="service-item-grid-box">
                    {formattedAge}
                </div>
                <div className="flex justify-center items-center h-full">
                    <svg className={`w-6 h-6 transition-transform ${expanded ? 'transform rotate-180' : ''}`}
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                </div>
            </div>
            {expanded && <ServiceStateToggle service={service}/>}
        </>
    )
};

export default ServiceItem;