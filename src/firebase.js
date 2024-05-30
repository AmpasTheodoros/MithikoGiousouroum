import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD2aWKgXIOSBrmfcJnHSWhX7o7TU7h6hjc",
  authDomain: "mithikogiousouroum.firebaseapp.com",
  projectId: "mithikogiousouroum",
  storageBucket: "mithikogiousouroum.appspot.com",
  messagingSenderId: "766697975516",
  appId: "1:766697975516:web:81ff5ae19049a1e7cd4e19",
  measurementId: "G-HDJRGJQESC"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);