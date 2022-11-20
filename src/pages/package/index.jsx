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
import FootBuy from '../../components/FootBuy'
import OrderTipCom from '../../components/OrderTipCom'
const bannerImgA = require("../../assets/banner/banner10.png")
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
    const title = '快递'
    const btnProps = {
      msg:'领券寄快递4元起',
      url:"https://activity01.yunzhanxinxi.com/link/ba7013034b7d7baa97b6177d98f316c2"
    }
    const bannerList = [
      bannerImgA,
    ]
    const bannerListCom = Array.isArray(bannerList) && bannerList.map( (v,i) =>{
      let res = (<SwiperItem key='SwiperItem1' key={i + 'swiperItem'} >
                  <Image src={v} className='pageSwiperHeightImg' ></Image>
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
