import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { addAdditionalEmail, updateUserInfo } from 'services';
import { updateUserData } from 'state';
import { ProfileFormTypes, UserAllInfoTypes } from 'types';

const useProfilePageMobile = (
  data: UserAllInfoTypes,
  addNewMessage: (text: string, isEmail?: boolean) => void
) => {
  const { t } = useTranslation();
  const [nameEditStep, setNameEditStep] = useState<string>('');
  const [passwordEditStep, setPasswordEditStep] = useState<string>('');
  const [emailStep, setEmailStep] = useState<string>('');
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);

  const dispatch = useDispatch();

  const {
    register: registerMobile,
    getValues: getValuesMobile,
    control: control,
    setValue: setValueMobile,
    formState: {
      errors: errorsMobile,
      isValid: isValidMobile,
      dirtyFields: mobileDirtyFields,
    },
    setError: setErrorMobile,
  } = useForm<ProfileFormTypes>({
    mode: 'onChange',
    defaultValues: { image: data.image, name: data.name },
  });

  useWatch({ control, name: ['image'] });

  const handleFileUploadMobile = (imageData: FileList | null) => {
    if (imageData !== null) {
      if (imageData[0]) {
        setValueMobile('image', imageData[0]);
        setIsFileUploaded(true);
      }
    }
  };

  const closeForms = () => {
    setNameEditStep('');
    setPasswordEditStep('');
    setIsFileUploaded(false);
    setEmailStep('');
  };

  const cancelChanges = () => {
    setValueMobile('image', data.image);
    setValueMobile('name', data.name);
    setValueMobile('password', '');
    setValueMobile('password_confirmation', '');
    setValueMobile('email', '');
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
    if (!isValidMobile) return;
    const formData = new FormData();

    if (typeof getValuesMobile().image !== 'string') {
      addNewMessage('user.profile.imageChanged');
    } else if (mobileDirtyFields.name) {
      addNewMessage('user.profile.userNameChanged');
    } else if (mobileDirtyFields.password) {
      addNewMessage('user.profile.passwordChanged');
    }

    formData.append('image', getValuesMobile().image);
    formData.append('name', getValuesMobile().name);
    formData.append('password', getValuesMobile().password);

    mutate(formData);
    closeForms();
  };

  const { mutate: addEmailMutation } = useMutation(addAdditionalEmail, {
    onSuccess: () => {
      queryClient.invalidateQueries('profile-info');
    },
  });

  const submitEmail = () => {
    addNewMessage('user.profile.simpleAlert', true);
    addEmailMutation(getValuesMobile().email);
    setValueMobile('email', '');
    closeForms();
  };

  return {
    t,
    registerMobile,
    handleFileUploadMobile,
    getValuesMobile,
    nameEditStep,
    setNameEditStep,
    passwordEditStep,
    setPasswordEditStep,
    errorsMobile,
    submitChanges,
    cancelChanges,
    setErrorMobile,
    isFileUploaded,
    setEmailStep,
    emailStep,
    submitEmail,
  };
};

export default useProfilePageMobile;
