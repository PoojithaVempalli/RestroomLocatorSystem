import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAPk8AuSnnqVN43DCGp7WNF2lZjiit5VtM",
  authDomain: "public-restroom-locator-14.firebaseapp.com",
  projectId: "public-restroom-locator-14",
  storageBucket: "public-restroom-locator-14.appspot.com",
  messagingSenderId: "933015415642",
  appId: "1:933015415642:web:521f820eab9f5eec6d6163",
  measurementId: "G-DNT0GBY630"
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = app.auth();
const analytics = getAnalytics();
const firebaseDb = getDatabase(app);
export  { auth, firebase , analytics , firebaseDb , db};