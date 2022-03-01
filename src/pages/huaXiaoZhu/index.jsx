import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";

import { history } from '@tarojs/router'
const bannerImg = require("../../assets/banner/banner4.jpg")
const mapStateToProps = (state)=>{
  const { home } = state
  const { userId } = home
  return {
    userId
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  componentDidMount(){
    
  }

  onRedClick = () =>{
    const { userId } = this.props
    const { path } = getCurrentInstance()?.router || {};
    if(!userId){
      let url = 'pages/login/index?oldUrl=' + path
      Taro.navigateTo({
        url
      })
    }else{
      let url = "https://activity01.yunzhanxinxi.com/link/442716629117e2144d5eaec13352fb14"
      window.location.href = url
    }
  }
  

  render () {
    const title = '花小猪'
    return (
      <View className='eLeMe'>
        <View className='eLeMeTop'>
          {title}
        </View>
        <Image className='eLeMeMid' src={bannerImg}></Image>

        <View className='eLeMeBtn' onClick={() => this.onRedClick()}>
          领红包打车
          {/* <a href="https://activity01.yunzhanxinxi.com/link/442716629117e2144d5eaec13352fb14" className='redText'>领红包打车</a> */}
        </View>
      </View>
    )
  }
}
