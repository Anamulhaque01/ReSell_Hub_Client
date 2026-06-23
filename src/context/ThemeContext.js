'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    // Default to dark mode to match the initial sleek aesthetic of your images
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Check if a theme preference was previously saved in the browser
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('resell_hub_theme');
            if (savedTheme) {
                setTheme(savedTheme);
                document.documentElement.classList.toggle('dark', savedTheme === 'dark');
            } else {
                // Fallback default: apply dark mode class to root <html> tag
                document.documentElement.classList.add('dark');
            }
        }
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
        localStorage.setItem('resell_hub_theme', nextTheme); // Persist selection 

        if (nextTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};