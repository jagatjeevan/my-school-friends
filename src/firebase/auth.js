import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from './utils';

export const fetchProvidersWithEmail = (cred) => {
  signInWithCredential(auth, cred)
    .then((user) => linkWithCredential(user, cred))
    .catch((err) => console.log(err));
};

export const createUserWithEmailPassword = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signWithEmailAndPassword = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signWithGoogleAuthenticator = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const { user } = result;
      console.log('user from google authenticator', user);
      return user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const { email } = error.customData;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log('credential error', credential);
    });
};

export const signWithFacebookAuthenticator = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const response = await signInWithPopup(auth, provider);
    return response.user;
  } catch (error) {
    const errValue = error;
    console.log('error', error);
  }
};

export const logoutUser = () => signOut(auth);

export const checkIfLoggedIn = (updateStateDispatch) =>
  onAuthStateChanged(auth, (user) => {
    if (user && user.uid) {
      updateStateDispatch(user);
      return user;
    }

    return null;
  });
