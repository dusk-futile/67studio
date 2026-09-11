import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '../context/AppContext';

export const metadata: Metadata = {
  title: 'lana67 - Watch TV Shows Online, Watch Movies Online',
  description: 'Stream high-definition movies, original series, and documentaries on lana67.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-black">
      <body className="bg-black text-white min-h-screen selection:bg-netflix-red selection:text-white antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
