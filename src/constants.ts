export const CATEGORY_SLUGS = ['action', 'comedy', 'documentary'] as const;

export type CategorySlug = typeof CATEGORY_SLUGS[number];

export interface Category {
  slug: CategorySlug;
  name: string;
  genreId: number;
}

// Can get more generas and ids from https://api.themoviedb.org/3/genre/movie/list this api by providing proper endpoint, but for now hardcoding these 3 categories for simplicity and to avoid unnecessary api calls

export const CATEGORIES: readonly Category[] = [
  { slug: 'action', name: 'Action', genreId: 28 },
  { slug: 'comedy', name: 'Comedy', genreId: 35 },
  { slug: 'documentary', name: 'Documentary', genreId: 99 },
] as const;

export const GENRE_TO_CATEGORY = new Map(
  CATEGORIES.map(cat => [cat.genreId, cat.slug])
);