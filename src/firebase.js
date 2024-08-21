import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDM9w-pNY4QH5b-4ytGM7ikezn6c2ahRsc",
    authDomain: "netflix-clone-1432c.firebaseapp.com",
    projectId: "netflix-clone-1432c",
    storageBucket: "netflix-clone-1432c.appspot.com",
    messagingSenderId: "65178048230",
    appId: "1:65178048230:web:c9fe0a8f78f2ce636bcd27"
  };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth()
  const db = getFirestore()

  export {app,auth,db}