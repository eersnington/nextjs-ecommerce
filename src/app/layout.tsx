/* eslint-disable import/order */
import { Inter } from 'next/font/google';

import Navbar from './components/Navbar';
import CartProvider from './components/Providers';
import ShoppingCartModal from './components/ShoppingCartModal';
import FloatingMicButton from './components/FloatingButton';

import '@/app/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <ShoppingCartModal />
          {children}
          <FloatingMicButton /> {/* Add this line */}
        </CartProvider>
      </body>
    </html>
  );
}
