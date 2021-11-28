import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// 1) when seeding the database you'll have to uncomment this!
// import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyCTi8Jg-nqsG8y__DgZSqsMGCMkWnJXlYk",
  authDomain: "netflix-clone-e20b1.firebaseapp.com",
  projectId: "netflix-clone-e20b1",
  storageBucket: "netflix-clone-e20b1.appspot.com",
  messagingSenderId: "540321854577",
  appId: "1:540321854577:web:e131d218d0c5b7ada597d0",
  measurementId: "G-X95TC91QMJ",
};

const firebase = Firebase.initializeApp(config);
// 2) when seeding the database you'll have to uncomment this!
// seedDatabase(firebase);
// 3) once you have populated the database (only run once!), re-comment this so you don't get duplicate data

export { firebase };
