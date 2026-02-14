import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { filmService } from '@/services/film.service';
import { CATEGORIES, type Category } from '@/constants';
import type { Film } from '@/types/film.types';

export interface CategoryData {
  category: Category;
  films: Film[];
}
const STALE_TIME = 5 * 60 * 1000; // 5 minutes is more than enough for the home page films data, as it doesn't change that often and we want to avoid unnecessary refetches when users navigate away and back to the home page within a short time span. TLDR; Idea is to save api calls as we are using free tmdb api which has rate limits and we don't want to hit those limits unnecessarily

export const homeFilmsQueryOptions = () =>
  queryOptions({
    queryKey: ['films', 'home'],
    queryFn: async (): Promise<CategoryData[]> => {
      return Promise.all(
        CATEGORIES.map(async (category) => ({
          category,
          films: await filmService.getByGenre(category.genreId),
        }))
      );
    },
    staleTime: STALE_TIME,
  });

export function useHomeFilms() {
  return useSuspenseQuery(homeFilmsQueryOptions());
}