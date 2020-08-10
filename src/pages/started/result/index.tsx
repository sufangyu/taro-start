import Taro, { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { Result } from '@/components';
import './index.scss';


const Index: FC = () => {
  return (
    <View className="container container-gray">
      <Result
        type="success"
        title="验证成功"
        message="所提交内容已成功完成验证"
      />
      
      <Result
        type="fail"
        title="支付失败"
        message="所选银行卡余额不足"
      />

      <Result
        type="warning"
        title="无法完成操作"
        message="由于你的账户还未绑定, 由于你的账户还未绑定, 由于你的账户还未绑定, 请登请登录www.baidu.com"
      />

      <Result
        imgUrl="https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg"
        title="支付成功"
        message="实价: 998.00元, 原价: 1098元"
      />
    </View>
  );
};

Index.config = {
  navigationBarTitleText: '结果页',
};
