import { config } from './config';

const defaultSizes = {
  poster: 'w500',
  backdrop: 'w1280',
} as const;

type ImageSize = string;

export const imageService = {
  getPosterUrl(path: string | null | undefined, size: ImageSize = defaultSizes.poster): string {
    return path ? `${config.imageBase}/${size}${path}` : '/placeholder.svg';
  },

  getBackdropUrl(path: string | null | undefined, size: ImageSize = defaultSizes.backdrop): string {
    return path ? `${config.imageBase}/${size}${path}` : '';
  },
};