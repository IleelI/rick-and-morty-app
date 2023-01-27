import { CharacterFilters } from './types';

export const getCharacterFilters = (filters: CharacterFilters) =>
  Object.entries(filters)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
