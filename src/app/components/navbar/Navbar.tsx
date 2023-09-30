import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

export default function Navbar() {
  return (
    <div className='fixed w-full z-10 shadow-sm py-4 border-b-[1px]'>
      <Container>
        <div className='flex items-center justify-between'>
          <Logo />
          <Search />
          <UserMenu />
        </div>
      </Container>
    </div>
  );
}
