import { Button } from 'antd';
import { useFetcher } from 'react-router-dom';

import './index.scss';

export default function Home() {

  const fetcher = useFetcher();

  function onLogout() {
    fetcher.submit(null, { action: '/logout', method: 'post' });
  }

  return (
    <div className="Home-ka3tvs">
      Home
      <div className="button">scss</div>

      <div className="w-52 h-24 rounded-2xl bg-pink-300 mt-4">tailwind</div>

      <Button onClick={onLogout}>退出</Button>
    </div>
  );
}
