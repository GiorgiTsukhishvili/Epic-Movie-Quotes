import { deleteCookie, hasCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { fetchUserInfo } from 'services';
import { useDispatch } from 'react-redux';
import { updateUserData } from 'state';

const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetchUserInfo();
        dispatch(updateUserData(response.data.user));
      } catch (error) {
        if (router.pathname !== '/') {
          deleteCookie('XSRF-TOKEN');
          router.push('/');
        }
      }
    };
    if (hasCookie('XSRF-TOKEN') && hasCookie('isLoggedIn')) {
      checkAuth();
    } else {
      deleteCookie('isLoggedIn');
      router.push('/');
    }
  }, [router]);
};

export default useAuth;
