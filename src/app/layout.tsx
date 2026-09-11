import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '../context/AppContext';

export const metadata: Metadata = {
  title: '67studio - Watch TV Shows Online, Watch Movies Online',
  description: 'Stream high-definition movies, original series, and documentaries on 67studio.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-netflix-black text-white min-h-screen selection:bg-netflix-red selection:text-white">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
