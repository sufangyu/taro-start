import Taro from '@tarojs/taro';
import { inject } from '@tarojs/mobx';
import { ENV_MAP } from '@/config';

// const currentTime = Date.now();
// const lastTime = Date.now();

interface IProps {
  switchEnvStore: object,
}

function switchEnv() {
  return function switchEnvComponent(Component: any) {
    @inject('switchEnvStore')
    class SwitchEnv extends Component<IProps, {}> {
      /**
       * 显示切换环境控件 & 处理选择环境
       *
       * @memberof SwitchEnv
       */
      async handleShowSwitchEnv() {
        const { switchEnvStore } = this.props;
        switchEnvStore.showSwitchEnv();

        try {
          const { tapIndex } = await Taro.showActionSheet({
            itemList: ENV_MAP.map(item => item.name),
          });
          const env = ENV_MAP[tapIndex].value;

          switchEnvStore.setEnv(env);
          Taro.showModal({
            title: '提示',
            content: `已切换为${ENV_MAP[tapIndex].name}环境, 请关闭小程序重进`,
            showCancel: false,
          });
        } catch (error) {
          console.log(error);
        }
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
    }

    return SwitchEnv;
  };
}

export default switchEnv;
