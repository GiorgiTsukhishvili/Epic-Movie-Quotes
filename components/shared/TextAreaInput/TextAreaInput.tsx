import { TextAreaInputProps } from './textAreaInputProps';

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  register,
  text,
  name,
  placeholder,
  labelText,
}) => {
  return (
    <div className='relative'>
      <textarea
        {...register(name, {
          required: {
            value: true,
            message: text,
          },
        })}
        className='bg-transparent w-full placeholder:text-white pr-12 border-gray-550 rounded-md border h-[5.375rem] text-white text-base lg:text-2xl leading-[150%] focus:ring-0 focus:border-gray-550 focus:border'
        cols={30}
        rows={10}
        placeholder={placeholder}
      ></textarea>
      <label
        htmlFor={name}
        className='absolute right-2 top-7 text-gray-550 leading-[150%] text-xl'
      >
        {labelText}
      </label>
    </div>
  );
};

export default TextAreaInput;
