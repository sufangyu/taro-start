import Taro from '@tarojs/taro';
import { inject } from '@tarojs/mobx';
import { gotoPage, PATH_CONFIG } from '@/router';

let currentTime = Date.now();
let lastTime = Date.now();

interface IProps {
  switchEnvStore: object;
}

function switchEnv() {
  return function switchEnvComponent(Component: any) {
    @inject('switchEnvStore')
    class SwitchEnv extends Component<IProps, {}> {
      /**
       * 显示切换环境控件的动作
       *
       * @memberof SwitchEnv
       */
      handleShowSwitchEnvAction() {
        const { switchEnvStore } = this.props;
        const { isShowed, counter, limitCounter } = switchEnvStore;

        if (isShowed || counter >= limitCounter) {
          // 已经达到显示条件
          Taro.showToast({
            title: '当前已可以切换环境',
            icon: 'none',
          });

          switchEnvStore.setShowSwitchEnv();
          return;
        }

        // 累加点击次数
        currentTime = Date.now();
        if (currentTime - lastTime < 500) {
          Taro.showToast({
            title: `还差${limitCounter - counter}步才能切换环境`,
            icon: 'none',
          });
          switchEnvStore.increment();
        }
        lastTime = currentTime;
      }

      /**
       * 关闭 显示环境切换
       *
       * @memberof SwitchEnv
       */
      handleCloseSwitchEnv() {
        const { switchEnvStore } = this.props;

        Taro.showModal({
          title: '提示',
          content: '关闭成功, 请关闭小程序重进',
          showCancel: false,
        });

        switchEnvStore.resetEnv();
      }

      /**
       * 跳转 切换环境页面
       *
       * @memberof SwitchEnv
       */
      goToSwitchEnvPage() {
        gotoPage({
          url: PATH_CONFIG.debug.env,
        });
      }
    }

    return SwitchEnv as typeof Component;
  };
}

export default switchEnv;
