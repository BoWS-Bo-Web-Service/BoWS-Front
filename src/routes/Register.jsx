import Logo from "../assets/BoWS_logo.svg";
import React from "react";
import RegisterForm from "../components/RegisterForm.jsx";

function Register() {
    return (
        <div className="w-[1280px] h-screen overflow-hidden flex flex-col">
            <div className="w-full text-center flex-grow-[1] flex flex-col justify-end pb-10">
                <img className="h-[125px] mx-auto" alt="Service Logo" src={Logo} />
                <p className="text-xl font-light mt-2 italic">인프라 구축부터 배포까지, 클릭 한 번에 무료로</p>
            </div>
            <div className="flex justify-center flex-grow-[2]">
                <RegisterForm />
            </div>
        </div>
    );
}

export default Register;