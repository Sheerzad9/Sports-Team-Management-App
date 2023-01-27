import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    type: null,
    message: null,
    activeNotification: null,
  },
  reducers: {
    handleNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return {
        message: null,
        type: null,
        activeNotification: null,
      };
    },
  },
});

export const { handleNotification, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;

export const setNotification = (notificationData, customTimeoutInSeconds) => {
  return function (dispatch) {
    const activeNotification = setTimeout(() => {
      dispatch(clearNotification({}));
    }, customTimeoutInSeconds * 1000);

    dispatch(handleNotification({ ...notificationData, activeNotification }));
  };
};
