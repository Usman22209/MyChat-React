export const URL = "http://localhost:3000/api/";
export const API_CONFIG = {
  BASE_URL: URL,
  AUTH: {
    login: "auth/login",
    signup: "auth/signup",
  },
  USER:{
    getOtherUser:(uid:string)=>`user/${uid}`,
  }
};
