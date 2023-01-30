import { NormalInputProps } from './normalInputProps';

const NormalInput: React.FC<NormalInputProps> = ({
  text,
  register,
  name,
  placeholder,
  labelText,
  type,
}) => {
  return (
    <div className='relative '>
      <input
        type={type}
        {...register(name, {
          required: {
            value: true,
            message: text,
          },
        })}
        className='bg-transparent w-full pr-12 placeholder:text-gray-550 border-gray-550 rounded-md border h-12 text-white text-base lg:text-2xl leading-[150%] focus:ring-0 focus:border-gray-550 focus:border'
        placeholder={placeholder}
      />

      <label
        htmlFor={name}
        className='absolute right-2 top-2 text-gray-550 leading-[150%] text-xl'
      >
        {labelText}
      </label>
    </div>
  );
};

export default NormalInput;
