import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import { gotoPage } from '../../../router'
import PATH_CONFIG from '../../../router/path'

import './index.scss'


interface IPage {
  /**
   * 名称
   */
  label?: string,
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
  menus: Array<IPage>,
}

interface Started {
  props: IProps;
  state: IState;
}

class Started extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '入门'
  }

  state: IState = {
    menus: [
      { label: 'State & Props', path: PATH_CONFIG.started.stateProps },
      { label: '事件处理', path: PATH_CONFIG.started.event },
    ],
  }

  componentWillMount () { }

  componentWillReact () {}

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleGotoPage(page: IPage) {
    console.log(page);
    gotoPage({
      url: page.path,
    });
  }

  render () {
    const { menus } = this.state
    console.log(menus);

    return (
      <View className='container'>
        <View className='page-title'>入门教程</View>
        <View className='menu'>
          {
            menus.map((item, idx) => {
              return (
                <View
                  className='menu-item'
                  key={idx}
                  onClick={() => this.handleGotoPage(item)}
                >
                  {item.label}
                </View>
              );
            })
          }
        </View>
      </View>
    )
  }
}

export default Started  as ComponentType
