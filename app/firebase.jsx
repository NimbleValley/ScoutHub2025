import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwWrLjCbvrbWeEKCdz6X1kQsRqudLogvk",
  authDomain: "robotics-3c92c.firebaseapp.com",
  projectId: "robotics-3c92c",
  storageBucket: "robotics-3c92c.firebasestorage.app",
  messagingSenderId: "286446162060",
  appId: "1:286446162060:web:30976ed5981cb902d4eba9",
  measurementId: "G-LMVZ79XKBW"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };

