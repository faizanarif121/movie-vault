function getEnvVar(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const config = {
  apiKey: getEnvVar('VITE_TMDB_API_KEY'),
  baseUrl: getEnvVar('VITE_TMDB_BASE_URL'),
  imageBase: getEnvVar('VITE_TMDB_IMAGE_BASE_PATH'),
} as const;