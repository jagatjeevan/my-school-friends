import createContext from './createContext';

const initialState = {
  auth: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loggedInUser':
      return { ...state, auth: action.payload };

    case 'signout':
    default:
      return { ...initialState };
  }
};

const updateUser = (dispatch) => (userObj) => dispatch({ type: 'loggedInUser', payload: userObj });
const signOutUser = (dispatch) => () => dispatch({ type: 'signout' });

export const { Context, Provider } = createContext(reducer, { updateUser, signOutUser }, initialState);

export function withAuth(Component) {
  return function contextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} authContext={context} />}
      </Context.Consumer>
    );
  };
}
