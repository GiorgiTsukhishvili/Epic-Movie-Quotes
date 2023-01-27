import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';
import { getUserNotifications, updateNotifications } from 'services';
import { useSelector } from 'react-redux';
import { UserTypes } from 'types';
import { pusher } from 'config';
import { NotificationsTypes } from './notificationsTypes';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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

  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateNotifications, {
    onSuccess: () => {
      queryClient.invalidateQueries('notifications');
    },
  });

  const updateAllNotifications = () => {
    const notificationsToUpdate = notifications
      .filter((notification) => notification.is_new)
      .map((notification) => notification.id);

    mutate(notificationsToUpdate);
  };

  useEffect(() => {
    pusher();

    if (id) {
      window.Echo.private(`epic-movies.${id}`).listen('.notifications', () => {
        queryClient.invalidateQueries('notifications');
      });
    }
  }, [id]);

  const calculateData = (date: string) => {
    const time = Math.round((Date.now() - +new Date(date)) / 60000);

    if (time < 60) {
      return time + t('user.navbar.min');
    } else if (time < 1440) {
      return Math.round(time / 60) + t('user.navbar.hour');
    } else {
      return Math.round(time / 60 / 24) + t('user.navbar.day');
    }
  };

  const calculateNewNotifications = () => {
    const count = notifications.filter(
      (notification) => notification.is_new
    ).length;

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
    mutate,
    updateAllNotifications,
  };
};

export default useNotifications;
