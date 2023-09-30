import { BiSearch } from 'react-icons/bi';

export default function Search() {
  return (
    <div className='border-[1px] py-1 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
      <div className='flex text-sm px-2 font-semibold items-center'>
        <div className='px-4'>Anywhere</div>
        <div className='hidden sm:block px-4 border-x-[1px]'>Any Week</div>
        <div className='hidden sm:block pl-4 pr-3 text-gray-600'>
          Add Guests
        </div>
        <div className='bg-mainColor text-white rounded-full p-1.5'>
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
}
