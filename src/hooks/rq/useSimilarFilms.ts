import { filmService } from '@/services/film.service';
import type { Film } from '@/types/film.types';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

const STALE_TIME = 5 * 60 * 1000;

export const similarFilmsQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['films', 'similar', id],
    queryFn: (): Promise<Film[]> => filmService.getSimilar(id),
    staleTime: STALE_TIME,
  });

export function useSimilarFilms(id: number) {
  return useSuspenseQuery(similarFilmsQueryOptions(id));
}
