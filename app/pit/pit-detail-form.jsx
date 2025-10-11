import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  teamNumber: '',
  driverExperience: '',
  recentChanges: '',
  climbDetails: '',
  algaeDetails: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

const FormContext = createContext();

export const PitFormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const usePitForm = () => useContext(FormContext);