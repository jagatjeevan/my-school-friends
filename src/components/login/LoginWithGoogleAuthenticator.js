import { withAuth } from '../../context/authContext';
import { signWithGoogleAuthenticator } from '../../firebase/auth';

function LoginWithGoogleAuthenticator(props) {
  const { authContext } = props;
  const { dispatch: authDispatch } = authContext;
  
  const handleGoogleAuth = () => {
    signWithGoogleAuthenticator().then((user) => {
      authDispatch.updateUser(user);
    });
  };

  return <button onClick={handleGoogleAuth} type="button">LoginWithGoogleAuthenticator</button>;
}

export default withAuth(LoginWithGoogleAuthenticator);
