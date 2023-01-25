import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from 'services';
import { updateUserData } from 'state';
import { ProfileFormTypes, UserAllInfoTypes } from 'types';

const useProfilePageMobile = (data: UserAllInfoTypes) => {
  const { t } = useTranslation();
  const [nameEditStep, setNameEditStep] = useState<string>('');
  const [passwordEditStep, setPasswordEditStep] = useState<string>('');

  const dispatch = useDispatch();

  const {
    register: registerMobile,
    getValues: getValuesMobile,
    control: control,
    setValue: setValueMobile,
    formState: { errors: errorsMobile, isValid: isValidMobile },
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
      }
    }
  };

  const closeForms = () => {
    setNameEditStep('');
    setPasswordEditStep('');
  };

  const cancelChanges = () => {
    setValueMobile('image', data.image);
    setValueMobile('name', data.name);
    setValueMobile('password', '');
    setValueMobile('password_confirmation', '');
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

    formData.append('image', getValuesMobile().image);
    formData.append('name', getValuesMobile().name);
    formData.append('password', getValuesMobile().password);

    mutate(formData);
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
  };
};

export default useProfilePageMobile;
