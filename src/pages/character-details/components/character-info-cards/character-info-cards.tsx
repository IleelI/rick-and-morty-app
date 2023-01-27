import { Character } from '@/services/rickAndMorty/types';
import { useMemo } from 'react';

export type CharacterInfoCard = {
  title: string;
  value: string;
};

type Props = {
  data?: Character;
};
function CharacterInfoCards({ data }: Props) {
  const infoCards: CharacterInfoCard[] = useMemo(
    () => [
      {
        title: 'Gender',
        value: data?.gender ?? '',
      },
      {
        title: 'Species',
        value: data?.species ?? '',
      },
      {
        title: 'Status',
        value: data?.status ?? '',
      },
      {
        title: 'Location',
        value: data?.location.name ?? '',
      },
    ],
    [data?.gender, data?.species, data?.status, data?.location.name]
  );

  return (
    <section className="flex flex-col gap-2">
      <h1 className="text-gray-100 text-xl font-semibold">Character info</h1>
      <ul className="gap-4 grid grid-cols-2 auto-rows-fr">
        {infoCards.map(({ title, value }) => (
          <li
            key={title}
            className="p-4 gap-0.5 flex flex-col items-center justify-center rounded-md text-center bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <p className="text-gray-400 text-xs ">{title}</p>
            <p className="text-gray-200 font-medium">{value}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CharacterInfoCards;
