import { useTranslation } from 'next-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { deleteEmail, makePrimary } from 'services';

const useProfileEmailsDesktop = () => {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { mutate: mutateDelete } = useMutation(deleteEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile-info');
    },
  });

  const { mutate: mutatePrimary } = useMutation(makePrimary, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile-info');
    },
  });

  return { t, mutateDelete, mutatePrimary };
};

export default useProfileEmailsDesktop;
