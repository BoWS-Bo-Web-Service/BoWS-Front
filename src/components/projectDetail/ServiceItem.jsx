import {calculateAge} from "../../utils/dateUtils.js";

const ServiceItem = ({isLast, serviceName, externalIps, ports, age }) => {

    const serviceAge = calculateAge(age);

    return (
        <div className={`h-[90px] flex items-center w-full bg-white border-gray-300 
        ${isLast ? 'rounded-b-lg border-b-0' : ''}`}>
                <div className="flex flex-1 justify-center text-gray-500 text-sm">
                    {serviceName}
                </div>
                <div className="flex flex-1 justify-center text-gray-500 text-sm">
                    {externalIps === null ? "외부 접속 가능한 IP가 없습니다" : externalIps}
                </div>
                <div className="flex flex-1 justify-center text-gray-500 text-sm">
                    {`[${ports}]`}
                </div>
                <div className="flex flex-1 justify-center text-gray-500 text-sm">
                    {serviceAge}
                </div>
        </div>
    )
};

export default ServiceItem;