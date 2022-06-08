import labels from '../../config/label';
import { withAuth } from '../../context/authContext';
import { signWithFacebookAuthenticator } from '../../firebase/auth';

function LoginWithGoogleAuthenticator(props) {
  const { authContext } = props;
  const { dispatch: authDispatch } = authContext;

  const handleFacebookAuth = async () => {
    const user = await signWithFacebookAuthenticator();
    authDispatch.updateUser(user);
  };

  return (
    <button onClick={handleFacebookAuth} type="button">
      {labels.loginButton.loginWithFacebook}
    </button>
  );
}

export default withAuth(LoginWithGoogleAuthenticator);
