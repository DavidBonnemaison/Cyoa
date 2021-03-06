import { actionTypes } from './actions';

export const initialState = {
  mode: 'mixed'
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SWITCH_MODE:
      return {
        mode: action.mode
      };
    default:
      return state;
  }
}

export default reducer;
