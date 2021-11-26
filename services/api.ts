import axios from "axios";

export const APICall = axios.create({
  baseURL: false
    ? "http://localhost:3000/api"
    : "https://asu-med.herokuapp.com/api",
});
