'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function RoleGuard({ children, allowedRoles = [] }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Wait until the initial auth synchronization check from localStorage completes
        if (!loading) {
            if (!user) {
                // Redirect to login if user is completely unauthorized 
                router.replace('/login');
            } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
                // Redirect to home if user does not possess the correct clearance role 
                router.replace('/');
            }
        }
    }, [user, loading, router, allowedRoles]);

    // Premium Swiss Minimalist loading skeleton used during route validation transitions [cite: 255]
    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#fafafa]">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-6 w-6 animate-spin rounded-full border border-neutral-900 border-t-transparent" />
                    <p className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">Verifying Session</p>
                </div>
            </div>
        );
    }

    // If authenticated and role checks pass, render protected dashboard components safely [cite: 120, 257]
    if (user && (allowedRoles.length === 0 || allowedRoles.includes(user.role))) {
        return <>{children}</>;
    }

    return null;
}