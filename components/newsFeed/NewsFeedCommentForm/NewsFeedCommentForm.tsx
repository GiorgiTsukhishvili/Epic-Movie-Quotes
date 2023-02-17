import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';
import { Fragment } from 'react';
import { NewsFeedCommentFormProps } from './newsFeedCommentFormTypes';
import useNewsFeedCommentForm from './useNewsFeedCommentForm';

const NewsFeedCommentForm: React.FC<NewsFeedCommentFormProps> = ({ id }) => {
  const { t, handleSubmit, onSubmit, register, image, errors } =
    useNewsFeedCommentForm(id);

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex justify-center items-center  gap-6 mb-2'
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
          className='border-none w-full rounded-xl focus:ring-0 placeholder:text-gray-350 text-white text-xl leading-9.5 bg-comment-input'
          placeholder={t('user.singleMovie.writeComment')!}
        />
      </form>
      <div className='text-red-550 h-5 font-normal text-sm leading-9.5 mb-6 '>
        <ErrorMessage errors={errors} name='comment' />
      </div>
    </Fragment>
  );
};

export default NewsFeedCommentForm;
