// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiIlDQuO2nSW12P11pIuqhcutUO5zP3LM",
  authDomain: "quiz-in-react-66067.firebaseapp.com",
  projectId: "quiz-in-react-66067",
  storageBucket: "quiz-in-react-66067.appspot.com",
  messagingSenderId: "730880666727",
  appId: "1:730880666727:web:930178208021d9503278c2",
  measurementId: "G-XSBBJDHLNJ",
  databaseURL: "https://quiz-in-react-66067-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
