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
      <Button onClick={onLogout}>退出</Button>
    </div>
  );
}
