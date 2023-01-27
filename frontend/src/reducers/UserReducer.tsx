import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "../reducers/NotificationReducer";
import * as authenticationModels from "../models/AuthModels";
import * as authenticationService from "../services/authenticate";

interface User {
  username: string;
  name: string;
  email: string;
  role: string;
  birthDay: string;
  id: string;
  token?: string;
}

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export const handleUserLogin = (loginData: authenticationModels.LoginData) => {
  return async function (dispatch) {
    const res: any = await authenticationService.login(loginData).catch((e) => {
      console.log("EXCEPTION: ", e);
      const errorMessage = e.response.data.error;
      dispatch(
        setNotification(
          { type: "error", message: errorMessage, activeNotification: true },
          15
        )
      );
    });

    if (res?.data) {
      const { token, message, user } = res.data;
      user.token = token;
      dispatch(setUser(user));
      dispatch(
        setNotification(
          { type: "success", message, activeNotification: true },
          15
        )
      );
    }
  };
};

export const handleUserSignup = (
  signUpData: authenticationModels.SignUpData
) => {
  return async function (dispatch) {
    const res: any = await authenticationService
      .signUp(signUpData)
      .catch((e) => {
        console.log("EXCEPTION: ", e);
        const errorMessage = e.response.data.error;
        dispatch(
          setNotification(
            { type: "error", message: errorMessage, activeNotification: true },
            15
          )
        );
      });

    if (res?.data) {
      const { token, message, user } = res.data;
      user.token = token;
      dispatch(setUser(user));
      dispatch(
        setNotification(
          { type: "success", message, activeNotification: true },
          15
        )
      );
    }
  };
};

// export const handleUserLogout = () => {
//   const navigate = useNavigate();
//   return function (dispatch) {
//     dispatch(setUser(null));
//   };
// };
