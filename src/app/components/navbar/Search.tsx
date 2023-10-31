'use client';

import { BiSearch } from 'react-icons/bi';
import { useSearchModal } from '../hooks/useSearchModal';
import { useSearchParams } from 'next/navigation';
import UseCountries from '../hooks/useCountries';
import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';

export default function Search() {
  const params = useSearchParams();
  const { onOpen } = useSearchModal();
  const { getByValue } = UseCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue)?.label;
    }

    return 'Anywhere';
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any Week';
  }, [endDate, startDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);
  return (
    <div
      onClick={onOpen}
      className='border-[1px] py-1 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'
    >
      <div className='flex text-sm px-2 font-semibold items-center'>
        <div className='px-4'>{locationLabel}</div>
        <div className='hidden sm:block px-4 border-x-[1px]'>
          {durationLabel}
        </div>
        <div className='hidden sm:block pl-4 pr-3 text-gray-600'>
          {guestLabel}
        </div>
        <div className='bg-mainColor text-white rounded-full p-1.5'>
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
}
