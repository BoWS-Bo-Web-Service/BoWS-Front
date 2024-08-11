import React, { useCallback, useRef, useState } from 'react';
import { Check } from 'lucide-react';

const FileUploader = ({ onFileChange, error }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = useCallback((file) => {
        if (file && file.name.endsWith('.sql')) {
            setFileName(file.name);
            setIsUploaded(true);
            onFileChange(file);
        } else {
            setFileName('');
            setIsUploaded(false);
            onFileChange(null);
        }
    }, [onFileChange]);

    const onInputChange = (e) => {
        handleFileChange(e.target.files[0]);
    };

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileChange(e.dataTransfer.files[0]);
    }, [handleFileChange]);

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    return (
        <div className="mb-10 w-full">
            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-100 ${
                    isDragging ? 'border-blue-500 bg-blue-50' : isUploaded ? 'border-green-500 bg-green-50' : 'border-gray-300'
                }`}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => fileInputRef.current.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onInputChange}
                    accept=".sql"
                    className="hidden"
                />
                {isUploaded ? (
                    <p className="text-lg mb-2 text-green-600 flex items-center justify-center">
                        <Check className="text-green-500" size={20}/>
                        <span className="ml-2">파일이 업로드 되었습니다: {fileName}</span>
                    </p>
                ) : (
                    <div className="text-lg mb-2">
                        {fileName || 'schema.sql 파일을 드래그 앤 드롭 해주세요'}
                        <p className="text-sm text-gray-500">혹은 클릭 후 파일을 선택해주세요</p>
                    </div>
                )}
            </div>
            {error && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
        </div>
    );
};

export default FileUploader;