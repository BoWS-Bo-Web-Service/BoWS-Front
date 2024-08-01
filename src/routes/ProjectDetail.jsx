import Header from "../components/Header.jsx";
import ServiceList from "../components/projectDetail/ServiceList.jsx";

function Main() {

    return (
        <div className="w-[1280px] overflow-hidden flex flex-col">
            <Header/>
            <div className="my-10">
                <ServiceList />
            </div>
        </div>
    )
}
export default Main;