import './globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/navbar/Navbar';
import RegisterModal from './components/modals/RegisterModal';
import getCurrentUser from './actions/getCurrentUser';
import AuthContext from '@/context/AuthContext';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';
import ProviderContext from '@/context/ProviderContext';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en'>
      <body className={font.className}>
        <ProviderContext>
          <Toaster
            toastOptions={{
              duration: 1000,
            }}
          />
          <RentModal />
          <SearchModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
          <div className='absolute w-full top-24'>{children}</div>
        </ProviderContext>
      </body>
    </html>
  );
}
