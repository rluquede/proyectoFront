// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwQOGGEvis4ODNu_0g_FQprl6FITjNH8c",
  authDomain: "onair-a77ac.firebaseapp.com",
  projectId: "onair-a77ac",
  storageBucket: "gs://onair-a77ac.appspot.com/",
  messagingSenderId: "34932233193",
  appId: "1:34932233193:web:171f617d969e262030f178"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default storage;