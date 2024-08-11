import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from '../services/api-client';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Function to check if user is authenticated
    const checkAuth = async () => {
      try {
        await axios.get('/api/check-auth/', { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []); // Empty dependency array

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/login/', { email, password }, { withCredentials: true });

      // Extract and store tokens from response
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    axios.post('/api/logout/', {}, { withCredentials: true })
      .then(() => {
        setIsAuthenticated(false);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      })
      .catch(error => console.error('Logout failed:', error));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
