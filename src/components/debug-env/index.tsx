import Taro, { FC } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { gotoPage, PATH_CONFIG } from '@/router';

import iconDebug from './icon-debug.png';
import './index.scss';

const Index: FC = () => {
  // 开发版: develop, 体验版: trial, 正式版: release
  // eslint-disable-next-line no-undef
  const { envVersion } = __wxConfig || { envVersion: 'release' };

  return (
    <View className="debug-env">
      {
        ['develop', 'trial'].includes(envVersion)
          ? (
            <Image
              src={iconDebug}
              className="debug-env-entry"
              onClick={() => {
                gotoPage({
                  url: PATH_CONFIG.debug.env,
                });
              }}
            />
          )
          : null
      }
    </View>
  );
};

export default Index;
