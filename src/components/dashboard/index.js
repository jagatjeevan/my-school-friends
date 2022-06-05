import { withAuth } from '../../context/authContext';
import { logoutUser } from '../../firebase/auth';

function Dashboard(props) {
  const { authContext } = props;
  const { dispatch: authDispatch } = authContext;

  const handleSignout = () => {
    logoutUser();
    authDispatch.signOutUser();
  };

  return (
    <>
      <h2>Dashboard details</h2>
      <button onClick={handleSignout} type="button">
        Sign out
      </button>
    </>
  );
}

export default withAuth(Dashboard);
