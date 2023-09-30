import { IoMdMenu } from 'react-icons/io';
import Avatar from './Avatar';

export default function UserMenu() {
  return (
    <div>
      <div className='flex items-center gap-3'>
        <div className='hidden md:block'>Airbnb your home</div>
        <div className='flex items-center border-[1px] rounded-full gap-3 px-2 py-1 cursor-pointer hover:shadow-md'>
          <IoMdMenu size='24' />
          <div>
            <Avatar />
          </div>
        </div>
      </div>
    </div>
  );
}
