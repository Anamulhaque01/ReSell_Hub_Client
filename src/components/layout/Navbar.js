'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    // Main menu links - Updated to strictly include Dashboard link from assignment layout 
    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'Categories', href: '/categories' },
        { name: 'Dashboard', href: '/dashboard' }, // Added to center matching requirement specs 
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        /* Force Javascript-driven class strings to fully handle background variables instead of relying on default cascades */
        <nav className={`w-full px-8 py-3 border-b sticky top-0 z-50 select-none transition-colors duration-200 ${theme === 'dark'
                ? 'bg-[#09090b] border-neutral-900 text-white'
                : 'bg-white border-neutral-200 text-neutral-900'
            }`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between h-12">

                {/* Brand Logo Left */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center bg-[#2563eb] text-white font-extrabold text-base rounded-lg">
                        R
                    </div>
                    <span className={`text-lg font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                        ReSell<span className="text-[#2563eb]">Hub</span>
                    </span>
                </Link>

                {/* Center Links */}
                <div className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium px-4 py-2 rounded-md transition-colors ${isActive
                                        ? theme === 'dark' ? 'bg-[#16224f] text-white' : 'bg-[#e0e7ff] text-[#2563eb]'
                                        : theme === 'dark' ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Controls Area */}
                <div className="flex items-center gap-6">

                    {/* Theme Switcher Button */}
                    <button
                        onClick={toggleTheme}
                        type="button"
                        className={`transition-colors ${theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'}`}
                    >
                        {theme === 'light' ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M6.343 6.343l.707.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    {/* User Profile Hook Areas */}
                    {!user ? (
                        <div className="flex items-center gap-4">
                            <Link href="/login" className={`text-sm font-medium transition-colors ${theme === 'dark' ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'}`}>
                                Sign In
                            </Link>
                            <Link href="/register" className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                                Get Started
                            </Link>
                        </div>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-colors border ${theme === 'dark'
                                        ? 'bg-[#141416] border-neutral-800/80 text-neutral-200 hover:bg-neutral-800/50'
                                        : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:bg-neutral-200/60'
                                    }`}
                            >
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563eb] text-white font-bold text-[11px]">
                                    {getInitials(user.name)}
                                </div>
                                <span className="text-sm font-medium capitalize">
                                    {user.role || 'User'}
                                </span>
                                <svg className={`h-3 w-3 transition-transform duration-150 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Flyout Dropdown Panel Content [cite: 130] */}
                            {dropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                                    <div className={`absolute right-0 mt-2.5 w-64 border rounded-xl p-4 shadow-2xl z-20 text-xs font-sans ${theme === 'dark' ? 'bg-[#141416] border-neutral-800 text-neutral-200' : 'bg-white border-neutral-200 text-neutral-700'
                                        }`}>

                                        <div className="mb-3.5">
                                            <h4 className={`text-sm font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{user.name || 'User Profile'}</h4>
                                            <p className="text-neutral-400 font-mono text-[11px] truncate mt-0.5">{user.email || 'user@example.com'}</p>
                                            <div className={`mt-2 inline-block text-[10px] font-bold px-2.5 py-0.5 rounded border capitalize ${theme === 'dark' ? 'bg-[#111c44] text-[#3b82f6] border-[#1d4ed8]/30' : 'bg-blue-50 text-[#2563eb] border-blue-100'
                                                }`}>
                                                {user.role}
                                            </div>
                                        </div>

                                        <div className="border-t border-neutral-200 dark:border-neutral-800/80 my-2" />

                                        {/* Operational Routes [cite: 139, 140] */}
                                        <div className="space-y-1">
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-2.5 w-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800/40 rounded-lg transition-colors font-medium text-sm"
                                            >
                                                <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                                                </svg>
                                                Dashboard
                                            </Link>
                                            <Link
                                                href="/profile"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-2.5 w-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800/40 rounded-lg transition-colors font-medium text-sm"
                                            >
                                                <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                My Profile [cite: 139]
                                            </Link>
                                        </div>

                                        <div className="border-t border-neutral-200 dark:border-neutral-800/80 my-2" />

                                        {/* Exit Signout Trigger [cite: 141] */}
                                        <button
                                            onClick={() => { setDropdownOpen(false); logout(); }}
                                            type="button"
                                            className="flex items-center gap-2.5 w-full text-[#ef4444] hover:bg-red-50 dark:hover:bg-red-950/20 p-2 rounded-lg transition-colors font-medium text-sm text-left"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Sign Out [cite: 141]
                                        </button>

                                    </div>
                                </>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </nav>
    );
}