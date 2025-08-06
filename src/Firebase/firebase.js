// src/Firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // ✅ This line is important

const firebaseConfig = {
  apiKey: 'AIzaSyD48n23znrvHOS2hpSq-N8MOQQzCcXL45g',
  authDomain: 'jaywil-ampoyas.firebaseapp.com',
  projectId: 'jaywil-ampoyas',
  storageBucket: 'jaywil-ampoyas.firebasestorage.app',
  messagingSenderId: '239730806296',
  appId: '1:239730806296:web:e56588240bbb712595bd6d',
  measurementId: 'G-627WE02MBM'
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ This is what you import elsewhere

export { auth, analytics, db };
