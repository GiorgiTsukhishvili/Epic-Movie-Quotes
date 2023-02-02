import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { deleteEmail, makePrimary } from 'services';
import { UserEmailTypes } from 'types';

const useProfileEmailsDesktop = (
  setEmails: Dispatch<SetStateAction<UserEmailTypes[]>>,
  emails: UserEmailTypes[]
) => {
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

  const removeEmail = (id: number) => {
    mutateDelete(id);

    setEmails((emails) => emails.filter((email) => email.id !== id));
  };

  const editPrimary = (id: number) => {
    mutatePrimary(id);

    const newMails = emails
      .map((email) => (email.is_primary ? { ...email, is_primary: 0 } : email))
      .map((email) => (email.id === id ? { ...email, is_primary: 1 } : email))
      .sort((emailOne, emailTwo) => emailTwo.is_primary - emailOne.is_primary);

    setEmails(newMails);
  };

  return { t, removeEmail, editPrimary };
};

export default useProfileEmailsDesktop;
