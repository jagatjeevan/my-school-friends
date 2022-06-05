import { useEffect } from 'react';
import { withAuth } from '../context/authContext';
import Login from '../components/login';
import Dashboard from '../components/dashboard';
import { checkIfLoggedIn } from '../firebase/auth';

function Home(props) {
  const { authContext } = props;
  const { state: authState, dispatch: authDispatch } = authContext;

  useEffect(() => {
    const userLoggedIn = async () => {
      const user = await checkIfLoggedIn(authDispatch.updateUser);
      return user;
    };

    userLoggedIn();
  }, []);

  if (authState.auth && authState.auth.uid) return <Dashboard />;

  return <Login />;
}

export default withAuth(Home);