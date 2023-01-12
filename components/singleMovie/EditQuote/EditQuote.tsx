import { ErrorMessage } from '@hookform/error-message';
import { CloseIcon, TrashCan, Photo } from 'components';
import Image from 'next/image';
import { Fragment } from 'react';
import { EditQuoteProps } from './editQuoteTypes';
import useEditQuote from './useEditQuote';

const EditQuote: React.FC<EditQuoteProps> = ({
  setIsQuoteModelOpen,
  quoteId,
  quoteImage,
  quoteText,
  removeQuery,
}) => {
  const {
    t,
    name,
    image,
    handleSubmit,
    onSubmit,
    register,
    getValues,
    handleFileUpload,
    errors,
  } = useEditQuote(quoteImage, quoteText, quoteId, setIsQuoteModelOpen);

  return (
    <Fragment>
      <div
        className='h-screen w-screen fixed top-0 left-0 z-20 backdrop-filter backdrop-blur-main-page '
        onClick={() => setIsQuoteModelOpen('')}
      />
      <div className='lg:w-[60rem] lg:h-auto lg:overflow-auto z-30 lg:absolute fixed overflow-scroll top-0 lg:top-28 left-1/2 translate-x-[-50%] w-screen h-screen bg-neutral-950 rounded-xl backdrop-filter backdrop-blur-user-page rotate--180'>
        <div className='w-full flex px-8 py-10 border-b border-b-border-transparent items-center justify-between'>
          <div
            className='flex justify-start items-center gap-4 cursor-pointer'
            onClick={() => removeQuery(quoteId)}
          >
            <TrashCan />
            <h1 className='text-white text-base leading-[150%]'>
              {t('user.singleMovie.delete')}
            </h1>
          </div>
          <h1 className='text-white text-xl lg:text-2xl leading-[150%] font-medium'>
            {t('user.singleMovie.editQuote')}
          </h1>
          <div
            onClick={() => setIsQuoteModelOpen('')}
            className='cursor-pointer'
          >
            <CloseIcon />
          </div>
        </div>
        <div className='ml-8 mt-8 mb-4 flex items-center gap-4'>
          <Image src={image!} alt='author-image' width={60} height={60} />
          <h1 className='text-white text-xl = leading-[150%] font-medium'>
            {name}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='mx-8 mb-5'>
          <div className='relative'>
            <textarea
              {...register('quote-en', {
                required: {
                  value: true,
                  message: t('form.login.required'),
                },
                maxLength: {
                  value: 115,
                  message: t('user.singleMovie.maxLength'),
                },
              })}
              id='quote-en'
              cols={30}
              rows={10}
              className='bg-transparent w-full pr-12 border-gray-550 rounded-md border h-[5.375rem] text-white text-base lg:text-2xl leading-[150%] focus:ring-0 focus:border-gray-550 focus:border'
            ></textarea>
            <label
              htmlFor='quote-en'
              className='absolute right-2 top-7 text-gray-550 leading-[150%] text-xl'
            >
              Eng
            </label>
          </div>

          <div className='text-red-550 h-5 font-normal text-sm leading-[150%] my-1 mb-5'>
            <ErrorMessage errors={errors} name='quote-en' />
          </div>

          <div className='relative'>
            <textarea
              {...register('quote-ka', {
                required: {
                  value: true,
                  message: t('form.login.required'),
                },
                maxLength: {
                  value: 115,
                  message: t('user.singleMovie.maxLength'),
                },
              })}
              id=''
              className='bg-transparent w-full pr-12 border-gray-550 rounded-md border h-[5.375rem] text-white text-base lg:text-2xl leading-[150%] focus:ring-0 focus:border-gray-550 focus:border'
              cols={30}
              rows={10}
            ></textarea>
            <label
              htmlFor='quote-ka'
              className='absolute right-2 top-7 text-gray-550 leading-[150%] text-xl'
            >
              ქარ
            </label>
          </div>
          <div className='text-red-550 h-5 font-normal text-sm leading-[150%] my-1 z-50 '>
            <ErrorMessage errors={errors} name='quote-ka' />
          </div>

          <div className='relative mt-5 mb-10'>
            <input
              type='file'
              accept='image/*'
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
              className='lg:w-[56.25rem] lg:h-[31.875rem] w-full h-auto opacity-0 z-50 absolute top-0 left-0'
            />

            <Image
              src={
                typeof getValues().image === 'string'
                  ? (getValues().image as string)
                  : URL.createObjectURL(getValues().image as Blob)
              }
              alt='uploaded-photo'
              width={900}
              height={500}
              className='lg:w-[56.25rem] lg:h-[31.875rem] w-full h-auto object-cover rounded-xl'
            />

            <div className=' flex flex-col gap-2.5 justify-center z-40 items-center bg-main-gradient backdrop-filter backdrop-blur-user-page rounded-xl opacity-80 w-[8.438rem] h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <Photo />
              <h1 className='text-base text-white leading-[150%]'>
                {t('user.singleMovie.changePhoto')}
              </h1>
            </div>
          </div>

          <button
            type='submit'
            className='bg-red-650 hover:bg-red-750 text-white text-base  h-[2.375rem]  leading-[150%]  w-full rounded-md '
          >
            {t('user.singleMovie.saveChanges')}
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default EditQuote;
