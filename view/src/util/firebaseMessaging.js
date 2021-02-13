import  { messaging } from "./firebase";
import { firebaseWebKey } from './configFirebase'
import { sendFcmTokenToServer } from './serverApi'
 
function registerFcmMessage() {
    console.log('registerFcmMessage')
    
    return navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
        console.log('middleregisterFcmMessage')
        return messaging.getToken()
    })
    .then(function (currentToken) {
        console.log('current token', currentToken);
        //send token to the server
        return sendFcmTokenToServer(currentToken)
    })
    .then(() => {
        return messaging.onMessage((payload) => {
            console.log('New Message received. ', payload);
            // ...
        });
    })
    .catch((error) => {
        console.log('Push Message is disallowed', error);
    })
    console.log('end registerFcmMessage')
}


export { registerFcmMessage }