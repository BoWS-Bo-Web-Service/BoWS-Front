import React from 'react';

const Notice = ({noticeTitle, noticeItems, configExamples }) => {
    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-10">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">{noticeTitle}</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                        <ul className="list-disc pl-5 space-y-1">
                            {noticeItems.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4 bg-yellow-100 p-3 rounded-md">
                        <p className="font-semibold mb-2 text-yellow-800">설정 예시:</p>
                        <pre className="text-xs overflow-x-auto whitespace-pre-wrap break-words text-yellow-900">
                    <code>
                        {configExamples.map((example, index) => (
                            <React.Fragment key={index}>
                                {example}
                                {index < configExamples.length - 1 && <br/>}
                            </React.Fragment>
                        ))}
                      </code>
              </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notice;