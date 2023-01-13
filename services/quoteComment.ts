import { axios } from 'services';

export const createComment = (data: { comment: string; quote_id: string }) => {
  return axios.post('/api/create-comment', data);
};
