import type { Film, FilmDetail, FilmResponse } from '@/types/film.types';
import { apiClient } from './api-client';

export const filmService = {
  async getByGenre(genreId: number, page = 1): Promise<Film[]> {
    const { results } = await apiClient.fetch<FilmResponse>('/discover/movie', {
      with_genres: genreId,
      sort_by: 'popularity.desc',
      page,
      include_adult: false,
      include_video: false,
    });
    
    return results;
  },
  async getById(id: number): Promise<FilmDetail> {
    return apiClient.fetch<FilmDetail>(`/movie/${id}`);
  },
};