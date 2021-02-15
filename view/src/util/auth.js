export const authMiddleWare = (history) => {
    const authToken = localStorage.getItem('AuthToken');
    if(authToken === null){
        history.push('/login')
    }
}

export const setAuthToken = (token) => {
    localStorage.setItem('AuthToken', `Bearer ${token}`);
}