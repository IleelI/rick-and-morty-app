import {
  PaginatedResponse,
  Character,
  RequestParams,
  ApiPaginatedResponse,
  CharacterFilters,
} from './types';

const BASE_URL = 'https://rickandmortyapi.com/api';

const CHARACTERS_BASE_URL = `${BASE_URL}/character`;

const getCharacterFilters = (filters: CharacterFilters) =>
  Object.entries(filters)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

export async function getCharacters({
  page = 1,
  filters = {},
}: RequestParams<CharacterFilters> = {}) {
  try {
    const filtersQuery = getCharacterFilters(filters);

    const endpoint = `${CHARACTERS_BASE_URL}?page=${page}${
      filtersQuery ? `&${filtersQuery}` : ''
    }`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(
        `Error while fetching data, ${response.status} ${response.statusText}`
      );
    }
    const data = (await response.json()) as ApiPaginatedResponse<Character>;

    return {
      data: data.results,
      meta: data.info,
    } as PaginatedResponse<Character>;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(error as string);
    }
  }
}

export async function getCharacter(id: number) {
  try {
    const endpoint = `${CHARACTERS_BASE_URL}/${id}`;
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(
        `Error while fetching data, ${response.status} ${response.statusText}`
      );
    }
    return (await response.json()) as Character;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(error as string);
    }
  }
}
