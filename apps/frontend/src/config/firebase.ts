// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCGpi1HIYcBiH9Rp8udJAHzrsEp6rnAzUI',
  authDomain: 'orion-e0d92.firebaseapp.com',
  projectId: 'orion-e0d92',
  storageBucket: 'orion-e0d92.appspot.com',
  messagingSenderId: '314689419769',
  appId: '1:314689419769:web:811e4c93fde90437dea528',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
