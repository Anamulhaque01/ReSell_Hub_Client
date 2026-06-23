import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/layout/Navbar';
import './globals.css';

export const metadata = {
  title: 'ReSell Hub',
  description: 'Second-Hand Marketplace Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}