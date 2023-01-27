export const SEASON_LENGTH = 10;

export type SeasonWithEpisode = {
  season: number;
  episodes: number[];
};
export function getSeasonsWithEpisodes(
  episodes: string[] = []
): SeasonWithEpisode[] {
  const parsedEpisodes = episodes.map((episode) =>
    parseInt(
      episode
        .replaceAll('https://rickandmortyapi.com/api/episode', '')
        .replaceAll('/', ' ')
    )
  );

  const episodesWithSeason = parsedEpisodes.map((episode) => ({
    episode:
      episode % SEASON_LENGTH === 0 ? SEASON_LENGTH : episode % SEASON_LENGTH,
    season:
      episode % SEASON_LENGTH === 0
        ? episode / SEASON_LENGTH
        : Math.floor(episode / SEASON_LENGTH) + 1,
  }));

  const seasonsWithEpisodes: SeasonWithEpisode[] = Object.values(
    episodesWithSeason?.reduce((seasonWithEpisodes, { season, episode }) => {
      const existing = ((seasonWithEpisodes as any)[`season-${season}`] ??= {
        season,
        episodes: [],
      });
      existing.episodes.push(episode);
      return seasonWithEpisodes;
    }, {})
  );
  return seasonsWithEpisodes;
}
