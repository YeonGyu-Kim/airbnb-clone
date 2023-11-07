'use client';

import { SafeListing, SafeUser } from '@/app/types';
import UseOptimisticLists from '../hooks/useOptimisticLists';
import ListingCard from './ListingCard';

type ListingContainerProps = {
  currentUser?: SafeUser | null;
  listings: SafeListing[];
};

export default function ListingContainer({
  currentUser,
  listings,
}: ListingContainerProps) {
  const { optimisticData } = UseOptimisticLists(listings);

  return (
    <>
      {optimisticData.map((listing) => (
        <ListingCard
          currentUser={currentUser}
          key={listing.id}
          data={listing}
        />
      ))}
    </>
  );
}
