import { inject } from '@tarojs/mobx';
import { gotoLoginPage } from '@/router';

interface IProps {
  /**
   * 用户信息
   *
   * @type {object}
   */
  accountStore: object;
}

interface IState {}

// 需要检验登录的生命周期
const LIFE_CYCLE_MAP = ['willMount', 'didMount', 'didShow'];


/**
 * 加载页面前 检查是否登录
 *
 * @param {string} [lifecycle='willMount'] 生命周期
 * @returns
 */
function withLoign(lifecycle: string = 'willMount') {
  // 异常规避提醒
  if (!LIFE_CYCLE_MAP.includes(lifecycle)) {
    console.warn(`传入的生命周期不存在, ${lifecycle}`);
    return (Component: any) => Component;
  }

  return function withLoginComponent(Component: any) {
    @inject('accountStore')
    class WithLogin extends Component<IProps, IState> {
      async componentWillMount() {
        if (super.componentWillMount) {
          if (lifecycle === LIFE_CYCLE_MAP[0]) {
            const res = await this.checkLogin();
            if (!res) return;
          }

          super.componentWillMount();
        }
      }

      async componentDidMount() {
        if (super.componentDidMount) {
          if (lifecycle === LIFE_CYCLE_MAP[1]) {
            const res = await this.checkLogin();
            if (!res) return;
          }

          super.componentDidMount();
        }
      }

      async componentDidShow() {
        if (super.componentDidShow) {
          if (lifecycle === LIFE_CYCLE_MAP[2]) {
            const res = await this.checkLogin();
            if (!res) return;
          }

          super.componentDidShow();
        }
      }

      private checkLogin() {
        const { accountStore: { account } } = this.props;
        if (!account) {
          const mode = 'replace';
          return gotoLoginPage(mode);
        }

        return account;
      }

      render() {
        return super.render();
      }
    }

    return WithLogin;
  };
}

export default withLoign;
