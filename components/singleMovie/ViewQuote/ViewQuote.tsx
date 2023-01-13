import { CloseIcon, Pencil, TrashCan } from 'components';
import Image from 'next/image';
import React, { Fragment } from 'react';
import useViewQuote from './useViewQuote';
import { ViewQuoteProps } from './viewQueryTypes';

const ViewQuote: React.FC<ViewQuoteProps> = ({
  setIsQuoteModelOpen,
  quoteId,
  removeQuery,
}) => {
  const { t, name, image } = useViewQuote(quoteId);

  return (
    <Fragment>
      <div
        className='h-screen w-screen fixed top-0 left-0 z-20 backdrop-filter backdrop-blur-main-page '
        onClick={() => setIsQuoteModelOpen('')}
      />
      <div className='lg:w-[60rem] lg:h-[calc(100vh_-_9rem)] z-30 lg:max-h-[70rem]  fixed overflow-scroll overflow-x-hidden  top-0 lg:top-28 left-1/2 translate-x-[-50%] w-screen h-screen bg-neutral-950 rounded-xl backdrop-filter backdrop-blur-user-page rotate--180'>
        <div className='w-full flex px-8 py-10 border-b border-b-border-transparent items-center justify-between'>
          <div className='flex justify-center items-center'>
            <div
              className='pr-6 border-r border-r-gray-350'
              onClick={() => setIsQuoteModelOpen('edit')}
            >
              <Pencil />
            </div>
            <div className='ml-6' onClick={() => removeQuery(quoteId)}>
              <TrashCan />
            </div>
          </div>
          <h1 className='text-white text-xl lg:text-2xl leading-[150%] font-medium'>
            {t('user.singleMovie.viewQuote')}
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
      </div>
    </Fragment>
  );
};

export default ViewQuote;
