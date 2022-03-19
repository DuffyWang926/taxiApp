import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'

import { View, Input, Image } from '@tarojs/components'
import './index.scss'
import { connect } from "../../utils/connect";
import {
  getCodeImg

} from "../../actions/mine";
const mapStateToProps = (state)=>{
  const { mine } = state
  const { imgData } = mine
  return {
    imgData
  }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    getCodeImg:(payload)=>{
      dispatch(getCodeImg(payload));
    },
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  constructor(){
    super()
    
  }
  componentDidMount(){
    debugger
    this.props.getCodeImg()
  }


  render () {
    const { imgData } =this.props
    
    return (
      <View className='share'>
        <View className='shareTop'>
         用微信扫二维码即可
        </View>
        <View className='shareCon'>
          {imgData}
        </View>
      </View>
    )
  }
}
