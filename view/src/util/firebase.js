//firebase.js
import firebase from "firebase/app"
import "firebase/messaging";
import { firebaseConfig } from './configFirebase'

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging()

navigator.serviceWorker.register('/firebase-messaging-sw.js')
.then((registration) => {
    return messaging.getToken()
})
.then(function (currentToken) {
    return console.log('current token', currentToken);
})
.then(() => {
    return messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        // ...
    });
})
.catch((error) => {
    console.log('Push Message is disallowed', error);
})

export { messaging }


//.then(() => {
//    messaging.onMessage((payload) => {
//        console.log('Message received. ', payload);
//        // ...
//    });
//})
