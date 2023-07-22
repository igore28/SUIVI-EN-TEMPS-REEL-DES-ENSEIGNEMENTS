// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAbBUNkG83TBmCb2DKEgZF3syoPiw0wilk",
    authDomain: "sdes-87623.firebaseapp.com",
    projectId: "sdes-87623",
    storageBucket: "sdes-87623.appspot.com",
    messagingSenderId: "646113967970",
    appId: "1:646113967970:web:dcad8ea942b5359554763b"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;