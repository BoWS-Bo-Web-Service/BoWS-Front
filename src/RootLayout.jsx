import { Outlet, useRouteLoaderData } from 'react-router-dom';

function RootLayout() {
    const { token } = useRouteLoaderData('root');

    return (
        <div className="w-screen bg-white flex justify-center">
            {/* 여기에 네비게이션 바 등을 추가할 수 있습니다 */}
            <Outlet context={{ token }} />
        </div>
    );
}

export default RootLayout;