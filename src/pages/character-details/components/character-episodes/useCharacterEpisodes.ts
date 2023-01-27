import usePagination from '@/hooks/usePagination';
import { pluralize } from '@/utils/string';
import { useMemo } from 'react';
import { getSeasonsWithEpisodes } from './helpers';

export default function useCharacterEpisodes(episodes?: string[]) {
  const pagination = usePagination();
  const seasonsWithEpisodes = useMemo(
    () => getSeasonsWithEpisodes(episodes),
    [episodes]
  );
  const hasPrevPage = pagination.currentPage > 1;
  const hasNextPage = pagination.currentPage < seasonsWithEpisodes.length;

  const currentSeason = seasonsWithEpisodes[pagination.currentPage - 1];
  const episodesCount = currentSeason.episodes.length;
  const episodesLabel = pluralize(
    currentSeason.episodes.length,
    'Episode',
    's:'
  );
  const showPagination = episodesCount > 1;

  return {
    seasonsWithEpisodes,
    pagination,
    showPagination,
    hasPrevPage,
    hasNextPage,
    currentSeason,
    episodesCount,
    episodesLabel,
  };
}
