import HomeButton from '@/components/home-button/home-button';
import useParsedId from '@/hooks/useParsedId';
import { getCharacter } from '@/services/rickAndMorty/rickAndMorty';
import { useQuery } from 'react-query';
import CharacterEpisodes from './components/character-episodes/character-episodes';
import CharacterHeader from './components/character-header/character-header';
import CharacterInfoCards from './components/character-info-cards/character-info-cards';

function CharactersDetailsPage() {
  const id = useParsedId();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['get-character-details', id],
    queryFn: () => getCharacter(id),
    enabled: !!id,
  });

  const showError = !isLoading && isError;
  const showData = !isLoading && !isError;
  return (
    <main className="flex flex-[2] flex-col items-center">
      <article className="grid grid-cols-1 grid-flow-row gap-4 p-4 sm:gap-8 sm:p-8 w-full max-w-md rounded-xl bg-gray-800">
        <HomeButton />
        {isLoading && <p>Loading...</p>}
        {showError && (
          <p className="text-red-400">Error while getting character details.</p>
        )}
        {showData && (
          <>
            <CharacterHeader data={data} />
            <CharacterInfoCards data={data} />
            <CharacterEpisodes data={data} />
          </>
        )}
      </article>
    </main>
  );
}

export default CharactersDetailsPage;
