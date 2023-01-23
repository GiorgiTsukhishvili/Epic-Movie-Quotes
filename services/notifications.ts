import { axios } from 'services';

export const getUserNotifications = async () => {
  return await axios.get('/api/notifications');
};

export const updateNotifications = async (data: number[]) => {
  return axios.post('/api/update-notification?_method=put', { ids: data });
};
