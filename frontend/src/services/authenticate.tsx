import axios from "axios";
import * as authenticationType from "../models/signUpData";

const baseurl = "/api";

const signUp = async (userData: authenticationType.SignUpData) => {};

const login = (loginData: authenticationType.LoginData) => {
  return axios.post(`${baseurl}/login`, loginData);
};

export { login, signUp };
