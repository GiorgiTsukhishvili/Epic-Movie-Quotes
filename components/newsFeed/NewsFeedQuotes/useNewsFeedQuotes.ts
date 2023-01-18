import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { likeOrUnlike } from 'services';
import { UserTypes } from 'types';

const useNewsFeedQuotes = () => {
  const {
    user: { id: userId },
  } = useSelector((state: { user: UserTypes }) => state);

  const queryClient = useQueryClient();

  const { mutate: likeMutation } = useMutation(likeOrUnlike, {
    onSuccess: () => {
      queryClient.invalidateQueries('quotes');
    },
  });

  return {
    userId,
    likeMutation,
  };
};

export default useNewsFeedQuotes;
