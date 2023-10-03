'use client';

import { IoMdMenu } from 'react-icons/io';
import Avatar from './Avatar';
import MenuItem from './MenuItem';
import { useToggle } from '../hooks/useToggle';
import { useRegisterModal } from '../hooks/useRegisterModal';

export default function UserMenu() {
  const { isOpen, toggleOpen } = useToggle();
  const { onOpen } = useRegisterModal();

  return (
    <div className='relative'>
      <div className='flex items-center gap-3'>
        <div className='hidden md:block'>Airbnb your home</div>
        <div
          onClick={toggleOpen}
          className='flex items-center border-[1px] rounded-full gap-3 px-2 py-1 cursor-pointer hover:shadow-md'
        >
          <IoMdMenu size='24' />
          <div>
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='absolute top-12 right-0 w-[20vw] rounded-xl shadow-sm z-20 bg-white border-[1px]'>
          <MenuItem onClick={onOpen} label='Login' />
          <MenuItem onClick={onOpen} label='Sign up' />
        </div>
      )}
    </div>
  );
}
