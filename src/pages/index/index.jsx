import { Component } from 'react'
import { View, Text } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        {/* <Text onClick={() => {
          console.log('this')
        }}>Hello world!</Text> */}


      </View>
    )
  }
}
