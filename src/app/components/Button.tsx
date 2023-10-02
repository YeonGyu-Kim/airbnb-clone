type ButtonProps = {
  small?: boolean;
  outline?: boolean;
  label: string;
};

export default function Button({
  small = false,
  outline = false,
  label,
}: ButtonProps) {
  return (
    <button
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full border-[1px]
       ${outline ? 'bg-white' : 'bg-mainColor'}
       ${outline ? 'border-black' : 'border-mainColor'}
       ${outline ? 'text-black' : 'text-white'} 
       ${small ? 'py-1' : 'py-3'} 
       ${small ? 'text-sm' : 'text-md'}
       ${small ? 'font-light' : 'font-semibold'}`}
    >
      {label}
    </button>
  );
}
