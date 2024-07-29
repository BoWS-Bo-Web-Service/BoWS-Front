import React from 'react';
import ProjectItem from './ProjectItem';

const ProjectList = () => {
    const projects = [
        {
            checked: true,
            title: '프로젝트 제목',
            issueNumber: '#이슈번호',
            authorInfo: '작성자 및 타임스탬프 정보',
            milestone: '마일스톤',
        },
        {
            checked: false,
            title: '이슈트래커 프로젝트',
            issueNumber: '#1',
            authorInfo: '이 이슈가 8분 전, samsamis9님에 의해 작성되었습니다.',
            milestone: '그룹프로젝트:이슈트래커',
        },
        {
            checked: false,
            title: '이슈트래커 프로젝트',
            issueNumber: '#1',
            authorInfo: '이 이슈가 8분 전, samsamis9님에 의해 작성되었습니다.',
            milestone: '그룹프로젝트:이슈트래커',
        },
    ];

    return (
        <div className="rounded-lg w-[1280px] border border-gray-300">
            <div className="h-[65px] bg-[#F7F7FC] border-b border-gray-300 rounded-t-lg flex items-center">
                <div className="text-gray-700 text-sm text ml-4 font-semibold">
                    2개 프로젝트 실행 중
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
                {projects.map((project, index) => (
                    <ProjectItem key={index} isLast={index === projects.length - 1} {...project} />
                ))}
            </div>
        </div>
    );
};

export default ProjectList;