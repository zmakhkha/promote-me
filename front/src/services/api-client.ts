import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://0.0.0.0:2000",
});

// Add an interceptor to include the Authorization header for authenticated requests
apiClient.interceptors.request.use(
  (config) => {
    // Exclude Authorization header for login and registration requests
    if (config.url === "/auth/signIn/" || config.url === "/auth/register/") {
      return config;
    }

    // Get the access token from local storage
    const accessToken = localStorage.getItem("accessToken");

    // If the token exists, add it to the Authorization header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
