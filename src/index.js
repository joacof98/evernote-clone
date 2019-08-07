import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyCpk5R9zYNYdzWch0oXvKfEUsHl9z-pRU0",
  authDomain: "evernote-5f1a9.firebaseapp.com",
  databaseURL: "https://evernote-5f1a9.firebaseio.com",
  projectId: "evernote-5f1a9",
  storageBucket: "",
  messagingSenderId: "442694414039",
  appId: "1:442694414039:web:accca621ebd94920"
});


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
