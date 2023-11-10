'use client';

import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import UseCountries from '../hooks/useCountries';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';
import { useQuery } from '@tanstack/react-query';
import getListings from '@/app/actions/getListings';
import { getCat } from '@/data/catApi';

type ListingCardProps = {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
};

export default function ListingCardTest({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useQuery({
    queryKey: ['listings'],
    queryFn: () => getListings({}),
  });

  return (
    <div>
      {data?.map((item) => item?.title)}
      {/*  <header>Client Component</header>
      {children} */}
    </div>
  );
}
