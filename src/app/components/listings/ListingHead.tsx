import { SafeUser } from '@/app/types';
import UseCountries from '../hooks/useCountries';
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

type ListingHeadProps = {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser: SafeUser | null;
};

export default function ListingHead({
  id,
  title,
  imageSrc,
  locationValue,
  currentUser,
}: ListingHeadProps) {
  const { getByValue } = UseCountries();

  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className='w-full h-[60vh] relative'>
        <Image
          alt='Image'
          src={imageSrc}
          fill
          className='w-full object-cover rounded-xl'
        />
        <div className='absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}
