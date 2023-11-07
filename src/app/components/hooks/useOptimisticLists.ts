'use client';

import { SafeListing } from '@/app/types';
import { experimental_useOptimistic as useOptimistic } from 'react';

export default function UseOptimisticLists(listings: SafeListing[]) {
  const [optimisticData, addOptimistic] = useOptimistic(
    listings,
    (currentState, optimisticValue: SafeListing) => {
      return [...currentState, optimisticValue];
    }
  );
  return { optimisticData, addOptimistic };
}
