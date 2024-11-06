import { Button } from 'antd';
import { useFetcher } from 'react-router-dom';

import './index.scss';
import { useAppStore, useSelector, useSettings } from '@/store';

export default function Home() {

  const fetcher = useFetcher();

  const { SET_LOADING } = useSettings(useSelector(['SET_LOADING']));
  const { SET_USER_INFO } = useAppStore(useSelector(['SET_USER_INFO']));

  function onLogout() {
    fetcher.submit(null, { action: '/logout', method: 'post' });
  }

  function onLoading() {
    SET_LOADING(true);
    SET_USER_INFO();

    setTimeout(() => {
      SET_LOADING(false);
    }, 1000);
  }

  return (
    <div className="Home-ka3tvs">
      Home
      <Button onClick={onLogout}>退出</Button>

      <Button type="primary" onClick={onLoading}>加载...</Button>
    </div>
  );
}
