import Pagination from '@/components/pagination/pagination';
import { Character } from '@/services/rickAndMorty/types';
import useCharacterEpisodes from './useCharacterEpisodes';

type Props = {
  data?: Character;
};
function CharacterEpisodes({ data }: Props) {
  const {
    seasonsWithEpisodes,
    currentSeason,
    episodesCount,
    episodesLabel,
    pagination,
    showPagination,
    hasPrevPage,
    hasNextPage,
  } = useCharacterEpisodes(data?.episode);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-xl text-gray-100 font-semibold">Appearances</h1>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 items-baseline">
          <h2 className="text-lg">Season {currentSeason.season}</h2>
          <h3 className="text-sm text-gray-400">({episodesCount})</h3>
        </div>
        <ul className="flex gap-1 flex-wrap items-center text-gray-300">
          {episodesLabel}
          {currentSeason.episodes.map((episode, index, array) => {
            const isLastItem = index === array.length - 1;
            const content = `${episode}${isLastItem ? '.' : ','}`;
            return <li key={`episode-${episode}`}>{content}</li>;
          })}
        </ul>
      </div>
      {showPagination && (
        <Pagination
          hideButtons
          pagination={pagination}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
          totalPages={seasonsWithEpisodes.length}
        />
      )}
    </section>
  );
}

export default CharacterEpisodes;
