import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/router';

type Props = {
  label?: string;
};
function HomeButton({ label = 'Home' }: Props) {
  return (
    <Link
      to={ROUTE_PATHS.HOME}
      className="underline underline-offset-2 text-gray-400 hover:text-blue-400 transition-colors"
    >
      {label}
    </Link>
  );
}

export default HomeButton;
