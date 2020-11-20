/* eslint-disable react/destructuring-assignment */
import Taro, { FC } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import classNames from 'classnames';
import { CommonEventFunction } from '@tarojs/components/types/common';
import './index.scss';

type openType = 'contact' | 'share' | 'getPhoneNumber' | 'getUserInfo' | 'launchApp' | 'openSetting' | 'feedback';

interface Props {
  /** 类型 */
  type?: 'primary' | 'seconde';
  /** 尺寸 */
  size?: 'medium' | 'small' | 'mini';
  /** 是否朴素按钮 */
  plain?: boolean;
  /** 是否圆角按钮 */
  round?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否块按钮 */
  block?: boolean;
  children: JSX.Element | string;
  openType?: openType;
  onGetUserInfo?: CommonEventFunction;
  onGetPhoneNumber?: CommonEventFunction;
  onOpenSetting?: CommonEventFunction;
  onError?: CommonEventFunction;
  onContact?: CommonEventFunction;
  onLaunchapp?: CommonEventFunction;
}

const Index: FC<Props> = (props: Props) => {
  const {
    type,
    size,
    plain,
    round,
    disabled,
    block,
    openType,
    onGetUserInfo,
    onGetPhoneNumber,
    onOpenSetting,
    onError,
    onContact,
    onLaunchapp,
  } = props;

  return (
    <View
      className={classNames({
        button: true,
        [`${size}`]: size,
        plain,
        round,
        disabled,
        block,
        [`button-${type}`]: type,
      })}
    >
      <Button
        openType={openType}
        onGetUserInfo={onGetUserInfo}
        onGetPhoneNumber={onGetPhoneNumber}
        onOpenSetting={onOpenSetting}
        onError={onError}
        onContact={onContact}
        onLaunchapp={onLaunchapp}
      >
        {props.children}
      </Button>
    </View>
  );
};

Index.externalClasses = ['my-class'];

export default Index;
