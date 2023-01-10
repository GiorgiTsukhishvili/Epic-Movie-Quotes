import { AxiosResponse } from 'axios';
import { axios } from 'services';
import { MovieTypes, SingleMovieTypes } from 'types';

export const getAllMovies = async (): Promise<AxiosResponse<MovieTypes[]>> => {
  return axios.get('/api/movies');
};

export const getSingleMovie = async (
  id: string
): Promise<AxiosResponse<SingleMovieTypes[]>> => {
  return axios.get(`/api/movie/${id}`);
};

export const deleteMovie = async (movie: string) => {
  return axios.delete(`/api/delete-movie/${movie}`);
};
