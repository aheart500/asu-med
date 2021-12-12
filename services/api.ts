import axios from "axios";

export const APICall = axios.create({
  baseURL: true
    ? "http://localhost:3000/api"
    : "https://asu-med.herokuapp.com/api",
});
