import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { emailRegex } from 'config';
import { addAdditionalEmail, updateUserInfo } from 'services';
import { updateUserData } from 'state';
import { ProfileFormTypes, UserAllInfoTypes } from 'types';

const useProfilePageDesktop = (
  data: UserAllInfoTypes,
  addNewMessage: (text: string, isEmail?: boolean, isError?: boolean) => void
) => {
  const { t } = useTranslation();
  const [isNameEditOpen, setIsNameEditOpen] = useState<boolean>(false);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [isPasswordEditOpen, setIsPasswordEditOpen] = useState<boolean>(false);
  const [isAddEmailOpen, setIsAddEmailOpen] = useState<boolean>(false);
  const [emails, setEmails] = useState(data.emails);

  const dispatch = useDispatch();

  const {
    register,
    getValues,
    control,
    setValue,
    setError,
    formState: { errors, isValid, dirtyFields },
    clearErrors,
  } = useForm<ProfileFormTypes>({
    mode: 'onChange',
    defaultValues: { image: data.image, name: data.name, email: '' },
  });

  useWatch({ control, name: ['image'] });

  const handleFileUpload = (imageData: FileList | null) => {
    if (imageData !== null) {
      if (imageData[0]) {
        setValue('image', imageData[0]);
        setIsFileUploaded(true);
      }
    }
  };

  const closeForms = () => {
    setIsFileUploaded(false);
    setIsNameEditOpen(false);
    setIsPasswordEditOpen(false);
    setIsAddEmailOpen(false);
    clearErrors('email');
    clearErrors('image');
    clearErrors('name');
    clearErrors('password');
    clearErrors('password_confirmation');
  };

  const cancelChanges = () => {
    setValue('image', data.image);
    setValue('name', data.name);
    setValue('email', '');
    setValue('password', '');
    setValue('password_confirmation', '');
    closeForms();
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateUserInfo, {
    onSuccess: (data) => {
      dispatch(updateUserData(data.data));
      queryClient.invalidateQueries('profile-info');
    },
  });

  const submitChanges = () => {
    if (
      isPasswordEditOpen &&
      (getValues().password === '' || getValues().password_confirmation === '')
    ) {
      setError('password', {
        type: 'custom',
        message: t('form.login.required')!,
      });
      setError('password_confirmation', {
        type: 'custom',
        message: t('form.login.required')!,
      });
    }
    if (!isValid) return;

    if (dirtyFields.password && Object.keys(dirtyFields).length === 2) {
      addNewMessage('user.profile.passwordChanged');
    } else if (Object.keys(dirtyFields).length > 1) {
      addNewMessage('user.profile.profileUpdated');
    } else if (typeof getValues().image !== 'string') {
      addNewMessage('user.profile.imageChanged');
    } else if (dirtyFields.name) {
      addNewMessage('user.profile.userNameChanged');
    }

    const formData = new FormData();

    formData.append('image', getValues().image);
    formData.append('name', getValues().name);
    formData.append('password', getValues().password);

    mutate(formData);
    closeForms();
  };

  const { mutate: addEmailMutation } = useMutation(addAdditionalEmail, {
    onSuccess: (data) => {
      setEmails((prevEmails) => [...prevEmails, data.data]);
      addNewMessage('user.profile.simpleAlert', true);
    },
    onError: () => {
      addNewMessage('errors.email', false, true);
    },
  });

  const submitEmail = () => {
    if (!emailRegex.test(getValues().email)) {
      setError('email', {
        type: 'custom',
        message: t('form.forgotPassword.inputEmail')!,
      });
      return;
    }

    if (data.emails.find((email) => email.email === getValues().email)) {
      setError('email', {
        type: 'custom',
        message: t('user.profile.emailIsUsed')!,
      });
      return false;
    }

    addEmailMutation(getValues().email);
    setValue('email', '');
    closeForms();
  };

  return {
    t,
    register,
    handleFileUpload,
    getValues,
    isNameEditOpen,
    setIsNameEditOpen,
    isFileUploaded,
    isPasswordEditOpen,
    setIsPasswordEditOpen,
    cancelChanges,
    submitChanges,
    errors,
    isAddEmailOpen,
    setIsAddEmailOpen,
    submitEmail,
    setValue,
    emails,
    setEmails,
  };
};

export default useProfilePageDesktop;
