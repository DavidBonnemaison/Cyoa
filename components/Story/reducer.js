import { actionTypes } from './actions';

export const initialState = { loaded: false };

function reducer(state = initialState, action) {
  const applyToStep = (id, func) => {
    return {
      ...state,
      steps: state.steps.map(
        step => (step.id === action.id ? func(step) : step)
      )
    };
  };

  switch (action.type) {
    case actionTypes.UPLOAD_DATA:
      const parsedState = JSON.parse(action.data);
      return {
        ...state,
        ...parsedState,
        loaded: true
      };

    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      };

    case actionTypes.LOAD_DATA_SUCCESS:
      return {
        ...action.data
      };

    case actionTypes.EDIT_FIELD:
      return applyToStep(action.id, step => ({
        ...step,
        [action.field]: action.value
      }));

    case actionTypes.EDIT_TO_STEPS:
      return applyToStep(action.id, step => ({ ...step, to: action.to }));

    case actionTypes.EDIT_NAME:
      return {
        ...state,
        name: action.value
      };

    default:
      return state;
  }
}

export default reducer;
