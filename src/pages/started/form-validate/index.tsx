import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import {
  View, Input, Label, Button,
} from '@tarojs/components';
import { observer, inject } from '@tarojs/mobx';

import Verification from '@/utils/verification';

import './index.scss';

interface Props {}

interface State {
  [key: string]: any;
}

interface Index {
  props: Props;
  state: State;
}

@inject('globalStore')
@observer
class Index extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: '',
  }

  static defaultProps: Props = {}

  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      mobile: '',
    } as State;
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleInput(e, key: string) {
    const { value } = e.detail;
    this.setState({
      [key]: value,
    });
  }

  handleSubmit() {
    const { name, password, mobile } = this.state;
    const verify = new Verification();
    verify.add(name, 'require', '账号不能为空');
    verify.add(password, [
      {
        type: 'require',
        msg: '请输入密码',
      },
      {
        type: 'minLength',
        minLen: 6,
        msg: '密码长度不符合要求',
      },
    ]);
    verify.add(mobile, [
      {
        type: 'require',
        msg: '手机号不能为空',
      },
      {
        type: 'validator',
        validator: (value: string) => {
          return /\d{11}/.test(value);
        },
        msg: '手机号格式不正确',
      },
    ]);

    const res = verify.result();
    if (!res) {
      Taro.showToast({
        title: verify.message,
        icon: 'none',
      });
    }
  }

  render() {
    const { name, password, mobile } = this.state;
    return (
      <View className="container">
        <View className="form-item">
          <Label>账号：</Label>
          <Input
            value={name}
            onInput={(e) => {
              this.handleInput(e, 'name');
            }}
          />
        </View>

        <View className="form-item">
          <Label>密码：</Label>
          <Input
            password
            value={password}
            onInput={(e) => {
              this.handleInput(e, 'password');
            }}
          />
        </View>

        <View className="form-item">
          <Label>手机号：</Label>
          <Input
            value={mobile}
            onInput={(e) => {
              this.handleInput(e, 'mobile');
            }}
          />
        </View>

        <View className="form-actions">
          <Button
            type="primary"
            onClick={() => {
              this.handleSubmit();
            }}
          >
            提交
          </Button>
        </View>
      </View>
    );
  }
}

export default Index as ComponentType<Props>;
