import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './index.scss'


interface IMenus {
  /**
   * 名称
   */
  labbel: string,
  /**
   * 路径
   */
  path: string,
}

interface IProps {} 

interface IState {
  /**
   * 导航菜单
   */
  menus: Array<IMenus>,
}

interface Tutorials {
  props: IProps;
  state: IState;
}

class Tutorials extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: 'State & Props'
  }

  state: IState = {
    menus: [
      { labbel: 'State & Props', path: '/started/state-props' },
    ],
  }

  componentWillMount () { }

  componentWillReact () {}

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { menus } = this.state
    console.log(menus);

    return (
      <View className='container'>
        <Text>counter</Text>
      </View>
    )
  }
}

export default Tutorials  as ComponentType
