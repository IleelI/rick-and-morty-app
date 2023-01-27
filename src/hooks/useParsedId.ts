import { useParams } from 'react-router-dom';

export default function useParsedId() {
  const { id } = useParams<{ id: string }>();
  const parsedId = !id || isNaN(parseInt(id ?? '')) ? -1 : parseInt(id);
  return parsedId;
}
