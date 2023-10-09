import { User } from '@prisma/client';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

type NavbarProps = {
  currentUser: User | null;
};

export default function Navbar({ currentUser }: NavbarProps) {
  return (
    <div className='fixed w-full z-10 shadow-sm py-4 border-b-[1px]'>
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
