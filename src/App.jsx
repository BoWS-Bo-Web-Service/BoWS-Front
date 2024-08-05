import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./routes/Main.jsx";
import NewProject from "./routes/NewProject.jsx";
import ProjectDetail from "./routes/ProjectDetail.jsx";

function App() {
    return (
        <div className="w-screen bg-white flex justify-center">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/projects" element={<NewProject />} />
                    <Route path="/projects/:projectId" element={<ProjectDetail />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;