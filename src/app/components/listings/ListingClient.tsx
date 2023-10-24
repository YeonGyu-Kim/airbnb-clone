import { useMemo } from 'react';
import { SafeListing, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';
import { categories } from '@/app/icons/categories';
import Container from '../Container';
import ListingHead from './ListingHead';
import ListingInfo from './ListingInfo';

type ListingClientProps = {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser: SafeUser | null;
  reservations?: Reservation;
};

export default function ListingClient({
  listing,
  currentUser,
}: ListingClientProps) {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing]);

  return (
    <Container>
      <div className='max-w-screen-md mx-auto mb-20'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            ></ListingInfo>
          </div>
        </div>
      </div>
    </Container>
  );
}
