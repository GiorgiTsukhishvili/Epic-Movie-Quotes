import { i18n } from 'next-i18next';
import Image from 'next/image';
import { Fragment } from 'react';
import { NewsFeedQuotesProps } from './newsFeedQuotesTypes';

const NewsFeedQuotes: React.FC<NewsFeedQuotesProps> = ({ data }) => {
  console.log(data);
  return (
    <Fragment>
      {data.map((quote) => (
        <div
          key={quote.id}
          className='w-full mb-10 bg-neutral-950 backdrop-filter backdrop-blur-user-page rounded-xl px-6 pl-6'
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
            className='rounded-xl'
          />
        </div>
      ))}
    </Fragment>
  );
};

export default NewsFeedQuotes;
