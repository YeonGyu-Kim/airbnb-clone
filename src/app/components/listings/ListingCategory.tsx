import { IconType } from 'react-icons';

type ListingCategoryProps = {
  icon: IconType;
  label: string;
  description: string;
};

export default function ListingCategory({
  icon: Icon,
  label,
  description,
}: ListingCategoryProps) {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center gap-4'>
        <Icon size={60} className='text-neutral-600' />
        <div>
          <div>{label}</div>
          <div>{description}</div>
        </div>
      </div>
    </div>
  );
}
