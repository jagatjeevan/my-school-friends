import { useState } from 'react';
import labels from '../../config/label';
import enabledLoginProvider from '../../config/loginPoviders';
import Panel from '../panel';
import LoginWithEmailAndPassword from './LoginWithEmailAndPassword';
import LoginWithGoogleAuthenticator from './LoginWithGoogleAuthenticator';
import styles from './style.module.css';

const Login = () => {
  const [selectedLoginProvider, setSelectedLoginProvider] = useState(null);

  const activateOnEnter = () => {};
  const selectProvider = (loginProviderObj) => {
    if (
      loginProviderObj.id === (enabledLoginProvider.loginWithEmailAndPassword &&
      enabledLoginProvider.loginWithEmailAndPassword.id)
    ) {
      setSelectedLoginProvider(enabledLoginProvider.loginWithEmailAndPassword.id);
    }
    if (loginProviderObj.id === enabledLoginProvider.googleAuthenticator.id) {
      setSelectedLoginProvider(enabledLoginProvider.googleAuthenticator.id);
    }
  };

  const getLoginProviders = () =>
    Object.keys(enabledLoginProvider).map((loginProvider) => {
      const loginProviderObj = enabledLoginProvider[loginProvider];
      const selectedClass =
        loginProviderObj.id === selectedLoginProvider
          ? `${styles.loginOptions} ${styles.selectedClass}`
          : styles.loginOptions;

      return (
        <div
          onKeyUp={activateOnEnter}
          role="button"
          tabIndex={0}
          key={enabledLoginProvider[loginProvider].id}
          className={selectedClass}
          onClick={() => selectProvider(loginProviderObj)}
        >
          {loginProviderObj.label}
        </div>
      );
    });

  const showSelectedLoginForm = () => {
    switch (selectedLoginProvider) {
      case enabledLoginProvider.loginWithEmailAndPassword &&
        enabledLoginProvider.loginWithEmailAndPassword.id:
        return <LoginWithEmailAndPassword />;

      case enabledLoginProvider.googleAuthenticator.id:
        return <LoginWithGoogleAuthenticator />;

      default:
        return labels.selectLoginProvider;
    }
  };

  return (
    <div className={styles.loginPageContainer}>
      <Panel title={labels.loginPanelHeader} style={{ minWidth: '450px' }}>
        <div className={styles.loginProviderContainer}>{getLoginProviders()}</div>
        {showSelectedLoginForm()}
      </Panel>
    </div>
  );
};

export default Login;
