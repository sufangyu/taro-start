import Taro, { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { ITouchEvent } from '@tarojs/components/types/common';
import classNames from 'classnames';
import './index.scss';

interface Props {
  /** 元素的标题 */
  title?: string | JSX.Element;
  /** 是否展示元素 */
  isOpened?: boolean;
  /** 取消按钮的内容 */
  cancelText?: string;
  /** 子元素 */
  children?: JSX.Element | JSX.Element[];
  /** 取消按钮触发的事件 */
  onCancel?: () => void;
  /** 关闭触发的事件 */
  onClose?: () => void;
}

const Index: FC<Props> = (props: Props) => {
  const {
    title,
    isOpened,
    cancelText,
    onCancel,
    onClose,
  } = props;
  

  const rootClass = classNames({
    'fe-actionsheet': true,
    'fe-actionsheet--active': isOpened,
  });

  const close = () => {
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  /** 关闭操作 */
  const handleClose = () => {
    close();
  };

  /** 取消操作 */
  const handleCancel = () => {
    if (typeof onCancel === 'function') {
      onCancel();
    }
    close();
  };

  const handleTouchMove = (ev: ITouchEvent) => {
    ev!.stopPropagation();
    ev!.preventDefault();
  };

  return (
    <View
      className={rootClass}
      onTouchMove={handleTouchMove}
    >
      <View
        className="fe-actionsheet__overlay"
        onClick={handleClose}
      />
      <View className="fe-actionsheet__container">
        {
          title && <View className="fe-actionsheet__header">{title}</View>
        }
        <View className="fe-actionsheet__body">
          {
            // eslint-disable-next-line react/destructuring-assignment
            props.children
          }
        </View>
        <View
          className="fe-actionsheet__footer"
          onClick={handleCancel}
        >
          {cancelText}
        </View>
      </View>
    </View>
  );
};

Index.defaultProps = {
  title: '',
  isOpened: false,
  cancelText: '取消',
  onCancel: () => {},
  onClose: () => {},
};

export default Index;
