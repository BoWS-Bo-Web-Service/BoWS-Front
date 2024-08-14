export function getAuthToken() {
    const token = localStorage.getItem('token');
    return token;
}

export function logoutAction() {
    localStorage.removeItem('token');
    window.location.href='/login';
