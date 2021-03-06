import labels from './label';

const enabledLoginProvider = {
  loginWithEmailAndPassword: {
    id: 'loginWithEmailAndPassword',
    label: labels.loginWithEmailAndPassword,
  },
  googleAuthenticator: {
    id: 'googleAuthenticator',
    label: labels.loginWithGoogleAuth,
  },
  facebookAuthenticator: {
    id: 'facebookAuthenticator',
    label: labels.loginWithFacebook
  }
};

export default enabledLoginProvider;
