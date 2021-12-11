import { Component } from 'react'
import { View, Text } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  getHomeDetail,
} from "../../actions/home";
@connect((state) => ({
  state,
}),
(dispatch) => ({
  getHomeDetail() {
    dispatch(getHomeDetail());
  }
  
}))
export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  clickTest = () =>{
    console.log('this')
  }

  

  render () {
    return (
      <View className='index'>
        <Text onClick={() => this.clickTest()}>Hello world!</Text>
        {/* <Text onClick={() => {
          console.log('this')
        }}>Hello world!</Text> */}


      </View>
    )
  }
}
