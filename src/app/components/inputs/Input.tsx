import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  required?: boolean;
  value?: string | number;
};

export default function Input({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  register,
  errors,
  required,
  value,
}: InputProps) {
  return (
    <div className='w-full relative'>
      {formatPrice && (
        <BiDollar
          size={24}
          className='text-neutral-700 absolute top-9 left-2'
        />
      )}
      <input
        id={id}
        value={value}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=''
        type={type}
        className={`peer w-full p-4 pt-6 mt-4 font-light bg-white border-2 rounded-md outline-none disabled:opacity-70 disabled:cursor-not-allowed
        ${formatPrice ? 'pl-9' : 'pl-4'}
        ${errors[id] ? 'border-mainColor' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-mainColor' : 'focus:border-black'}`}
      />
      <label
        className={`absolute text-md duration-150 -translate-y-3 top-9 left-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
        ${formatPrice ? 'left-9' : 'left-4'}
        ${errors[id] ? 'text-mainColor' : 'text-zinc-400'}`}
      >
        {label}
      </label>
    </div>
  );
}
