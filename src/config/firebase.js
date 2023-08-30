import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyAcQ8_YcLIZyjEBsdQ_L0SHh2h8euImBuE",

  authDomain: "twittelopes-a5620.firebaseapp.com",

  projectId: "twittelopes-a5620",

  storageBucket: "twittelopes-a5620.appspot.com",

  messagingSenderId: "17220167013",

  appId: "1:17220167013:web:ff8464f7c13e57046e6d8c"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();
const storageRef = ref(storage);
export { app, auth, storageRef };