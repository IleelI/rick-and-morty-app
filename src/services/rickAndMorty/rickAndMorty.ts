import {
  Response,
  Character,
  RequestParams,
  ApiResponse,
  CharacterFilters,
} from './types';

const BASE_URL = 'https://rickandmortyapi.com/api';

const CHARACTERS_ENDPOINT = '/character';

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

    const url = `${BASE_URL}${CHARACTERS_ENDPOINT}?page=${page}&${filtersQuery}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Error while fetching data, ${response.status} ${response.statusText}`
      );
    }
    const data = (await response.json()) as ApiResponse<Character>;

    return {
      data: data.results,
      meta: data.info,
    } as Response<Character>;
  } catch (error) {
    return;
  }
}
