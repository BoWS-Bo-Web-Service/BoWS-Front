import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./routes/Main.jsx";
import NewProject from "./routes/NewProject.jsx";
import ProjectDetail from "./routes/ProjectDetail.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";

function App() {
    return (
        <div className="w-screen bg-white flex justify-center">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Main />} />
                    <Route path="/projects" element={<NewProject />} />
                    <Route path="/projects/:projectId" element={<ProjectDetail />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;