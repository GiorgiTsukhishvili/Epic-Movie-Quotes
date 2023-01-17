import { AxiosResponse } from 'axios';
import { axios } from 'services';
import { MovieTypes, SingleMovieTypes } from 'types';

export const getAllMovies = async (query: {
  search?: string;
}): Promise<AxiosResponse<MovieTypes[]>> => {
  return axios.get('/api/movies', { params: query });
};

export const getSingleMovie = async (
  id: string
): Promise<AxiosResponse<SingleMovieTypes>> => {
  return axios.get(`/api/movie/${id}`);
};

export const deleteMovie = async (movie: string) => {
  return axios.delete(`/api/delete-movie/${movie}`);
};

export const getMovieGenres = async () => {
  return await axios.get('/api/movie-genres');
};

export const createMovie = async (data: FormData) => {
  return await axios.post('/api/create-movie', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateMovie = async (data: FormData) => {
  return axios.post('/api/update-movie?_method=put', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
