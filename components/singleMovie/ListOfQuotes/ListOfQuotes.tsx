import {
  EditQuote,
  EyeColored,
  Like,
  Pencil,
  QuoteComment,
  ThreeDots,
  TrashCan,
  useListOfQuotes,
} from 'components';
import { i18n } from 'next-i18next';
import Image from 'next/image';
import { Fragment } from 'react';
import { ListOfQuotesTypes } from './listOfQuotesTypes';

const ListOfQuotes: React.FC<ListOfQuotesTypes> = ({ quote }) => {
  const {
    isViewOpen,
    setIsViewOpen,
    ref,
    t,
    removeQuery,
    isQuoteModelOpen,
    setIsQuoteModelOpen,
  } = useListOfQuotes();

  return (
    <Fragment>
      <div className='xl:max-w-[50.563rem] w-full bg-neutral-950 rounded-lg backdrop-filter backdrop-blur-user-page relative'>
        <div className='py-6 mx-8 flex items-start  xl:items-center xl:flex-row flex-col border-b border-b-border-transparent'>
          <Image
            src={quote.image}
            alt='quote-image'
            priority
            width={360}
            height={140}
            className='xl:w-[14.125rem] w-full h-[8.75rem] rounded-sm object-cover'
          />
          <h1 className='text-gray-350 break-words text-2xl leading-[150%] ml-0 mt-6 xl:mt-0 xl:ml-9 xl:w-[29.375rem] w-auto'>
            &quot;
            {quote.quote[i18n?.language! as 'en' | 'ka'].length > 100
              ? quote.quote[i18n?.language! as 'en' | 'ka'].slice(0, 100) +
                '....'
              : quote.quote[i18n?.language! as 'en' | 'ka']}
            &quot;
          </h1>
        </div>

        <div className='py-6 px-8 flex gap-8 items-center'>
          <div className='flex gap-3 text-white leading-[150%] text-xl'>
            {quote.comments_count}
            <QuoteComment />
          </div>
          <div className='flex gap-3 text-white leading-[150%] text-xl'>
            {quote.likes_count}
            <Like />
          </div>
        </div>

        <div
          className='absolute xl:top-8 xl:right-8 bottom-10 right-10 cursor-pointer'
          onClick={() => setIsViewOpen(true)}
        >
          <ThreeDots />
        </div>

        {isViewOpen && (
          <div
            ref={ref}
            className='w-[15.625rem] flex flex-col px-10 justify-center gap-9 h-[12.5rem] bg-zinc-750 rounded-xl absolute xl:right-[-4rem] xl:top-12 2xl:right-[-12em] bottom-9 right-9'
          >
            <div className='flex justify-start items-center gap-4 cursor-pointer'>
              <EyeColored />
              <h1 className='text-white text-base leading-[150%]'>
                {t('user.singleMovie.viewQuote')}
              </h1>
            </div>
            <div
              className='flex justify-start items-center gap-4 cursor-pointer'
              onClick={() => setIsQuoteModelOpen('edit')}
            >
              <Pencil />
              <h1 className='text-white text-base leading-[150%]'>
                {t('user.singleMovie.edit')}
              </h1>
            </div>
            <div
              className='flex justify-start items-center gap-4 cursor-pointer'
              onClick={() => removeQuery(quote.id)}
            >
              <TrashCan />
              <h1 className='text-white text-base leading-[150%]'>
                {t('user.singleMovie.delete')}
              </h1>
            </div>
          </div>
        )}
      </div>
      {isQuoteModelOpen === 'edit' && (
        <EditQuote
          setIsQuoteModelOpen={setIsQuoteModelOpen}
          quoteId={quote.id}
          quoteImage={quote.image}
          quoteText={quote.quote}
          removeQuery={removeQuery}
        />
      )}
    </Fragment>
  );
};

export default ListOfQuotes;
