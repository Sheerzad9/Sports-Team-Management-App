import axios from "axios";
import * as authenticationType from "../models/AuthModels";

const baseurl = "/api";

const signUp = async (signUpData: authenticationType.SignUpData) => {
  return axios.post(`${baseurl}/user/create`, signUpData);
};

const login = (loginData: authenticationType.LoginData) => {
  return axios.post(`${baseurl}/login`, loginData);
};

export { login, signUp };
