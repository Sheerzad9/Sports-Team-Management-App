import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer";
import NotificationReducer from "./reducers/NotificationReducer";

const store = configureStore({
  reducer: {
    user: UserReducer,
    notification: NotificationReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
