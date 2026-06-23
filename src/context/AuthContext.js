'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '@/lib/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initial check: Persist logged-in state across hard browser reloads
    useEffect(() => {
        const checkUserLoggedIn = async () => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('resell_hub_token');

                if (!token) {
                    setUser(null);
                    setLoading(false);
                    return;
                }

                try {
                    // Pointing to your Express backend auth profile route
                    const response = await axiosInstance.get('/auth/me');
                    if (response.data?.success) {
                        setUser(response.data.user); // Contains: name, email, role, location etc.
                    } else {
                        localStorage.removeItem('resell_hub_token');
                        setUser(null);
                    }
                } catch (error) {
                    console.error('Auth synchronization failed:', error);
                    localStorage.removeItem('resell_hub_token');
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            }
        };

        checkUserLoggedIn();
    }, []);

    // Login handler
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });

            if (response.data?.success && response.data?.token) {
                localStorage.setItem('resell_hub_token', response.data.token);
                setUser(response.data.user);
                return { success: true, user: response.data.user };
            } else {
                throw new Error(response.data?.message || 'Login failed');
            }
        } catch (error) {
            setUser(null);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'An error occurred'
            };
        } finally {
            setLoading(false);
        }
    };

    // Google Login wrapper handler
    const loginWithGoogle = async (googleUserToken) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/auth/google', { token: googleUserToken });
            if (response.data?.success && response.data?.token) {
                localStorage.setItem('resell_hub_token', response.data.token);
                setUser(response.data.user);
                return { success: true, user: response.data.user };
            } else {
                throw new Error(response.data?.message || 'Google Authentication failed');
            }
        } catch (error) {
            setUser(null);
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Google Auth error'
            };
        } finally {
            setLoading(false);
        }
    };

    // Registration handler
    const registerUser = async (name, email, password, location) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/auth/register', {
                name,
                email,
                password,
                location,
                role: 'buyer' // Default fallback role selection
            });

            if (response.data?.success && response.data?.token) {
                localStorage.setItem('resell_hub_token', response.data.token);
                setUser(response.data.user);
                return { success: true, user: response.data.user };
            } else {
                throw new Error(response.data?.message || 'Registration failed');
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'An error occurred'
            };
        } finally {
            setLoading(false);
        }
    };

    // Logout handler
    const logout = async () => {
        try {
            localStorage.removeItem('resell_hub_token');
            setUser(null);
        } catch (error) {
            console.error('Logout tracking error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, registerUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for scannable implementation across client elements
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be wrapped within an AuthProvider setup');
    }
    return context;
};