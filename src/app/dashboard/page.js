'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function DashboardLayout() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('Overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (!user) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#09090b]' : 'bg-slate-50'}`}>
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    const role = user.role?.toLowerCase() || 'admin';
    const isDark = theme === 'dark';

    // Sidebar navigation configuration with matching icons from image_d3b7f4.png
    const menuItems = [
        {
            name: 'Overview',
            icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                </svg>
            )
        },
        {
            name: 'Users',
            icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            name: 'Products',
            icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            )
        },
        {
            name: 'Orders',
            icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
        {
            name: 'Analytics',
            icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        }
    ];

    const SidebarContent = () => (
        <div className={`flex flex-col h-full max-h-screen justify-between transition-colors duration-200 overflow-hidden ${isDark ? 'bg-[#09090b] text-zinc-400 border-zinc-800' : 'bg-white text-slate-800 border-slate-100'
            }`}>
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Top Profile Header Section */}
                <div className={`p-5 border-b flex items-center justify-between flex-shrink-0 ${isDark ? 'border-zinc-900' : 'border-slate-100'}`}>
                    <div className="flex items-center gap-3 truncate">
                        <div className="h-9 w-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-md tracking-wider flex-shrink-0">
                            {user.name?.slice(0, 2).toUpperCase() || 'AU'}
                        </div>
                        <div className="truncate">
                            <h4 className={`font-bold text-[13px] tracking-tight leading-tight truncate ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>
                                {user.name || 'Admin User'}
                            </h4>
                            <span className="inline-block font-bold text-[10px] px-1.5 py-0.5 rounded bg-purple-950/50 text-purple-400 border border-purple-900/30 capitalize mt-0.5 tracking-wide">
                                {role}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className={`p-1.5 rounded-lg transition-colors border ${isDark ? 'border-zinc-800 bg-zinc-900 text-amber-400 hover:bg-zinc-800' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        {isDark ? (
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M6.343 6.343l.707-.707M12 7a5 5 0 110 10 5 5 0 010-10z" /></svg>
                        ) : (
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9 9 0 1020.354 15.354z" /></svg>
                        )}
                    </button>
                </div>

                {/* Nav items with crisp active indicators */}
                <div className="flex-1 overflow-y-auto p-3 space-y-1 token-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = activeTab === item.name;
                        return (
                            <button
                                key={item.name}
                                onClick={() => {
                                    setActiveTab(item.name);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-[13px] font-medium rounded-lg transition-all ${isActive
                                    ? isDark ? 'bg-blue-950/40 text-blue-400 border border-blue-900/40' : 'bg-blue-50 text-blue-600'
                                    : isDark ? 'text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <span className={isActive ? 'text-blue-400' : 'text-zinc-500'}>{item.icon}</span>
                                <span className="flex-1 text-left">{item.name}</span>
                                {isActive && (
                                    <svg className="h-3 w-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className={`p-3 border-t flex-shrink-0 ${isDark ? 'border-zinc-900 bg-[#09090b]' : 'border-slate-100 bg-white'}`}>
                <button
                    onClick={logout}
                    className={`w-full flex items-center gap-2 px-3.5 py-2.5 text-[13px] font-semibold text-red-400 rounded-lg transition-colors text-left ${isDark ? 'hover:bg-red-950/20' : 'hover:bg-red-50'
                        }`}
                >
                    <svg className="h-4 w-4 stroke-[2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className={`pt-18fixed inset-0 w-screen h-screen flex overflow-hidden transition-colors duration-200 font-sans antialiased ${isDark ? 'bg-[#09090b]' : 'bg-[#f8fafc]'
            }`}>
            {/* Desktop Sidebar Frame */}
            <aside className={`hidden lg:block w-60 border-r h-full flex-shrink-0 relative z-20 ${isDark ? 'border-zinc-800' : 'border-slate-200'}`}>
                <SidebarContent />
            </aside>

            {/* Mobile Slide Drawer Handling */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
            )}
            <aside className={`fixed top-0 bottom-0 left-0 w-60 z-50 transition-transform duration-300 transform lg:hidden border-r ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } ${isDark ? 'border-zinc-800 bg-[#09090b]' : 'border-slate-200 bg-white'}`}>
                <SidebarContent />
            </aside>

            {/* Viewport Canvas Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
                <header className={`lg:hidden h-14 border-b flex items-center justify-between px-4 flex-shrink-0 z-30 ${isDark ? 'bg-[#121214] border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setIsMobileMenuOpen(true)} className={`p-1.5 rounded-lg ${isDark ? 'text-zinc-400 hover:bg-zinc-900' : 'text-slate-600 hover:bg-slate-50'}`}>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <span className="font-bold text-xs tracking-tight capitalize">Admin Workspace</span>
                    </div>
                </header>

                <main className={`flex-1 overflow-y-auto p-4 md:p-6 transition-colors duration-200 ${isDark ? 'bg-[#09090b]' : 'bg-[#f8fafc]'}`}>
                    <div className="max-w-[1400px] mx-auto space-y-5">
                        {activeTab === 'Overview' ? (
                            <AdminOverviewPanel isDark={isDark} />
                        ) : (
                            <div className={`border p-6 rounded-xl transition-colors duration-200 ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-slate-200'}`}>
                                <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{activeTab} Workspace Section</h2>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

// =========================================================================
// MATCHING VIEW PORT COMPONENT FROM image_d3b7f4.png
// =========================================================================
function AdminOverviewPanel({ isDark }) {
    const gridStyle = `border p-5 rounded-xl transition-colors duration-200 relative ${isDark ? 'bg-[#121214] border-zinc-800/70' : 'bg-white border-slate-200'
        }`;

    return (
        <div className="space-y-5">
            <div>
                <h1 className={`text-xl font-bold tracking-tight ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>Admin Overview</h1>
            </div>

            {/* 4 Top Row Stat Cards with Icon Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Users Card */}
                <div className={gridStyle}>
                    <div className="h-7 w-7 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center mb-4">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>18</h2>
                    <span className="text-[11px] font-semibold text-zinc-400 mt-1 block">Total Users</span>
                    <p className="text-[10px] text-zinc-500 mt-0.5 font-medium">5 sellers, 12 buyers</p>
                </div>

                {/* Products Card */}
                <div className={gridStyle}>
                    <div className="h-7 w-7 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-500 flex items-center justify-center mb-4">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" /></svg>
                    </div>
                    <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>20</h2>
                    <span className="text-[11px] font-semibold text-zinc-400 mt-1 block">Total Products</span>
                    <p className="text-[10px] text-amber-500 mt-0.5 font-bold">1 pending review</p>
                </div>

                {/* Orders Card */}
                <div className={gridStyle}>
                    <div className="h-7 w-7 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-4">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </div>
                    <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>13</h2>
                    <span className="text-[11px] font-semibold text-zinc-400 mt-1 block">Total Orders</span>
                    <p className="text-[10px] text-zinc-500 mt-0.5 font-medium">2 delivered</p>
                </div>

                {/* Revenue Card */}
                <div className={gridStyle}>
                    <div className="h-7 w-7 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>$21,255</h2>
                    <span className="text-[11px] font-semibold text-zinc-400 mt-1 block">Total Revenue</span>
                    <p className="text-[10px] text-zinc-500 mt-0.5 font-medium">From paid orders</p>
                </div>
            </div>

            {/* Revenue Overview Chart Panel */}
            <div className={gridStyle}>
                <h3 className={`font-bold text-[12px] tracking-wide mb-8 ${isDark ? 'text-zinc-300' : 'text-slate-900'}`}>Revenue Overview (Last 6 Months)</h3>
                <div className="h-44 flex items-end justify-between relative pt-6 px-2">
                    {[
                        { month: 'Jan', h: 'h-[4px]', price: '$', labelColor: 'text-zinc-600' },
                        { month: 'Feb', h: 'h-[4px]', price: '$', labelColor: 'text-zinc-600' },
                        { month: 'Mar', h: 'h-[4px]', price: '$', labelColor: 'text-zinc-600' },
                        { month: 'Apr', h: 'h-[20px]', price: '$750', labelColor: 'text-zinc-300' },
                        { month: 'May', h: 'h-[128px]', price: '$19.7k', labelColor: 'text-zinc-100 font-bold' },
                        { month: 'Jun', h: 'h-[12px]', price: '$810', labelColor: 'text-zinc-300' }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center flex-1 mx-1.5 relative group justify-end h-full">
                            <span className={`text-[9px] mb-1.5 transition-all duration-150 text-center block w-full ${item.labelColor}`}>
                                {item.price}
                            </span>
                            <div className={`w-full rounded-t-sm transition-all duration-300 bg-blue-500 ${item.h}`} />
                            <div className={`w-full h-[2px] ${isDark ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                            <span className="mt-2.5 text-[10px] font-medium text-zinc-500">{item.month}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Row: User Growth & Category Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* User Growth Line Chart Frame */}
                <div className={`${gridStyle} lg:col-span-3 min-h-[260px] flex flex-col justify-between`}>
                    <h3 className={`font-bold text-[12px] tracking-wide mb-2 ${isDark ? 'text-zinc-300' : 'text-slate-900'}`}>User Growth</h3>

                    {/* Simulated SVG Vector Line Path Chart */}
                    <div className="flex-1 relative w-full mt-4 flex items-end">
                        <svg className="w-full h-32 overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
                                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
                                </linearGradient>
                            </defs>
                            {/* Area Gradient Background Fill */}
                            <path d="M 0 90 L 80 75 L 160 30 L 240 30 L 320 85 L 400 78 L 500 78 L 500 100 L 0 100 Z" fill="url(#chart-grad)" />
                            {/* Line Grid references */}
                            <line x1="0" y1="30" x2="500" y2="30" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="4" />
                            <line x1="0" y1="65" x2="500" y2="65" stroke="#1f2937" strokeWidth="0.5" strokeDasharray="4" />
                            {/* Main Growth Vector Path */}
                            <path d="M 0 90 L 80 75 L 160 30 L 240 30 L 320 85 L 400 78 L 500 78" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            {/* Node Points */}
                            <circle cx="80" cy="75" r="3.5" fill="#22c55e" />
                            <circle cx="160" cy="30" r="3.5" fill="#22c55e" />
                            <circle cx="240" cy="30" r="3.5" fill="#22c55e" />
                            <circle cx="320" cy="85" r="3.5" fill="#22c55e" />
                        </svg>
                    </div>

                    <div className="flex justify-between text-[10px] text-zinc-500 px-1 mt-2">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    </div>
                </div>

                {/* Category Performance Donut Section */}
                <div className={`${gridStyle} lg:col-span-2 flex flex-col justify-between`}>
                    <h3 className={`font-bold text-[12px] tracking-wide mb-4 ${isDark ? 'text-zinc-300' : 'text-slate-900'}`}>Category Performance</h3>

                    <div className="flex flex-row items-center justify-around flex-1 gap-4">
                        {/* CSS Donut Circle Frame */}
                        <div className="relative h-24 w-24 flex items-center justify-center flex-shrink-0">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#1e1b4b" strokeWidth="3.8" />
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="35 100" strokeDashoffset="0" />
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-35" />
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="18 100" strokeDashoffset="-60" />
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#a855f7" strokeWidth="4" strokeDasharray="12 100" strokeDashoffset="-78" />
                                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ec4899" strokeWidth="4" strokeDasharray="10 100" strokeDashoffset="-90" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className={`text-sm font-black ${isDark ? 'text-zinc-100' : 'text-slate-900'}`}>16</span>
                            </div>
                        </div>

                        {/* Breakdown Key Legends */}
                        <div className="space-y-1.5 text-[10.5px] font-medium text-zinc-400">
                            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-blue-500 block" /> <span>Mobile Phones: 2</span></div>
                            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500 block" /> <span>Electronics: 5</span></div>
                            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500 block" /> <span>Furniture: 3</span></div>
                            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-purple-500 block" /> <span>Vehicles: 1</span></div>
                            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-pink-500 block" /> <span>Fashion: 3</span></div>
                            <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-500 block" /> <span>Sports: 2</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}