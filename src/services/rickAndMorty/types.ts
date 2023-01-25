export type Metadata = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

// Object type that will be returned from API call
export type ApiPaginatedResponse<T> = {
  info: Metadata;
  results: Array<T>;
};

// Object type that will be returned from API functions
export type PaginatedResponse<T> = {
  data: Array<T>;
  meta: Metadata;
};

export type RequestParams<T> = {
  page?: number;
  filters?: T;
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode: string[];
  url: string;
  created: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
};
export type CharacterFilters = {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
};
