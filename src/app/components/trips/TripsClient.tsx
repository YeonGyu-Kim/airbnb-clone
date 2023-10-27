'use client';

import { SafeReservation, SafeUser } from '@/app/types';
import Container from '../Container';
import Heading from '../Heading';
import { useCallback, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ListingCard from '../listings/ListingCard';

type TripsClientProps = {
  reservations: SafeReservation[];
  currentUser: SafeUser;
};

export default function TripsClient({
  reservations,
  currentUser,
}: TripsClientProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation cancled');
          router.refresh();
        })
        .catch((error) => toast.error(error?.response?.data?.error))
        .finally(() => setDeletingId(''));
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title='Trips'
        subtitle={`where you've been and where you're going`}
      />
      <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel Reservation'
            actionId={reservation.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
