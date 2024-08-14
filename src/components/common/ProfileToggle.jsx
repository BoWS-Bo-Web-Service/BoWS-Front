import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import User_icon from '../../assets/user_icon.svg'
import {logoutAction} from "../../utils/auth.js";

const ProfileToggle = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleLogout = () => {
        console.log('logout');
        logoutAction();
    }

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="relative">
            <div
                className="border rounded-full overflow-hidden cursor-pointer"
                onClick={toggleMenu}
            >
                <img className="h-[30px] object-cover m-2" alt="userProfile" src={User_icon} />
            </div>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-300 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 w-full text-left"
                        >
                            <LogOut className="mr-2" size={16} />
                            로그아웃
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileToggle;