/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch user when token changes
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }
      try {
        const userData = await authService.getUserProfile(token);
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user:", err);
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  // Register user
  const register = useCallback(
    async (userData) => {
      setIsLoading(true);
      setError(null);
      try {
        await authService.register(userData);
        navigate("/login");
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Registration failed"
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  // Login user
  const login = useCallback(
    async (credentials) => {
      setIsLoading(true);
      setError(null);
      try {
        const { token: newToken, user: userData } =
          await authService.login(credentials);
        localStorage.setItem("token", newToken);
        setToken(newToken);
        setUser(userData);
        navigate("/dashboard");
        return true;
      } catch (err) {
        setError(err.message || "Invalid username or password");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  // Logout user
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        setError,
        login,
        register,
        logout,
        forgotPassword: authService.forgotPassword,
        resetPassword: authService.resetPassword,
        changePassword: authService.changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy access
export const useAuth = () => useContext(AuthContext);
