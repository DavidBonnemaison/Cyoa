import { actionTypes } from './actions';

export const initialState = { loaded: false };

function reducer(state = initialState, action) {
  const getNextId = () => Math.max(...state.steps.map(s => s.id)) + 1;

  const defaultStep = () => ({
    id: getNextId(),
    title: 'New step title',
    text: 'New step description',
    actions: {
      goTo: [
        {
          step: 0
        }
      ]
    }
  });

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
      return applyToStep(action.id, step => ({
        ...step,
        actions: {
          ...step.actions,
          goTo: action.to.map(t => ({ step: t }))
        }
      }));

    case actionTypes.EDIT_NAME:
      return {
        ...state,
        name: action.value
      };

    case actionTypes.ADD_STEP:
      return {
        ...state,
        steps: state.steps.concat(defaultStep())
      };

    default:
      return state;
  }
}

export default reducer;
