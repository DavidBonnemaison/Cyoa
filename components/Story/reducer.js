import { actionTypes } from './actions';

export const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
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
      return {
        ...state,
        steps: state.steps.map(
          step =>
            step.id === action.id
              ? {
                  ...step,
                  [action.field]: action.value
                }
              : step
        )
      };

    default:
      return state;
  }
}

export default reducer;
