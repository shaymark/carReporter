// serverApi.js
import axios from 'axios';


export const sendFcmTokenToServer = (fcmToken) => {
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    
    const body = {
        fcmToken: fcmToken
    };
       
    let options = {};
        
        options = {
            url: '/registerFcmToken',
            method: 'post',
            data: body
        }

        
        return axios(options)
        .then((response) => {
            console.log(response)
        })
        .catch((err)=> {
            console.log(err) 
        })
}