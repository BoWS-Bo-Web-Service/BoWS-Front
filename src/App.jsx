import {createBrowserRouter, RouterProvider, redirect, Outlet} from "react-router-dom";
import Main from "./routes/Main.jsx";
import NewProject from "./routes/NewProject.jsx";
import ProjectDetail from "./routes/ProjectDetail.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import RootLayout from "./RootLayout.jsx";
import RouterErrorBoundary from "./components/common/RouterErrorBoundary.jsx";
import RootErrorBoundary from "./components/common/RootErrorBoundary.jsx";

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

const ProtectedRoutes = () => {
    return <Outlet />;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        id: 'root',
        loader: tokenLoader,
        errorElement: <RootErrorBoundary />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                element: <ProtectedRoutes />,
                loader: protectedLoader,
                errorElement: <RouterErrorBoundary />,
                children: [
                    { index: true, element: <Main /> },
                    {
                        path: 'projects',
                        element: <NewProject />
                    },
                    {
                        path: 'projects/:projectId',
                        element: <ProjectDetail />
                    },
                ]
            }
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;