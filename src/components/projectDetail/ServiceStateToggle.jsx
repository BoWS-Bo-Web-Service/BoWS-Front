import React from 'react';

const ServiceStateToggle = ({ service }) => {
    return (
        <div className="p-4 bg-gray-50 border-t min-h-[90px]">
            <div className="mb-2 flex gap-2 items-center">
                <span className="text-sm font-semibold">이미지 이름:</span>
                <span className="text-sm text-gray-700">{service.imageName}</span>
            </div>
            {service.state === 'Running' && (
                <span className="text-sm text-gray-700">서비스가 정상 작동 중입니다 🚀</span>
            )}
            {service.state !== 'Running' && (
                <>
                    <div className="mb-2 flex gap-2 items-center">
                        <span className="text-sm font-semibold">상태:</span>
                        <span className="text-sm text-gray-700">{service.state}</span>
                    </div>
                    {service.stateReason && (
                        <div className="mb-2 flex gap-2 items-center">
                            <span className="text-sm font-semibold">이유:</span>
                            <span className="text-sm text-gray-700">{service.stateReason}</span>
                        </div>
                    )}
                    {service.stateMessage && (
                        <div className="mb-2 flex gap-2 items-center">
                            <span className="text-sm font-semibold">메시지:</span>
                            <span className="text-sm text-gray-700">{service.stateMessage}</span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ServiceStateToggle;