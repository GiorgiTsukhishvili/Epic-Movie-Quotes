import { axios } from 'services';

export const likeOrUnlike = (info: { id: number; userId: number | null }) => {
  return axios.post(`/api/store-or-destroy/${info.id}`, {
    user_id: info.userId,
  });
};
