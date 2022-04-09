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
import OrderTipCom from '../../components/OrderTipCom'
const bannerImgA = require("../../assets/banner/banner2.png")
const bannerImgB = require("../../assets/meiTuan/banner1.jpg")
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

 

  render () {
    const title = '美团'
    const btnProps = {
      msg:'领红包点外卖',
      url:"https://activity01.yunzhanxinxi.com/link/426441e5060dafbf0a675c0c19a3b74a"
    }
    const bannerList = [
      bannerImgA,
      bannerImgB

    ]
    const bannerListCom = Array.isArray(bannerList) && bannerList.map( (v,i) =>{
      let res = (<SwiperItem key='SwiperItem1' key={i + 'swiperItem'} >
                  <Image src={v} className='pageSwiperImg' ></Image>
                </SwiperItem>)
      return res
    })
    return (
      <View className='meiTuanPage'>
        <View className='pageTitle'>
          {title}
        </View>
        <Swiper
          className='pageSwiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
          autoplay
          >
          {bannerListCom}
        </Swiper>
        <OrderTipCom />
        <BuyBtn data={btnProps} />
      </View>
    )
  }
}
