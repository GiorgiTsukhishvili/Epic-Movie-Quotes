import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { ProfileFormTypes, UserAllInfoTypes } from 'types';

const useProfilePageMobile = (data: UserAllInfoTypes) => {
  const { t } = useTranslation();
  const [isNameEditOpen, setIsNameEditOpen] = useState<boolean>(false);

  const { register, getValues, control, setValue } = useForm<ProfileFormTypes>({
    mode: 'onChange',
    defaultValues: { image: data.image, name: data.name },
  });

  useWatch({ control, name: ['image'] });

  const handleFileUpload = (imageData: FileList | null) => {
    if (imageData !== null) {
      if (imageData[0]) {
        setValue('image', imageData[0]);
      }
    }
  };

  return {
    t,
    register,
    handleFileUpload,
    getValues,
    isNameEditOpen,
    setIsNameEditOpen,
  };
};

export default useProfilePageMobile;
