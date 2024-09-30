// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB876jU3Rvc3o4c8lj3CxFohB3inbk29hk',
  authDomain: 'spisop-c3643.firebaseapp.com',
  projectId: 'spisop-c3643',
  storageBucket: 'spisop-c3643.appspot.com',
  messagingSenderId: '217632398894',
  appId: '1:217632398894:web:f3da08a825e3b56df4c9bf',
  measurementId: 'G-068PT6R7XZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
