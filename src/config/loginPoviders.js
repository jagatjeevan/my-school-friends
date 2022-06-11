import labels from './label';

export const enabledLoginProvider = {
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

export const providerName = {
  facebook: "facebook",
  google: "google",
  twitter: "twitter"
}
