import { filmService } from '@/services/film.service';
import type { FilmDetail } from '@/types/film.types';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

const STALE_TIME = 5 * 60 * 1000;

export const filmDetailQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['films', 'detail', id],
    queryFn: (): Promise<FilmDetail> => filmService.getById(id),
    staleTime: STALE_TIME
  });

export function useFilmDetail(id: number) {
  return useSuspenseQuery(filmDetailQueryOptions(id));
}
