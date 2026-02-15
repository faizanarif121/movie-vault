import { filmDetailQueryOptions } from '@/hooks/rq/useFilmDetails';
import FilmDetailsPage from '@/pages/FilmDetailsPage';
import { imageService } from '@/services/image.service';
import { createFileRoute } from '@tanstack/react-router';

type FilmSearchParams = {
  category?: string;
};

export const Route = createFileRoute('/film/$id')({
  validateSearch: (search: Record<string, unknown>): FilmSearchParams => ({
    category: (search.category as string) || undefined,
  }),
  beforeLoad: async ({ context, params }) => {
    const filmId = Number(params.id);
    const filmData = await context.queryClient.ensureQueryData(
      filmDetailQueryOptions(filmId)
    );
    return { filmData };
  },
  head: (ctx) => {
    const filmData = ctx.match.context.filmData;
    const filmTitle = filmData?.title || 'Film Details';
    const title = `${filmTitle} | Movie Vault`;
    const description = filmData?.overview ? filmData.overview.substring(0, 160) : 'Discover film details on Movie Vault';
    const posterUrl = imageService.getPosterUrl(filmData?.poster_path, 'w342');
    
    return {
      title,
      meta: [
        {
          title: title,
        },
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: filmTitle,
        },
        {
          property: 'og:description',
          content: description,
        },
        ...(posterUrl ? [{
          property: 'og:image',
          content: posterUrl,
        }] : []),
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    };
  },
  loader: async ({ context }) => {
    return context.filmData;
  },
  component: FilmDetailsPage,
});
