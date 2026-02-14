import { GENRE_TO_CATEGORY, type CategorySlug, } from '@/constants';

export function getCategoryByGenreIds(genreIds: number[]): CategorySlug {
  for (const genreId of genreIds) {
    const slug = GENRE_TO_CATEGORY.get(genreId);
    if (slug) return slug;
  }
  return 'documentary';
}