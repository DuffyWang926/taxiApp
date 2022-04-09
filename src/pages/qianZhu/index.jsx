import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";

import { history } from '@tarojs/router'
import getUrlCode from "../../utils/getUrlCode";
import {
  postLogin,
  recordTime
} from "../../actions/home";
import BuyBtn from '../../components/BuyBtn'
const bannerImg = require("../../assets/banner/banner8.png")
const mapStateToProps = (state)=>{
  const { home } = state
  const { userId } = home
  return {
    userId
  }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    postLogin:(payload)=>{
      dispatch(postLogin(payload));
    },
    recordTime:(payload)=>{
      dispatch(recordTime(payload));
    },
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  componentDidMount(){
    let url = window.location.href
    let code = getUrlCode(url)
    if(code){
      this.props.postLogin({code})
    }
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
      let clickTime = new Date().getTime() + ''
      this.props.recordTime({userId, clickTime})
      let url = "https://activity01.yunzhanxinxi.com/link/eb45c1a0c7f552f2cf6d984dc4e7fdea"
      window.location.href = url
    }
    
  }

  

  render () {
    const title = '千猪电影'
    const btnProps = {
      msg:'公众号下单享优惠',
      url:"https://activity01.yunzhanxinxi.com/link/426441e5060dafbf0a675c0c19a3b74a"
    }
    return (
      <View className='eLeMe'>
        <View className='eLeMeTop'>
          {title}
        </View>
        <Image className='pageBanner' src={bannerImg}></Image>
        <BuyBtn data={btnProps} />
      </View>
    )
  }
}
