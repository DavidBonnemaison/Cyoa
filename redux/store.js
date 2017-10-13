import { createStore } from 'redux';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'STORY_FETCHED':
      return { ...action.story };
    default:
      return state;
  }
};

const initializeStore = initialState => {
  return createStore(reducer, initialState);
};

export default initializeStore;
