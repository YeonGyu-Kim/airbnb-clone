'use client';

import { useRouter } from 'next/navigation';
import Heading from './Heading';
import Button from './Button';

type EmptyState = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

export default function EmptyState({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters',
  showReset,
}: EmptyState) {
  const router = useRouter();
  return (
    <div className='w-full h-[50vh] flex flex-col gap-2 justify-center items-center'>
      <Heading title={title} subtitle={subtitle} center />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button
            label='Remove all filters'
            onClick={() => router.push('/')}
            outline
          />
        )}
      </div>
    </div>
  );
}
