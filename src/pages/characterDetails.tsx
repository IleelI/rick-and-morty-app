import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getCharacter } from '../services/rickAndMorty/rickAndMorty';

const SEASON_LENGTH = 10;

function CharactersDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const parsedId = !id || isNaN(parseInt(id ?? '')) ? -1 : parseInt(id);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['get-character-details'],
    queryFn: () => getCharacter(parsedId),
    enabled: !!id,
    retry: 2,
  });

  const episodes = useMemo(
    () =>
      data?.episode.map((episode) =>
        parseInt(
          episode
            .replaceAll('https://rickandmortyapi.com/api/episode', '')
            .replaceAll('/', ' ')
        )
      ) ?? [],
    [data]
  );
  const episodesWithSeason = useMemo(
    () =>
      episodes?.map((episode) => ({
        episode:
          episode % SEASON_LENGTH === 0
            ? SEASON_LENGTH
            : episode % SEASON_LENGTH,
        season:
          episode % SEASON_LENGTH === 0
            ? episode / SEASON_LENGTH
            : Math.floor(episode / SEASON_LENGTH) + 1,
      })) ?? [],
    [episodes]
  );
  const seasonsWithEpisodes: Array<{ season: number; episodes: number[] }> =
    useMemo(
      () =>
        Object.values(
          episodesWithSeason?.reduce(
            (seasonWithEpisodes, { season, episode }) => {
              const existing = (seasonWithEpisodes[`season-${season}`] ??= {
                season,
                episodes: [],
              });
              existing.episodes.push(episode);
              return seasonWithEpisodes;
            },
            {}
          )
        ),
      [episodesWithSeason]
    );

  console.log(seasonsWithEpisodes);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error while getting character details</p>;
  }
  const characterData = data!;

  return (
    <main className="flex flex-[2] flex-col items-center">
      <article className="flex flex-col gap-8">
        <section className="flex gap-8">
          <img
            src={characterData.image}
            alt={`Image of ${characterData.name}`}
            className="rounded-2xl w-64 h-64 border-2 border-gray-300"
          />
          <div className="flex flex-col gap-2">
            <header>
              <h1 className="text-3xl text-gray-200 font-medium">
                {characterData.name}
              </h1>
              <h2 className="text-lg text-gray-300">
                Origin: {characterData.origin.name}
              </h2>
            </header>
            <div>
              <h3 className="text-xl font-medium text-gray-200">Details:</h3>
              <ul>
                <li className="text-gray-300">
                  Gender: {characterData.gender}
                </li>
                <li className="text-gray-300">
                  Species: {characterData.species}
                </li>
                <li className="text-gray-300">
                  Status: {characterData.status}
                </li>
                <li className="text-gray-300">
                  Location: {characterData.location.name}
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-4">
          <div className="col-span-2 flex flex-col gap-2">
            <h1 className="text-xl font-medium text-gray-200">Appears on:</h1>
            <ul className="grid grid-cols-2 grid-flow-row gap-4">
              {seasonsWithEpisodes.map(({ season, episodes }) => (
                <li key={`season-${season}`} className="text-lg text-gray-200">
                  Season {season}
                  <ul className="flex gap-1 flex-wrap">
                    {episodes.map((episode, index, array) => (
                      <li
                        key={`episode-${episode}`}
                        className="text-sm text-gray-300"
                      >
                        {episode}
                        {index === array.length - 1 ? '' : ','}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
    </main>
  );
}

export default CharactersDetailsPage;
