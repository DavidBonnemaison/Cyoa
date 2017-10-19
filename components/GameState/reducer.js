import { actionTypes as mainTypes } from './../Story/actions';
import { actionTypes } from './actions';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case mainTypes.UPLOAD_DATA:
      try {
        const parsedState = JSON.parse(action.data);
        return parsedState.env;
      } catch (e) {
        console.log('failed parsing of JSON file');
      }
      return state;

    case actionTypes.UPDATE_STATE_ITEM: {
      return {
        ...state,
        [action.id]: state[action.id].current
          ? {
              ...state[action.id],
              current: action.value
            }
          : action.value
      };
    }

    default:
      return state;
  }
};
