import axios from "axios";

const instance = axios.create({
  baseURL: "https://desolate-caverns-71958-8003a607a2e2.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
