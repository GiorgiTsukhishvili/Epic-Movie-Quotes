import { TextAreaInputProps } from './textAreaInputProps';

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  register,
  text,
  name,
}) => {
  return (
    <textarea
      {...register(name, {
        required: {
          value: true,
          message: text,
        },
      })}
      className='bg-transparent w-full pr-12 border-gray-550 rounded-md border h-[5.375rem] text-white text-base lg:text-2xl leading-[150%] focus:ring-0 focus:border-gray-550 focus:border'
      cols={30}
      rows={10}
    ></textarea>
  );
};

export default TextAreaInput;
