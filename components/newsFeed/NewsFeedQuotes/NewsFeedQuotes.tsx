import {
  Like,
  LikeFilled,
  NewsFeedCommentForm,
  QuoteComment,
  useNewsFeedQuotes,
} from 'components';
import { i18n } from 'next-i18next';
import Image from 'next/image';
import { Fragment } from 'react';
import { NewsFeedQuotesProps } from './newsFeedQuotesTypes';

const NewsFeedQuotes: React.FC<NewsFeedQuotesProps> = ({ data }) => {
  const { userId, likeMutation } = useNewsFeedQuotes();

  return (
    <Fragment>
      {data.map((quote) => (
        <div
          key={quote.id}
          className='w-full mb-10 bg-neutral-950 backdrop-filter backdrop-blur-user-page rounded-xl px-6 pt-6'
        >
          <div className='flex justify-start gap-4 items-center '>
            <Image
              src={quote.movie.user.image}
              alt='user-image'
              width={52}
              height={52}
              className='rounded-full w-10 h-10 lg:w-[3.25rem] lg:h-[3.25rem]'
            />
            <h1 className='text-white text-base lg:text-xl leading-[150%]'>
              {quote.movie.user.name}
            </h1>
          </div>
          <h1 className='text-white text-base lg:text-xl leading-[150%] mt-4 mb-7'>
            &quot;{quote.quote[i18n?.language as 'ka' | 'en']}&quot;
            <span className='text-orange-250'>
              &nbsp;{quote.movie.name[i18n?.language as 'ka' | 'en']}&nbsp;
            </span>
            ({quote.movie.date})
          </h1>
          <Image
            src={quote.image}
            alt='quote-image'
            width={890}
            height={500}
            className='rounded-xl object-cover h-[12.5rem] md:h-[20rem] lg:h-[31.25rem]'
          />

          <div className='py-6  flex gap-8 items-center'>
            <div className='flex gap-3 text-white leading-[150%] text-xl'>
              {quote.comments.length}
              <QuoteComment />
            </div>
            <div
              className='flex gap-3 text-white leading-[150%] text-xl cursor-pointer'
              onClick={() =>
                likeMutation({ id: quote.id, userId: quote.movie.user_id })
              }
            >
              {quote.likes.length}
              {quote.likes.find(
                (like: { user_id: number }) => like.user_id === userId
              ) ? (
                <LikeFilled />
              ) : (
                <Like />
              )}
            </div>
          </div>

          <div className='border-t border-t-quote-border pt-6'>
            {quote.comments.map((comment) => (
              <div key={comment.id} className='flex gap-6'>
                <Image
                  src={comment.user.image}
                  alt='user-image'
                  width={60}
                  height={60}
                  className='rounded-full w-[3.75rem] h-[3.75rem]'
                />
                <div className='border-b border-b-quote-border w-full pb-6 mb-6'>
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
          <NewsFeedCommentForm id={quote.id} />
        </div>
      ))}
    </Fragment>
  );
};

export default NewsFeedQuotes;
