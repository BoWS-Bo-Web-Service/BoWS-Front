import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./routes/Main.jsx";
import NewProject from "./routes/NewProject.jsx";

function App() {
    return (
        <div className="w-screen h-screen bg-[FEFEFE] flex justify-center">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/project" element={<NewProject />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;