export interface Film {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  popularity: number;
}

export interface FilmResponse {
  page: number;
  results: Film[];
  total_pages: number;
  total_results: number;
}

export interface FilmDetail extends Film {
  runtime: number | null;
  budget: number;
  revenue: number;
  tagline: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  spoken_languages: SpokenLanguage[];
  status: string;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}