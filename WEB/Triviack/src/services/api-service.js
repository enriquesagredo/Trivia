import axios from "axios"

const service = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.REACT_APP_BASE_API_URL || "http://localhost:3000/v1",
  });

  service.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
        if (
          error.response.status === 401 &&
          window.location.pathname !== "/login"
        ) {
          localStorage.removeItem("user");
          window.location.assign("/login");
        } else {
          return Promise.reject(error);
        }
      }
    );

    export function login(data) {
        return service.post("/login", data);
      }

    export function createUser(body) {     
        return service.post("/users", body);
      }

    export function logoutApi() {
      console.log("sss")
        return service.post("/logout");
      }  

    export function getLeaderboardApi() {
        return service.get('/leaderboard');
      }