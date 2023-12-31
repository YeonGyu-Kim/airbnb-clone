'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Logo() {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      alt='Logo'
      className='cursor-pointer'
      height={100}
      width={100}
      sizes='fill'
      priority
      src={'/images/logo.png'}
    />
  );
}
