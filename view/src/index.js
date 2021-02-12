import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { deleteToken, getToken, receiveMessage } from './util/firebaseMessaging' 

// we do this in order to proxy all request to the functions server remove this for dev
// axios.defaults.baseURL = "https://us-central1-car-reporter.cloudfunctions.net/api";

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
