// serverApi.js
import axios from 'axios';

const setAuthToken = () => {
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` }; 
}

const clearAuthToken = () => {
    delete axios.defaults.headers.common['Authorization']
}

export const sendFcmTokenToServer = (fcmToken) => {
    setAuthToken()
        
    return axios({
        url: '/registerFcmToken',
        method: 'post',
        data: {
            fcmToken: fcmToken
        }
    })
    .then((response) => {
        console.log(response)
    })
    .catch((err)=> {
        console.log(err) 
    })
}

export const postMessage = (message) => {
    setAuthToken()

    return axios({
        url: '/message',
        method: 'post',
        data: message
    })
}

export const postAnonymosMessage = (message) => {
    clearAuthToken()

    return axios({
        url: '/messageAnonymouse',
        method: 'post',
        data: message
    })
}

export const getAllAddress = () => {
    setAuthToken()

    return axios({
        url: '/address',
        method: 'get'
    }) 
}

export const getAllMessages = () => {
    setAuthToken()

    return axios({
        url: '/message',
        method: 'get'
    }) 
}

export const getUserDetails = () => {
    setAuthToken()

    return axios({
        url: '/user',
        method: 'get'
    }) 
}

export const loginServer = (userDetail) => {
    clearAuthToken()
    
    return axios({
        url: '/login',
        method: 'post',
        data: userDetail
    })  
}
