/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useReducer } from 'react';

const createContext = (reducer, actions, initialState) => {
  const Context = React.createContext();
  const Provider = ({ children }) => {
    const [state, dispatchActions] = useReducer(reducer, initialState);

    const boundActions = {};
    for (const key in actions) {
      boundActions[key] = actions[key](dispatchActions);
    }

    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <Context.Provider value={{ state, dispatch: boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export default createContext;