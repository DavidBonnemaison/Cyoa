export const actionTypes = {
  SWITCH_MODE: 'SWITCH_MODE'
};

export const switchMode = mode => ({
  type: actionTypes.SWITCH_MODE,
  mode
});
