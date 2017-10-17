export const actionTypes = {
  FAILURE: 'FAILURE',
  LOAD_DATA: 'LOAD_DATA',
  UPLOAD_DATA: 'UPLOAD_DATA',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  EDIT_FIELD: 'EDIT_FIELD',
  EDIT_NAME: 'EDIT_NAME',
  EDIT_TO_STEPS: 'EDIT_TO_STEPS',
  ADD_STEP: 'ADD_STEP'
};

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error
  };
}

export function loadData(filePath) {
  return { type: actionTypes.LOAD_DATA, filePath };
}

export function loadDataSuccess(data) {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data
  };
}

export const uploadData = ({ data }) => ({
  type: actionTypes.UPLOAD_DATA,
  data
});

export const editField = ({ id, field, value }) => ({
  type: actionTypes.EDIT_FIELD,
  id,
  field,
  value
});

export const editName = ({ value }) => ({
  type: actionTypes.EDIT_NAME,
  value
});

export const editToSteps = ({ id, to }) => ({
  type: actionTypes.EDIT_TO_STEPS,
  id,
  to
});

export const addStep = () => ({
  type: actionTypes.ADD_STEP
});
