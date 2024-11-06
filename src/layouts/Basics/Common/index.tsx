import settings from '@/settings';
import { getImageUrl, isNetworkUrl } from '@/utils';

const { title, logo, appList, isTopNotice } = settings;

export default {
  title,

  logo: <img src={isNetworkUrl(logo) ? logo : getImageUrl(logo || 'image/logo.png')} alt="logo" />,

  token: {
    header: {
      heightLayoutHeader: isTopNotice ? 108 : void 0
    }
  },

  appList

};
