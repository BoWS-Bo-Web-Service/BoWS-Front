import React from 'react';
import circle_icon from '../assets/circle_notice.svg'
import trash_bin_icon from '../assets/trash_bin_icon.svg'
import edit_icon from '../assets/edit_icon.svg'

const ProjectItem = ({ checked, title, issueNumber, timestamp, milestone, authorInfo, isLast }) => {
    return (
        <div className={`h-[90px] w-full flex items-center justify-between bg-white p-4 border-b border-gray-300 ${isLast ? 'rounded-b-lg border-b-0' : ''}`}>
            <div className="flex">
                <input type="checkbox" checked={checked} className="mr-2"/>
                <div className="flex items-center space-x-2">
                    <img alt="circle icon" src={circle_icon}/>
                    <div className="text-gray-900 text-lg">{title}</div>
                    <div className="text-gray-500 text-sm">
                        {issueNumber} {authorInfo} {timestamp} {milestone}
                    </div>
                </div>
            </div>
            <div className="flex gap-5 space-x-2">
                <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
                    <img alt="edit icon" src={edit_icon}/> 편집
                </button>
                <button className="flex items-center gap-2 text-red-500 hover:text-red-700">
                    <img alt="trash bin icon" src={trash_bin_icon}/> 삭제
                </button>
            </div>
        </div>
    );
};

export default ProjectItem;