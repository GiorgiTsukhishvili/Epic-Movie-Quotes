import { ErrorMessage } from '@hookform/error-message';
import {
  CloseIcon,
  Like,
  LikeFilled,
  Pencil,
  QuoteComment,
  TrashCan,
} from 'components';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { QuoteCommentTypes } from 'types';
import useViewQuote from './useViewQuote';
import { ViewQuoteProps } from './viewQueryTypes';

const ViewQuote: React.FC<ViewQuoteProps> = ({ quoteId, removeQuery }) => {
  const {
    t,
    name,
    image,
    quoteData,
    isLoading,
    userId,
    likeMutation,
    register,
    handleSubmit,
    onSubmit,
    errors,
  } = useViewQuote(quoteId);

  return isLoading ? (
    <></>
  ) : (
    <Fragment>
      <Link
        href={`/movies/${quoteData.movie_id}`}
        className='h-screen w-screen fixed top-0 left-0 z-20 backdrop-filter backdrop-blur-main-page '
      ></Link>
      <div className='lg:w-[60rem] lg:h-[calc(100vh_-_9rem)] z-30 lg:max-h-[70rem]  fixed overflow-scroll overflow-x-hidden  top-0 lg:top-28 left-1/2 translate-x-[-50%] w-screen h-screen bg-neutral-950 rounded-xl backdrop-filter backdrop-blur-user-page rotate--180'>
        <div className='w-full flex px-8 py-10 border-b border-b-border-transparent items-center justify-between'>
          <div className='flex justify-center items-center'>
            <Link
              href={{
                pathname: `/movies/${quoteData.movie_id}`,
                query: { mode: 'edit', 'quote-id': quoteId },
              }}
              className='pr-6 border-r border-r-gray-350'
            >
              <Pencil />
            </Link>
            <div className='ml-6' onClick={() => removeQuery(quoteId)}>
              <TrashCan />
            </div>
          </div>
          <h1 className='text-white text-xl lg:text-2xl leading-[150%] font-medium'>
            {t('user.singleMovie.viewQuote')}
          </h1>
          <Link
            href={`/movies/${quoteData.movie_id}`}
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
        <div className='border border-gray-550 lg:h-[3.375rem] h-[5.25rem] flex justify-between items-start px-2 py-1 rounded-md mx-8 mt-2'>
          <h1 className='text-white lg:text-2xl text-base leading-[150%]'>
            &quot;{quoteData.quote.en}&quot;
          </h1>
          <h1 className=' text-gray-550 leading-[150%] text-xl'>Eng</h1>
        </div>
        <div className='border border-gray-550 lg:h-[3.375rem] h-[5.25rem] flex justify-between items-start px-2 py-1 rounded-md mx-8 mt-4'>
          <h1 className='text-white lg:text-2xl text-base leading-[150%]'>
            &quot;{quoteData.quote.ka}&quot;
          </h1>
          <h1 className=' text-gray-550 leading-[150%] text-xl'>ქარ</h1>
        </div>

        <div className=' mt-8 mx-8'>
          <Image
            src={quoteData.image}
            alt='uploaded-photo'
            width={900}
            height={500}
            className='lg:w-[56.25rem] lg:h-[31.875rem] w-full h-auto object-cover rounded-xl  '
          />
        </div>

        <div className='py-6 px-8 flex gap-8 items-center'>
          <div className='flex gap-3 text-white leading-[150%] text-xl'>
            {quoteData.comments.length}
            <QuoteComment />
          </div>
          <div
            className='flex gap-3 text-white leading-[150%] text-xl cursor-pointer'
            onClick={() =>
              likeMutation({
                id: quoteData.id,
                userId: quoteData.movie.user_id,
              })
            }
          >
            {quoteData.likes.length}
            {quoteData.likes.find(
              (like: { user_id: number }) => like.user_id === userId
            ) ? (
              <LikeFilled />
            ) : (
              <Like />
            )}
          </div>
        </div>
        <div className='mx-8'>
          {quoteData.comments.map((comment: QuoteCommentTypes) => (
            <div key={comment.id} className='flex gap-6'>
              <Image
                src={comment.user.image}
                alt='user-image'
                width={60}
                height={60}
                className='rounded-full w-[3.75rem] h-[3.75rem]'
              />
              <div className='border-b border-b-gray-350 w-full pb-6 mb-6'>
                <h1 className='text-white text-xl leading-[150%] font-medium mt-1'>
                  {comment.user.name}
                </h1>
                <h1 className='text-white text-xl leading-[150%] mt-3'>
                  {comment.comment}
                </h1>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex justify-center items-center px-9 gap-6 mb-2'
        >
          {image && (
            <Image
              src={image}
              alt='author-image'
              width={52}
              height={52}
              className='rounded-full w-[3.25rem] h-[3.25rem]'
            />
          )}
          <input
            type='text'
            {...register('comment', {
              required: {
                value: true,
                message: t('form.login.required'),
              },
            })}
            className='border-none w-full rounded-xl focus:ring-0 placeholder:text-gray-350 text-white text-xl leading-[150%] bg-comment-input'
            placeholder={t('user.singleMovie.writeComment')!}
          />
        </form>
        <div className='text-red-550 h-5 font-normal text-sm leading-[150%] mb-6 mx-8'>
          <ErrorMessage errors={errors} name='comment' />
        </div>
      </div>
    </Fragment>
  );
};

export default ViewQuote;
