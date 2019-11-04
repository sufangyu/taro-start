import { ComponentType } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';

type Props = {
  count: number;
  onMinus?(): void;
}

type State = {}

interface Index {
  props: Props;
  state: State;
}

class Index extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: '',
  }

  static defaultProps: Props = {
    count: 0,
    onMinus: () => {},
  }

  constructor(props: Props) {
    super(props);

    this.state = {} as State;
  }

  [x: string]: any;

  render(): object {
    const { count, onMinus } = this.props;

    return (
      <View className="container">
        <View>
          <Button
            size="mini"
            onClick={() => {
              onMinus!();
            }}
          >
            点击累减
          </Button>
          <Text>{count}</Text>
        </View>
      </View>
    );
  }
}

export default Index as ComponentType<Props>;
