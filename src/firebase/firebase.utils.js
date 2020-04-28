import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDSkP4Jjm4Lh45CukafhKeZEOp0WC9ZST4",
  authDomain: "react-clothing-app-db.firebaseapp.com",
  databaseURL: "https://react-clothing-app-db.firebaseio.com",
  projectId: "react-clothing-app-db",
  storageBucket: "react-clothing-app-db.appspot.com",
  messagingSenderId: "351084678776",
  appId: "1:351084678776:web:b0df02479a4ec489b2278d",
  measurementId: "G-NJMPXXBKT8"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
