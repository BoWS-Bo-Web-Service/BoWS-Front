import Header from "../components/common/Header.jsx";
import NewProjectForm from "../components/newProject/NewProjectForm.jsx";

function NewProject() {
    return (
        <div className="w-[1280px] overflow-y-auto scrollbar-hide flex flex-col mb-10">
            <Header/>
            <div className="flex flex-col w-full justify-end mb-5">
                <div className="text-2xl font-bold">
                    새로운 프로젝트 생성
                </div>
                <div className="border-t-[1px] w-full mt-5"></div>
            </div>
            <NewProjectForm/>
        </div>
    )
}

export default NewProject;