import { Button } from 'antd';
import { useFetcher } from 'react-router-dom';

export default function Home() {

  const fetcher = useFetcher();

  function onLogout() {
    fetcher.submit(null, { action: '/logout', method: 'post' });
  }

  return (
    <div>
      Home
      logo
      <Button onClick={onLogout}>退出</Button>
    </div>
  );
}
