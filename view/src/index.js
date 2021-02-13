import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { deleteToken, getToken, receiveMessage } from './util/firebaseMessaging' 

console.log('start')
const baseFunctionsUrl = {
  'production': "https://us-central1-car-reporter.cloudfunctions.net/api",
  'development': "http://localhost:5000/car-reporter/us-central1/api"
}
axios.defaults.baseURL = baseFunctionsUrl[process.env.NODE_ENV]

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
