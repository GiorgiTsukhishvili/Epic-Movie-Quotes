import { axios } from 'services';

export const getUserNotifications = async () => {
  return await axios.get('/api/notifications');
};
