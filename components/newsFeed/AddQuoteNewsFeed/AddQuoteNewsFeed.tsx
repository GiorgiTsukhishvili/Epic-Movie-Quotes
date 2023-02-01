import { ErrorMessage } from '@hookform/error-message';
import {
  Camera,
  CloseIcon,
  NoSSRWrapper,
  PencilAndBoard,
  Photo,
  TextAreaInput,
  useAddQuoteNewsFeed,
} from 'components';
import { i18n } from 'next-i18next';
import Image from 'next/image';
import { Fragment } from 'react';

const AddQuoteNewsFeed = () => {
  const {
    t,
    isAddQuoteOpen,
    setIsAddQuoteOpen,
    register,
    onSubmit,
    errors,
    handleFileUpload,
    handleSubmit,
    authorImage,
    authorName,
    getValues,
    movieNames,
  } = useAddQuoteNewsFeed();

  return (
    <Fragment>
      <div className='w-full h-24 lg:h-[3.25rem] rounded-xl lg:bg-zinc-750 bg-opacity-60 flex justify-start items-center pl-8 lg:pl-4'>
        <div
          className='flex justify-start items-center cursor-pointer'
          onClick={() => setIsAddQuoteOpen(true)}
        >
          <PencilAndBoard />
          <NoSSRWrapper>
            <h1 className='text-white leading-[150%] lg:text-2xl text-base ml-4'>
              {t('user.newsFeed.writeQuote')}
            </h1>
          </NoSSRWrapper>
        </div>
      </div>

      {isAddQuoteOpen && (
        <Fragment>
          <div
            className='h-screen w-screen fixed top-0 left-0 z-[70] backdrop-filter backdrop-blur-main-page '
            onClick={() => setIsAddQuoteOpen(false)}
          />

          <div className='lg:w-[60rem] lg:h-[calc(100vh_-_9rem)] z-[80] lg:max-h-auto  fixed overflow-scroll overflow-x-hidden  top-0 lg:top-28 left-1/2 translate-x-[-50%] w-screen h-screen bg-neutral-950 rounded-xl backdrop-filter backdrop-blur-user-page rotate--180'>
            <div className='w-full flex px-8 py-10 border-b border-b-border-transparent items-center justify-between'>
              <div />

              <h1 className='text-white text-xl lg:text-2xl leading-[150%] font-medium'>
                {t('user.newsFeed.writeQuote')}
              </h1>
              <div
                onClick={() => setIsAddQuoteOpen(false)}
                className='cursor-pointer'
              >
                <CloseIcon />
              </div>
            </div>

            <div className='px-8'>
              <div className='mt-8 mb-4 flex items-center gap-4'>
                <Image
                  src={authorImage!}
                  alt='author-image'
                  width={60}
                  height={60}
                  className='rounded-full'
                />
                <h1 className='text-white text-xl = leading-[150%] font-medium '>
                  {authorName}
                </h1>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <TextAreaInput
                    register={register}
                    name={'quote-en'}
                    text={t('form.login.required')}
                    placeholder='“Quote in English.”'
                    labelText='Eng'
                    language='en'
                    errorText={t('textArea.onlyEnglish')!}
                  />

                  <div className='text-red-550 h-5 font-normal text-base leading-[150%] my-1 mb-5'>
                    <ErrorMessage errors={errors} name='quote-en' />
                  </div>

                  <TextAreaInput
                    register={register}
                    name={'quote-ka'}
                    text={t('form.login.required')}
                    placeholder='“ციტატა ქართულ ენაზე”'
                    labelText='ქარ'
                    language='ka'
                    errorText={t('textArea.onlyGeorgian')!}
                  />

                  <div className='text-red-550 h-5 font-normal text-base leading-[150%] my-1 z-50 '>
                    <ErrorMessage errors={errors} name='quote-ka' />
                  </div>

                  <div className='w-full relative'>
                    <label htmlFor='id' className='absolute top-6 left-4'>
                      <Camera isSidebar={true} />
                    </label>
                    <select
                      {...register('id', {
                        required: {
                          value: true,
                          message: t('form.login.required')!,
                        },
                      })}
                      className='bg-black w-full pl-[4.25rem] border-transparent focus:border-transparent focus:ring-0 placeholder:text-white pr-12 rounded-md border h-[5.375rem] text-white text-base lg:text-2xl leading-[150%]'
                    >
                      <option value='' disabled>
                        {t('user.newsFeed.chooseMovie')}
                      </option>

                      {movieNames?.data.map(
                        (name: {
                          id: number;
                          name: { en: string; ka: string };
                        }) => (
                          <option key={name.id} value={name.id}>
                            {name.name[i18n?.language as 'ka' | 'en']}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className='text-red-550 h-5 font-normal text-base leading-[150%] my-1 z-50 '>
                    <ErrorMessage errors={errors} name='id' />
                  </div>

                  <div className='relative w-full h-[5.25rem] mt-5 border border-gray-550 rounded-md'>
                    <input
                      type='file'
                      accept='image/*'
                      multiple
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className='w-full h-[5.25rem] opacity-0 z-50 absolute top-0 left-0'
                    />

                    <div className='w-full h-[5.25rem] absolute top-0 flex justify-between items-center px-4'>
                      <div className='flex justify-center items-center gap-2'>
                        <Photo />
                        <h1 className='text-base hidden lg:inline text-white leading-[150%]'>
                          {t('user.singleMovie.drag')}
                        </h1>
                        <h1 className='text-base inline lg:hidden text-white leading-[150%]'>
                          {t('user.singleMovie.upload')}
                        </h1>
                      </div>
                      <h1 className='bg-purple-150 text-white text-xl leading-6 p-2'>
                        {t('user.singleMovie.chooseFile')}
                      </h1>
                    </div>
                  </div>
                  <div className='text-red-550 h-5 font-normal text-base leading-[150%] my-5 z-50 '>
                    <ErrorMessage errors={errors} name='image' />
                  </div>
                </div>

                {getValues().image !== '' && (
                  <Image
                    src={
                      typeof getValues().image === 'string'
                        ? (getValues().image as string)
                        : URL.createObjectURL(getValues().image as Blob)
                    }
                    alt='uploaded-photo'
                    width={900}
                    height={500}
                    className='lg:w-[56.25rem] lg:h-[31.875rem] mb-5 w-full h-auto object-cover rounded-xl'
                  />
                )}

                <button
                  type='submit'
                  className='bg-red-650 mb-5 hover:bg-red-750 text-white text-base  h-[2.375rem]  leading-[150%]  w-full rounded-md '
                >
                  {t('user.singleMovie.addQuote')}
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AddQuoteNewsFeed;
