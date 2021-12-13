import { Component } from 'react'
import { View, Text } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  getHomeDetail,
} from "../../actions/home";
const mapStateToProps = (state)=>{
  const { home } = state
  const { name } = home
    return {
      name,
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    getHomeDetail:(payload)=>{
      dispatch(getHomeDetail(payload));
    }
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  clickTest = () =>{
    console.log(this)
    this.props.getHomeDetail({name:'222'})
  }

  render () {
    return (
      <View className='index'>
        <Text onClick={() => this.clickTest()}>Hello world!</Text>
        <Text >{this.props.name}</Text>
      </View>
    )
  }
}
