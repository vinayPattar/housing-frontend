import axios from "axios";

console.log("API URL:", import.meta.env.VITE_REACT_APP_API_URL);

// Create an Axios instance
const api = axios.create({
  baseURL: `http://localhost:8080/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to include JWT and CSRF tokens
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("JWT_TOKEN");
    // console.log("Token: " + token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    let csrfToken = localStorage.getItem("CSRF_TOKEN");
    if (!csrfToken || csrfToken === 'undefined')  // check both undefined and the string "undefined"
    {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/csrf-token',
          { withCredentials: true }
        );
        // console.log("Csrd: ", response.data)
        csrfToken = response.data.token;
        localStorage.setItem("CSRF_TOKEN", csrfToken);
      } catch (error) {
        console.error("Failed to fetch CSRF token", error);
      }
    }

    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }
    // console.log("X-XSRF-TOKEN " + csrfToken);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
