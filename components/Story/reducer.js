import { actionTypes } from './actions';

const stepTypes = ['place', 'dialog'];

export const initialState = {loaded: false};

function reducer(state = initialState, action) {
  const getNextId = () => Math.max(...state.steps.map(s => s.id)) + 1;

  const defaultStep = () => ({
    id: getNextId(),
    title: 'New step title',
    text: 'New step description',
    type: stepTypes[0],
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
          goTo: action.to.map(goTo => ({
            step: goTo,
            stepLabel: state.steps.filter(step => step.id === goTo)[0].title
          }))
        }
      }));

    case actionTypes.EDIT_TO_STEP_LABEL:
      return applyToStep(action.id, step => ({
        ...step,
        actions: {
          ...step.actions,
          goTo: step.actions.goTo.map(
            goToStep =>
              goToStep.step === action.step
                ? { ...goToStep, stepLabel: action.label }
                : goToStep
          )
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

    case actionTypes.REMOVE_STEP:
      return {
        ...state,
        steps: state.steps.filter(step => step.id !== action.id)
      };

    case actionTypes.EDIT_CHARACTER:
      return applyToStep(action.id, step => ({
        ...step,
        character: action.value
      }));

    case actionTypes.SWITCH_TYPE:
      const typeIndex = stepTypes.indexOf(action.from);
      const nextType =
        typeIndex === stepTypes.length - 1
          ? stepTypes[0]
          : stepTypes[typeIndex + 1];
      return applyToStep(action.id, step => ({
        ...step,
        type: nextType
      }));

    default:
      return state;
  }
}

export default reducer;
