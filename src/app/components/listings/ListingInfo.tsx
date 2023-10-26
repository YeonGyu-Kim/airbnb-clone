import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';
import UseCountries from '../hooks/useCountries';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map'), {
  ssr: false,
});

type ListingInfoProps = {
  user: SafeUser;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
};

export default function ListingInfo({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}: ListingInfoProps) {
  const { getByValue } = UseCountries();

  const coordinates = getByValue(locationValue)?.latlng;
  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-semibold flex items-center gap-2'>
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className='flex items-center gap-4 font-light text-neutral-500'>
          <div>{guestCount} guests</div>
          <div>{roomCount} guests</div>
          <div>{bathroomCount} guests</div>
        </div>
      </div>
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className='text-lg font-light text-neutral-500'>{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
}