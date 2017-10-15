import { actionTypes } from './actions';

export const initialState = {
  story: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      };

    case actionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        story: action.data
      };

    default:
      return state;
  }
}

export default reducer;
