import {createBrowserRouter, RouterProvider, redirect} from "react-router-dom";
import Main from "./routes/Main.jsx";
import NewProject from "./routes/NewProject.jsx";
import ProjectDetail from "./routes/ProjectDetail.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import RootLayout from "./RootLayout.jsx";
import ErrorPage from "./components/common/Errorpage.jsx";

const tokenLoader = () => {
    const token = localStorage.getItem('token');
    return { token };
};

const protectedLoader = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return redirect('/login');
    }
    return null;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        id: 'root',
        loader: tokenLoader,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Main /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            {
                path: 'projects',
                element: <NewProject />,
                loader: protectedLoader
            },
            {
                path: 'projects/:projectId',
                element: <ProjectDetail />,
                loader: protectedLoader
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;