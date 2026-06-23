'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// 🚀 Change this to match your EXACT running backend server address!
const BACKEND_BASE_URL = 'http://localhost:5000';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('reshub_user');
        const storedToken = localStorage.getItem('reshub_token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // 1. Handle Registration with Absolute URL
    const register = async (formData) => {
        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: data.message || 'Registration failed from server side.'
                };
            }

            if (data.token && data.user) {
                localStorage.setItem('reshub_token', data.token);
                localStorage.setItem('reshub_user', JSON.stringify(data.user));
                setUser(data.user);
            }

            return { success: true };
        } catch (error) {
            console.error('Registration network error:', error);
            return {
                success: false,
                message: 'Cannot reach the authentication server. Please verify your backend server is running.'
            };
        }
    };

    // 2. Handle Login with Absolute URL
    const login = async (email, password) => {
        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, message: data.message || 'Invalid credentials.' };
            }

            localStorage.setItem('reshub_token', data.token);
            localStorage.setItem('reshub_user', JSON.stringify(data.user));
            setUser(data.user);

            return { success: true };
        } catch (error) {
            return { success: false, message: 'Server connection timeout.' };
        }
    };

    // 3. Handle Google Verification with Absolute URL
    const loginWithGoogle = async (mockToken) => {
        try {
            const response = await fetch(`${BACKEND_BASE_URL}/api/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: mockToken }),
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, message: data.message || 'Google Auth Failed.' };
            }

            localStorage.setItem('reshub_token', data.token);
            localStorage.setItem('reshub_user', JSON.stringify(data.user));
            setUser(data.user);

            return { success: true };
        } catch (error) {
            return { success: false, message: 'Google Authentication routing error.' };
        }
    };

    const logout = () => {
        localStorage.removeItem('reshub_token');
        localStorage.removeItem('reshub_user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, loginWithGoogle, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);