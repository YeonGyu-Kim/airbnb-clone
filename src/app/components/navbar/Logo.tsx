import Image from 'next/image';

export default function Logo() {
  return (
    <Image
      alt='Logo'
      className='cursor-pointer'
      height={100}
      width={100}
      src={'/images/logo.png'}
    />
  );
}
