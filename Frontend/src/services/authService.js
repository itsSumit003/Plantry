
import axios from "axios";

// Signup Service
export const signupService = (firstName, lastName, email, password) => {
  return axios.post("/api/signup", {
    firstName,
    lastName,
    email,
    password,
  });
};

// Login Service
export const loginService = (email, password) => {
  return axios.post("/api/login", {
    email,
    password,
  });
};
