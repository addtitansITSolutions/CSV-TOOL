import { createContext, useCallback, useContext, useEffect, useState, } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

// Check whether the user already has a valid session
const checkAuth = useCallback(async () => { 
    try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
        return response.data.user;
    } 
    catch (error) {
        setUser(null);
        return null;
    } 
    finally {
        setLoading(false);
    }
}, []);

// Login using the existing backend API
const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);


    // The backend sets the HttpOnly cookie.
    // Fetch the authenticated user's details afterward.
    const userResponse = await api.get("/auth/me");

    setUser(userResponse.data.user);
    return userResponse.data.user;


};

// Logout and clear frontend authentication state
const logout = async () => {
    try {
        await api.post("/auth/logout");
    } finally {
        setUser(null);
    }
};

// Restore the session when the app loads
useEffect(() => {
    checkAuth();
}, [checkAuth]);

return (
<AuthContext.Provider
    value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        logout,
        checkAuth,
}}
>
    {children}
</AuthContext.Provider>
);
};

// Custom hook for accessing authentication
export const useAuth = () => {
const context = useContext(AuthContext);

if (!context) {
throw new Error("useAuth must be used inside AuthProvider");
}

return context;
};
