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

  const [notifications, setNotifications] = useState<NotificationsTypes[]>([]);

  useQuery('notifications', getUserNotifications, {
    onSuccess: (data) => {
      setNotifications(data.data);
    },
  });

  useEffect(() => {
    pusher();

    if (id) {
      (window as any).Echo.private(`epic-movies.${id}`).listen(
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

  useEffect(() => {
    window.addEventListener('click', (e) => closeDropdown(e));

    return () => window.removeEventListener('click', (e) => closeDropdown(e));
  }, [isNotificationsOpen]);

  return { isNotificationsOpen, setIsNotificationsOpen, t, ref, notifications };
};

export default useNotifications;
