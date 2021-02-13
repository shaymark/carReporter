//firebase.js
import firebase from "firebase/app"
import "firebase/messaging";
import { firebaseConfig } from './configFirebase'


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging()

export { messaging }


//.then(() => {
//    messaging.onMessage((payload) => {
//        console.log('Message received. ', payload);
//        // ...
//    });
//})
