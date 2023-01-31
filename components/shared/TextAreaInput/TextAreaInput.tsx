import { TextAreaInputProps } from './textAreaInputProps';

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  register,
  text,
  name,
  placeholder,
  labelText,
  language,
  errorText,
}) => {
  return (
    <div className='relative'>
      <textarea
        {...register(name, {
          required: {
            value: true,
            message: text,
          },
          validate: {
            onlyGeorgianOrEnglish: (value: string) => {
              if (language === 'en' && !/^[a-z0-9_\-]+$/.test(value)) {
                return errorText;
              }

              if (language === 'ka' && !/^[ა-ჰ0-9_\-]+$/.test(value)) {
                return errorText;
              }
            },
          },
        })}
        className='bg-transparent w-full placeholder:text-gray-550 pr-12 border-gray-550 rounded-md border h-[5.375rem] text-white text-base lg:text-2xl leading-[150%] focus:ring-0 focus:border-gray-550 focus:border'
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
