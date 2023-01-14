import { axios } from 'services';

export const likeOrUnlike = (id: number) => {
  return axios.post(`/api/store-or-destroy/${id}`);
};
