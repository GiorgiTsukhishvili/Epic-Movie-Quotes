import { AxiosResponse } from 'axios';
import { axios } from 'services';
import { MovieTypes } from 'types';

export const getAllMovies = async (): Promise<AxiosResponse<MovieTypes[]>> => {
  return axios.get('/api/movies');
};
