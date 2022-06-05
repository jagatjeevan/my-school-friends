import { useState } from 'react';
import labels from '../../config/label';
import { withAuth } from '../../context/authContext';
import { createUserWithEmailPassword, signWithEmailAndPassword } from '../../firebase/auth';
import Tab from '../tab';
import styles from './style.module.css';

function LoginForm(props) {
  const { isNewUser, updateUser } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (isNewUser && password !== confirmPassword) {
      setError('Password and confirm password should be same');
      return;
    }

    if (isNewUser) {
      createUserWithEmailPassword(email, password)
        .then((user) => {
          console.log(user);
          updateUser(user.user);
        })
        .catch((err) => {
          setError(err);
          console.log(err);
        });
    } else {
      signWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          updateUser(user.user);
        })
        .catch((err) => {
          setError(err);
          console.log(err);
        });
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.fullWidth}>{isNewUser ? labels.signup : labels.signin}</h2>
      <label htmlFor="email">{labels.emailAddress}</label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">{labels.password}</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {isNewUser && (
        <>
          <label htmlFor="confirmPassword">{labels.confirmPassword}</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </>
      )}
      {error.code && (
        <div className={`${styles.fullWidth} error`}>
          {error.code} : {error.message}
        </div>
      )}
      <div className={styles.actionButtons}>
        <input type="submit" value={labels.submit} />
        <input type="reset" value={labels.reset} />
      </div>
    </form>
  );
}

const ids = {
  signUp: 'signUp',
  signIn: 'signIn',
};

const headerOptions = [
  {
    id: ids.signUp,
    label: labels.signup,
  },
  {
    id: ids.signIn,
    label: labels.signin,
  },
];

function LoginWithEmailAndPassword(props) {
  const { authContext } = props;
  const { dispatch: AuthDispatch } = authContext;
  const [newUser, setNewUser] = useState(true);

  const updateUser = (user) => {
    AuthDispatch.updateUser(user);
  };

  const onTabChange = (headerOption) => {
    if (headerOption.id === ids.signUp) {
      setNewUser(true);
    }
    if (headerOption.id === ids.signIn) {
      setNewUser(false);
    }
  };

  return (
    <>
      <Tab headerOptions={headerOptions} onTabChange={onTabChange} />
      <LoginForm isNewUser={newUser} updateUser={updateUser} />
    </>
  );
}

export default withAuth(LoginWithEmailAndPassword);
