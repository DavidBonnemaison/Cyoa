export const actionTypes = {
  FAILURE: 'FAILURE',
  LOAD_DATA: 'LOAD_DATA',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  EDIT_FIELD: 'EDIT_FIELD'
};

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error
  };
}

export function loadData() {
  return { type: actionTypes.LOAD_DATA };
}

export function loadDataSuccess(data) {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data
  };
}

export const editField = ({ id, field, value }) => ({
  type: actionTypes.EDIT_FIELD,
  id,
  field,
  value
});
