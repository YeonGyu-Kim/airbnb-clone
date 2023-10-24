'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Container from '../Container';
import CategoryBox from '../CategoryBox';
import { categories } from '@/app/icons/categories';

export default function Categories() {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) return null;

  return (
    <Container>
      <div className='flex justify-between overflow-x-auto gap-8'>
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            icon={item.icon}
            label={item.label}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
