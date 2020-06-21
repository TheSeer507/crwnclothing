import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDZq1iQ0_BOzyUOilJYfom3GEMjX0VmNSw",
    authDomain: "crwn-db-8174f.firebaseapp.com",
    databaseURL: "https://crwn-db-8174f.firebaseio.com",
    projectId: "crwn-db-8174f",
    storageBucket: "crwn-db-8174f.appspot.com",
    messagingSenderId: "150612136399",
    appId: "1:150612136399:web:7bb3b34290ad3806d582ba",
    measurementId: "G-CEC5HY5NWW"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
  	if (!userAuth) return;

  	const userRef = firestore.doc(`users/${userAuth.uid}`);

  	const snapShot = await userRef.get();

  	if(!snapShot.exists){
  		const {displayName, email} = userAuth;
  		const createdAt = new Date();

  		try{
  			await userRef.set({
  				displayName,
  				email,
  				createdAt,
  				...additionalData
  			})
  		}catch (error){
  			console.log('error creating user', error.message);
  		}
  	}

  	return userRef;

  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
