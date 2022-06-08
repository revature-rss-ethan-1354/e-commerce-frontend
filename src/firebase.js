import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_FIREBASE_DATABASE_URL}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREABSE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const realTimeDb = app.database();
const db = app.firestore();
const auth = app.auth();
const storage = firebase.storage();

export { auth, db, storage, realTimeDb };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyCX1biARUSR-xKcI5PenMTGMEkHSaGezrU',
//   authDomain: 'revature-project3.firebaseapp.com',
//   databaseURL: 'https://revature-project3-default-rtdb.firebaseio.com',
//   projectId: 'revature-project3',
//   storageBucket: 'revature-project3.appspot.com',
//   messagingSenderId: '474837192541',
//   appId: '1:474837192541:web:92ee49d481559a1aa422b4',
//   measurementId: 'G-5C542YWPKC',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
