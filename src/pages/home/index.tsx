import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';
import { gotoPage, PATH_CONFIG } from '@/router';
import { IAccountStore } from '@/store/account';
import withLogin from '@/decorators/with-login';

import './index.scss';

interface Props {
  accountStore?: IAccountStore;
}
interface State {}

interface Index {
  props: Props;
  state: State;
}

@withLogin()
@inject('globalStore', 'accountStore')
@observer
class Index extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: '首页',
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillReact() {}

  render() {
    const { accountStore } = this.props;

    return (
      <View className="container">
        <View className="test-content">
          <Text>Home page</Text>
          {
            accountStore!.logged === 'NO'
              ? (
                <Button
                  onClick={() => {
                    const { params } = this.$router;
                    gotoPage({
                      url: PATH_CONFIG.account.login,
                      query: params,
                      mode: 'replace',
                    });
                  }}
                >
                  立即登录
                </Button>
              )
              : null
          }
        </View>
      </View>
    );
  }
}

export default Index as ComponentType<Props>;
