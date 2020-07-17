import Taro, { FC } from '@tarojs/taro';
import {
  View, Input, Label, Button,
} from '@tarojs/components';
import { useInput } from '@/hooks';
import Verification from '@/utils/verification';

import './index.scss';

const Index: FC = () => {
  const [name, setName] = useInput('');
  const [others, setOthers] = useInput({
    password: '',
    mobile: '',
    age: '',
  });

  function handleSubmit() {
    const { password, mobile } = others;
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

      return;
    }

    console.log('验证通过');
  }

  return (
    <View className="container">
      <View className="form-item">
        <Label>账号：</Label>
        <Input
          value={name}
          onInput={(e) => setName(e)}
        />
      </View>

      <View className="form-item">
        <Label>密码：</Label>
        <Input
          password
          value={others.password}
          onInput={(e) => setOthers(e, 'password')}
        />
      </View>

      <View className="form-item">
        <Label>手机号：</Label>
        <Input
          value={others.mobile}
          onInput={(e) => setOthers(e, 'mobile')}
        />
      </View>

      <View className="form-item">
        <Label>年龄：</Label>
        <Input
          value={others.age}
          type="digit"
          onInput={(e) => {
            return setOthers(e, 'age', (val: number) => {
              return val > 18 ? 18 : val;
            });
          }}
        />
      </View>

      <View className="form-actions">
        <Button
          type="primary"
          onClick={() => {
            handleSubmit();
          }}
        >
          提交
        </Button>
      </View>
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '表单校验',
};
