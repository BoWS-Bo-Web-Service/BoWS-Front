import { Outlet, useRouteLoaderData } from 'react-router-dom';

function RootLayout() {
    const { accessToken, refreshToken } = useRouteLoaderData('root');

    return (
        <div className="w-screen bg-white flex justify-center">
            {/* 여기에 네비게이션 바 등을 추가 */}
            <Outlet context={{ accessToken, refreshToken }} />
        </div>
    );
}


export default RootLayout;