import { Outlet } from 'react-router-dom';

export default function Home3() {
  return (
    <div>
      Home3

      <div>
          子页面
        <Outlet />
      </div>
    </div>
  );
}
