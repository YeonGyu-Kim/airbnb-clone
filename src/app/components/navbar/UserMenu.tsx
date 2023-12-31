'use client';

import { IoMdMenu } from 'react-icons/io';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import { useToggle } from '../hooks/useToggle';
import { useRegisterModal } from '../hooks/useRegisterModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import { useRentModal } from '../hooks/useRentModal';
import { useRouter } from 'next/navigation';

type UserMenuProps = {
  currentUser: SafeUser | null;
};

export default function UserMenu({ currentUser }: UserMenuProps) {
  const { isOpen, toggleOpen } = useToggle();
  const router = useRouter();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const handleLogin = (label: string) => {
    registerModal.setIsLogin(label);
    registerModal.onOpen();
  };

  const onRent = () => {
    if (!currentUser) {
      registerModal.onOpen();
    }
    rentModal.onOpen();
  };

  return (
    <div className='relative'>
      <div className='flex items-center gap-3'>
        <div
          onClick={onRent}
          className='hidden md:block cursor-pointer px-3 py-1 rounded-full transition hover:bg-neutral-100'
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className='flex items-center border-[1px] rounded-full gap-3 px-2 py-1 cursor-pointer hover:shadow-md'
        >
          <IoMdMenu size='24' />
          <div>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={toggleOpen}
          className='absolute top-12 right-0 w-[20vw] rounded-xl shadow-sm z-20 bg-white border-[1px]'
        >
          {currentUser ? (
            <>
              <MenuItem
                onClick={() => router.push('/trips')}
                label='My trips'
              />
              <MenuItem
                onClick={() => router.push('/favorites')}
                label='My favorites'
              />
              <MenuItem
                onClick={() => router.push('/reservations')}
                label='My reservations'
              />
              <MenuItem
                onClick={() => router.push('/properties')}
                label='My properties'
              />
              <MenuItem
                onClick={() => rentModal.onOpen()}
                label='Airbnb my home'
              />
              <hr />
              <MenuItem onClick={() => signOut()} label='Logout' />
            </>
          ) : (
            <>
              <MenuItem onClick={() => handleLogin('login')} label='Login' />
              <MenuItem onClick={() => handleLogin('signUp')} label='Sign up' />
            </>
          )}
        </div>
      )}
    </div>
  );
}
