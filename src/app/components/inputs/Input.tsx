import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  required?: boolean;
};

export default function Input({
  id,
  label,
  type = 'text',
  disabled,
  register,
  errors,
  required,
}: InputProps) {
  return (
    <div className='w-full relative'>
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=''
        type={type}
        className={`peer w-full p-4 pt-6 mt-4 font-light bg-white border-2 rounded-md outline-none disabled:opacity-70 disabled:cursor-not-allowed
        ${errors[id] ? 'border-mainColor' : 'border-neutral-300'}
        ${errors[id] ? 'focus:border-mainColor' : 'focus:border-black'}`}
      />
      <label
        className={`absolute text-md duration-150 -translate-y-3 top-9 left-4 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
        ${errors[id] ? 'text-mainColor' : 'text-zinc-400'}`}
      >
        {label}
      </label>
    </div>
  );
}
