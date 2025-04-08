import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC76s5AveqYgWIFRfnVuwIhxeT9UR4DBnw',
  authDomain: 'olx-clone-a84e6.firebaseapp.com',
  projectId: 'olx-clone-a84e6',
  storageBucket: 'olx-clone-a84e6.firebasestorage.app',
  messagingSenderId: '652799048458',
  appId: '1:652799048458:web:f9d57ad336c063649758f3',
  measurementId: 'G-WQKQC7S8ED',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export {app, auth, db, storage}