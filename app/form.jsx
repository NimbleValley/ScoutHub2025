import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  nameText: '',
  matchNumber: '',
  teamNumber: '',
  selectedStation: 'B1',

  selectedStartPosition: 'Far',
  autoL4Count: 0,
  autoL3Count: 0,
  autoL2Count: 0,
  autoL1Count: 0,
  autoMissCoralCount: 0,
  autoNetCount: 0,
  autoMissNetCount: 0,
  autoProcessorCount: 0,
  leave: true,

  teleL4Count: 0,
  teleL3Count: 0,
  teleL2Count: 0,
  teleL1Count: 0,
  teleMissCoralCount: 0,
  teleNetCount: 0,
  teleMissNetCount: 0,
  teleProcessorCount: 0,
  park: false,
  selectedClimb: 'No',

  lostComms: false,
  disabled: false,
  driverSkill: 3,
  commentText: '',
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

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);