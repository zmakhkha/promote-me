import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:2000',
});

// Add an interceptor to include the Authorization header for authenticated requests
apiClient.interceptors.request.use(
  (config) => {
    // Exclude Authorization header for login and registration requests
    if (config.url === '/auth/signIn/' || config.url === '/auth/register/') {
      return config;
    }

    // Get the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    
    // If the token exists, add it to the Authorization header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
