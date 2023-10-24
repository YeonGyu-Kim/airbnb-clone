import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import { SafeUser } from '@/app/types';

type NavbarProps = {
  currentUser: SafeUser | null;
};

export default function Navbar({ currentUser }: NavbarProps) {
  return (
    <div className='fixed w-full z-10 shadow-sm py-4 border-b-[1px] bg-white'>
      <Container>
        <div className='flex items-center justify-between'>
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
  );
}
