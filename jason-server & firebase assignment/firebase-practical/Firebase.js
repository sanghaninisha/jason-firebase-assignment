// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-XrhbgSb5Rz9IOjJOoG_R1Cce_lc2HtU",
    authDomain: "fir-react-1c4b0.firebaseapp.com",
    projectId: "fir-react-1c4b0",
    storageBucket: "fir-react-1c4b0.firebasestorage.app",
    messagingSenderId: "1066127505573",
    appId: "1:1066127505573:web:65db133b370b1c0b78754c",
    measurementId: "G-3RXMFVRX2P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}