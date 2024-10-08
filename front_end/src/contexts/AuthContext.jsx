import { createContext, useState, useContext, useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null);
    const [user, setUser] = useState(() => authTokens ? jwtDecode(authTokens.access_token) : null);

    const login = async (username, password) => {
        try {
            const response = await api.post('/token', new URLSearchParams({ username, password }));
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access_token));
            localStorage.setItem('token', JSON.stringify(response.data));
            navigate('/dashboard');
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    // useEffect(() => { 
    //     const refreshToken = async () => {
    //         if (authTokens && authTokens.refresh_token) {
    //             try {
    //                 const response = await api.post('/token/refresh', { refresh_token: authTokens.refresh_token });
    //                 setAuthTokens(response.data);
    //                 setUser(jwtDecode(response.data.access_token));
    //                 localStorage.setItem('token', JSON.stringify(response.data));
    //             } catch (error) {
    //                 console.error("Failed to refresh token", error);
    //                 logout();
    //             }
    //         }
    //     };
    //     refreshToken();
    //     const interval = setInterval(refreshToken, 1000 * 60 * 30); // Refresh token every 30 minutes
    //     return () => clearInterval(interval);
    // }
    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access_token));
        }
    }, [authTokens, setUser])

    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};