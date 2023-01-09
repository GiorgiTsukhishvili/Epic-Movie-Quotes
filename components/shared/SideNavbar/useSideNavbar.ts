import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { UserTypes } from 'types';

const useSideNavbar = () => {
  const { t } = useTranslation();
  const {
    user: { name, image },
  } = useSelector((state: { user: UserTypes }) => state);

  return { t, name, image };
};

export default useSideNavbar;
