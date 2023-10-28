'use client';

import { SafeListing, SafeUser } from '@/app/types';
import ListingCard from '../listings/ListingCard';
import Container from '../Container';
import Heading from '../Heading';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

type PropertiesClientProps = {
  listings: SafeListing[];
  currentUser: SafeUser;
};

export default function PropertiesClient({
  listings,
  currentUser,
}: PropertiesClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listing cancled');
          router.refresh();
        })
        .catch(() => toast.error('Something went wrong'))
        .finally(() => setDeletingId(''));
    },
    [router]
  );

  return (
    <Container>
      <Heading title='Properites' subtitle='List of your properties' />
      <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel='Delete property'
            actionId={listing.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
