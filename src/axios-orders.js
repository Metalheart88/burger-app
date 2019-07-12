import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-greg.firebaseio.com/"
});

export default instance;
