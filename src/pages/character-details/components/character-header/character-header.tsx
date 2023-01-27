import { Character } from '@/services/rickAndMorty/types';

type Props = {
  data?: Character;
};
function CharacterHeader({ data }: Props) {
  if (!data) return null;
  const { image, name, origin } = data;
  return (
    <header className="flex flex-col gap-2 items-center">
      <img
        src={image}
        alt={`Image of ${name}`}
        className="w-1/2 aspect-square rounded-full border border-gray-50"
      />
      <div className="text-center">
        <h1 className="text-2xl font-medium">{name}</h1>
        <h2 className="text-sm text-gray-400">Origin: {origin.name}</h2>
      </div>
    </header>
  );
}

export default CharacterHeader;
