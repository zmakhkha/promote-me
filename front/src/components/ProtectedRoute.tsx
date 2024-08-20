import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

// Utility functions for cookies
const getCookie = (name: string) => {
  const cookies = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`));
  return cookies ? cookies.split('=')[1] : null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

// Utility function to set authorization header
const setAuthToken = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const ProtectedRoute = () => {
  const accessToken = getCookie('accessToken') || localStorage.getItem('accessToken');
  const isAuthenticated = !!accessToken;

  // if (accessToken) {
  //   setAuthToken(accessToken);

  //   // Optionally, validate the token with a request
  //   axios.get('/api/check-auth/', { headers: { Authorization: `Bearer ${accessToken}` } })
  //     .then(() => {
  //       console.log("Token validated successfully");
  //     })
  //     .catch(() => {
  //       deleteCookie('accessToken');
  //       localStorage.removeItem('accessToken');
  //       console.error("Token validation failed. Tokens cleared.");
  //     });
  // }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
