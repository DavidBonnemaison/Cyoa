export const actionTypes = {
  UPDATE_STATE_ITEM: 'UPDATE_STATE_ITEM'
};

export const updateStateItem = ({ id, value }) => ({
  type: actionTypes.UPDATE_STATE_ITEM,
  id,
  value
});
