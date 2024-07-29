import Header from "../components/Header.jsx";
import ProjectList from "../components/ProjectList.jsx";
import {Link} from "react-router-dom";

function Main() {

    return (
        <div className="w-[1280px] overflow-hidden flex flex-col">
            <Header/>
            <div className="flex w-full justify-end mb-5">
                <Link to="/project">
                    <button className="w-[140px] h-[40px] border bg-[#007AFF] hover:opacity-[80%] rounded-xl text-white">
                        + 프로젝트 추가
                    </button>
                </Link>
            </div>
            <ProjectList />
        </div>
    )
}
export default Main;