import { ErrorMessage } from '@hookform/error-message';
import { CloseIcon, TrashCan, Photo, TextAreaInput } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { EditQuoteProps } from './editQuoteTypes';
import useEditQuote from './useEditQuote';

const EditQuote: React.FC<EditQuoteProps> = ({
  movieId,
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
  } = useEditQuote(quoteImage, quoteText, quoteId, movieId);

  return (
    <Fragment>
      <Link
        href={{
          pathname: `/movies/${movieId}`,
        }}
        className='h-screen w-screen fixed top-0 left-0 z-20 backdrop-filter backdrop-blur-main-page '
      ></Link>

      <div className='lg:w-[60rem] lg:h-[calc(100vh_-_9rem)] z-30 lg:max-h-[70rem]  fixed overflow-scroll overflow-x-hidden  top-0 lg:top-28 left-1/2 translate-x-[-50%] w-screen h-screen bg-neutral-950 rounded-xl backdrop-filter backdrop-blur-user-page rotate--180'>
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
          <Link
            href={{
              pathname: `/movies/${movieId}`,
            }}
            className='cursor-pointer'
          >
            <CloseIcon />
          </Link>
        </div>
        <div className='ml-8 mt-8 mb-4 flex items-center gap-4'>
          {image && (
            <Image
              src={image}
              alt='author-image'
              width={60}
              height={60}
              className='rounded-full w-[3.75rem] h-[3.75rem]'
            />
          )}
          <h1 className='text-white text-xl = leading-[150%] font-medium'>
            {name}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='mx-8 mb-5'>
          <TextAreaInput
            register={register}
            name={'quote-en'}
            text={t('form.login.required')}
            placeholder='“Quote in English.”'
            labelText='Eng'
          />

          <div className='text-red-550 h-5 font-normal text-sm leading-[150%] my-1 mb-5'>
            <ErrorMessage errors={errors} name='quote-en' />
          </div>

          <TextAreaInput
            text={t('form.login.required')}
            register={register}
            name={'quote-ka'}
            placeholder='“ციტატა ქართულ ენაზე”'
            labelText='ქარ'
          />

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
