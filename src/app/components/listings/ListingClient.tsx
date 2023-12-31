'use client';

import { useCallback, useMemo, useState, useEffect } from 'react';
import { useRegisterModal } from '../hooks/useRegisterModal';
import { useRouter } from 'next/navigation';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { categories } from '@/app/icons/categories';
import { Range } from 'react-date-range';
import { eachDayOfInterval, differenceInCalendarDays } from 'date-fns';
import Container from '../Container';
import ListingHead from './ListingHead';
import ListingInfo from './ListingInfo';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingReservation from './ListingReservation';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

type ListingClientProps = {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser: SafeUser | null;
};

export default function ListingClient({
  listing,
  currentUser,
  reservations = [],
}: ListingClientProps) {
  const router = useRouter();
  const { onOpen } = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return onOpen();
    }

    setIsLoading(true);

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.push('/trips');
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing, router, currentUser, onOpen]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing]);

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
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
