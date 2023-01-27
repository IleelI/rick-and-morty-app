import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="min-h-screen w-full max-w-screen-xl p-8 mx-auto flex flex-col overflow-hidden">
      <Outlet />
    </div>
  );
}
