'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const { register, loginWithGoogle } = useAuth();
    const { theme } = useTheme();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
        role: 'buyer',
        phone: '',
        location: ''
    });
    
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (selectedRole) => {
        setFormData({ ...formData, role: selectedRole });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        const result = await register(formData);

        if (result.success) {
            router.push('/');
        } else {
            setError(result.message || 'Registration failed. Try again.');
            setSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError('');
        const result = await loginWithGoogle("G-OAUTH-MOCK-TOKEN");
        if (result.success) {
            router.push('/');
        } else {
            setError(result.message || 'Google authentication failed.');
        }
    };

    return (
        <main className={`flex min-h-screen items-center justify-center px-4 py-12 font-sans select-none transition-colors duration-200 ${
            theme === 'dark' ? 'bg-[#09090b]' : 'bg-neutral-50'
        }`}>
            <div className={`w-full max-w-[480px] p-8 border rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] transition-colors duration-200 ${
                theme === 'dark' 
                    ? 'bg-[#121214] border-neutral-800/80 text-neutral-200' 
                    : 'bg-white border-neutral-200 text-neutral-800'
            }`}>

                {/* Brand Header */}
                <div className="mb-6 text-center">
                    <div className="inline-flex items-center justify-center bg-[#2563eb] text-white font-extrabold text-xl w-9 h-9 rounded-lg mr-2 shadow-sm">
                        R
                    </div>
                    <span className={`text-xl font-bold tracking-tight inline-block align-middle ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                        ReSell<span className="text-[#2563eb]">Hub</span>
                    </span>
                    <h1 className={`mt-4 text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Create Account</h1>
                    <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Join us to get started buying and selling</p>
                </div>

                {error && (
                    <div className="mb-5 bg-red-950/40 border border-red-900/50 px-4 py-2.5 rounded-lg text-xs text-red-400 font-medium">
                        {error}
                    </div>
                )}

                {/* Role Switcher */}
                <div className="mb-5">
                    <label className={`block text-xs font-semibold mb-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>Account Type</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => handleRoleChange('buyer')}
                            className={`flex flex-col items-center justify-center py-3 border rounded-xl transition-all duration-150 ${
                                formData.role === 'buyer'
                                    ? 'border-[#2563eb] bg-blue-500/10 text-[#2563eb] font-bold'
                                    : theme === 'dark'
                                        ? 'bg-[#18181c] border-neutral-800 hover:bg-neutral-800 text-neutral-400'
                                        : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100 text-neutral-600'
                            }`}
                        >
                            <span className="text-base mb-0.5">🛍️</span>
                            <span className="text-xs">Buyer</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRoleChange('seller')}
                            className={`flex flex-col items-center justify-center py-3 border rounded-xl transition-all duration-150 ${
                                formData.role === 'seller'
                                    ? 'border-[#2563eb] bg-blue-500/10 text-[#2563eb] font-bold'
                                    : theme === 'dark'
                                        ? 'bg-[#18181c] border-neutral-800 hover:bg-neutral-800 text-neutral-400'
                                        : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100 text-neutral-600'
                            }`}
                        >
                            <span className="text-base mb-0.5">💼</span>
                            <span className="text-xs">Seller</span>
                        </button>
                    </div>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                        <label className={`block text-xs font-medium mb-1.5 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full border px-4 py-2 text-xs rounded-lg focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb] transition-all ${
                                theme === 'dark' 
                                    ? 'border-neutral-800 bg-[#18181c] text-white placeholder-neutral-600' 
                                    : 'border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400'
                            }`}
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                        <div>
                            <label className={`block text-xs font-medium mb-1.5 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className={`w-full border px-4 py-2 text-xs rounded-lg focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb] transition-all ${
                                    theme === 'dark' 
                                        ? 'border-neutral-800 bg-[#18181c] text-white placeholder-neutral-600' 
                                        : 'border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400'
                                }`}
                                placeholder="017XXXXXXXX"
                            />
                        </div>
                        <div>
                            <label className={`block text-xs font-medium mb-1.5 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>Location</label>
                            <input
                                type="text"
                                name="location"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                className={`w-full border px-4 py-2 text-xs rounded-lg focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb] transition-all ${
                                    theme === 'dark' 
                                        ? 'border-neutral-800 bg-[#18181c] text-white placeholder-neutral-600' 
                                        : 'border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400'
                                }`}
                                placeholder="Khulna, BD"
                            />
                        </div>
                    </div>

                    <div>
                        <label className={`block text-xs font-medium mb-1.5 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full border px-4 py-2 text-xs rounded-lg focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb] transition-all ${
                                theme === 'dark' 
                                    ? 'border-neutral-800 bg-[#18181c] text-white placeholder-neutral-600' 
                                    : 'border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400'
                            }`}
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className={`block text-xs font-medium mb-1.5 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>Profile Image URL</label>
                        <input
                            type="url"
                            name="image"
                            required
                            value={formData.image}
                            onChange={handleChange}
                            className={`w-full border px-4 py-2 text-xs rounded-lg focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb] transition-all ${
                                theme === 'dark' 
                                    ? 'border-neutral-800 bg-[#18181c] text-white placeholder-neutral-600' 
                                    : 'border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400'
                            }`}
                            placeholder="https://example.com/avatar.jpg"
                        />
                    </div>

                    <div>
                        <label className={`block text-xs font-medium mb-1.5 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full border px-4 py-2.5 text-xs rounded-lg focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb] transition-all ${
                                    theme === 'dark' 
                                        ? 'border-neutral-800 bg-[#18181c] text-white placeholder-neutral-600' 
                                        : 'border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400'
                                }`}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3.5 flex items-center text-neutral-500 hover:text-neutral-300 transition-colors"
                            >
                                {showPassword ? (
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-xs py-2.5 px-4 rounded-lg shadow-md transition-colors duration-200 disabled:opacity-50 mt-4 tracking-wide"
                    >
                        {submitting ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="relative my-5">
                    <div className="absolute inset-0 flex items-center"><div className={`w-full border-t ${theme === 'dark' ? 'border-neutral-800/80' : 'border-neutral-200'}`}></div></div>
                    <div className="relative flex justify-center text-[11px]"><span className={`px-3 ${theme === 'dark' ? 'bg-[#121214] text-neutral-500' : 'bg-white text-neutral-400'}`}>or</span></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className={`w-full flex items-center justify-center gap-2.5 font-medium text-xs py-2.5 px-4 rounded-lg transition-colors border ${
                        theme === 'dark'
                            ? 'bg-transparent hover:bg-neutral-800/30 border-neutral-800 text-neutral-300'
                            : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-600'
                    }`}
                >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>

                <p className={`mt-6 text-center text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-[#2563eb] hover:underline underline-offset-4">
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    );
}