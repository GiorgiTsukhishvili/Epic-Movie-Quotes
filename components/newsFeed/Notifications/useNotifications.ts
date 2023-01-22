import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import { getUserNotifications } from 'services';
import { useSelector } from 'react-redux';
import { UserTypes } from 'types';
import { pusher } from 'config';
import { NotificationsTypes } from './notificationsTypes';
import { useQuery } from 'react-query';

const useNotifications = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const {
    user: { id },
  } = useSelector((state: { user: UserTypes }) => state);

  const { t } = useTranslation();

  const closeDropdown = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsNotificationsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', (e) => closeDropdown(e));

    return () => window.removeEventListener('click', (e) => closeDropdown(e));
  }, [isNotificationsOpen]);

  const [notifications, setNotifications] = useState<NotificationsTypes[]>([]);

  useQuery('notifications', getUserNotifications, {
    onSuccess: (data) => {
      setNotifications(data.data);
    },
  });

  useEffect(() => {
    pusher();

    if (id) {
      window.Echo.private(`epic-movies.${id}`).listen(
        '.notifications',
        (e: { notifications: { data: NotificationsTypes } }) => {
          if (e.notifications.data.user_id === id) {
            const newNotifications = notifications;
            newNotifications.unshift(e.notifications.data);
            setNotifications(newNotifications);
          }
        }
      );
    }
  }, [id]);

  const calculateData = (date: string) => {
    const time = Math.round((Date.now() - +new Date(date)) / 60000);

    if (time < 60) {
      return time + ' min ago';
    } else if (time < 1440) {
      return Math.round(time / 60) + ' hour ago';
    } else {
      return Math.round(time / 60 / 24) + ' day ago';
    }
  };

  const calculateNewNotifications = () => {
    const count = notifications.filter((not) => not.is_new).length;

    return count;
  };

  return {
    isNotificationsOpen,
    setIsNotificationsOpen,
    t,
    ref,
    notifications,
    calculateData,
    calculateNewNotifications,
  };
};

export default useNotifications;
