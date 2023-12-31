import { IconType } from 'react-icons';

type ButtonProps = {
  small?: boolean;
  outline?: boolean;
  disabled?: boolean;
  label: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({
  small = false,
  outline = false,
  disabled,
  label,
  icon: Icon,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full border-[1px]
       ${outline ? 'bg-white' : 'bg-mainColor'}
       ${outline ? 'border-black' : 'border-mainColor'}
       ${outline ? 'text-black' : 'text-white'} 
       ${small ? 'py-1' : 'py-3'} 
       ${small ? 'text-sm' : 'text-md'}
       ${small ? 'font-light' : 'font-semibold'}`}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-3' />}
      {label}
    </button>
  );
}
