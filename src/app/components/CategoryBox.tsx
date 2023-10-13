import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useCallback } from 'react';
import { IconType } from 'react-icons';

type CategoryBox = {
  icon: IconType;
  label: string;
  selected?: boolean;
};

export default function CategoryBox({
  icon: Icon,
  label,
  selected,
}: CategoryBox) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: { category?: string } = {
      ...currentQuery,
      category: label,
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    });
    router.push(url);
  }, [params, router, label]);
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center hover:text-neutral-800 cursor-pointer border-b
    ${selected ? 'border-b-neutral-800' : 'border-transparent'}
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}
    >
      <Icon size={26} />
      <div className='font-medium text-sm'>{label}</div>
    </div>
  );
}
