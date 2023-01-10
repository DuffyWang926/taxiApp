import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";

import { history } from '@tarojs/router'
import {parseUrl} from "../../utils/getUrlCode";
import {
  postLogin,
  recordTime
} from "../../actions/home";
import BuyBtn from '../../components/BuyBtn'
const xingBaKeImg = require("../../assets/banner/banner6.png")
const qianZhuImg = require("../../assets/banner/banner8.png")
const packageImg = require("../../assets/banner/banner10.png")
const ruiXingImg = require("../../assets/banner/banner11.png")
const kenDeJiImg = require("../../assets/banner/banner5.png")
const dianFeiImg = require("../../assets/banner/banner7.jpg")
const diDiImg = require("../../assets/banner/banner3.png")
const huaXiaoZhuImg = require("../../assets/banner/banner4.jpg")
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
  constructor(props){
    super(props)
    this.state={}
  }

  componentDidMount(){
    let url = window.location.href
    let {type,code} = parseUrl(url)
    let temp = {}
    if(code){
      this.props.postLogin({code})
    }
    
    if(false){

    
    }else if(type == 3){
      temp ={
        title:'滴滴',
        msg:'领红包打车',
        url:"https://activity01.yunzhanxinxi.com/link/6dfca0bd3c0f799d36b2666973e1c42b",
        bannerImg:diDiImg
      }
    }else if(type == 4){
      temp ={
        title:'花小猪',
        msg:'领红包打车',
        url:"https://activity01.yunzhanxinxi.com/link/442716629117e2144d5eaec13352fb14",
        bannerImg:huaXiaoZhuImg
      }
    }else if(type == 5){
      temp ={
        title:'星巴克',
        msg:'公众号下单享优惠',
        url:"https://activity01.yunzhanxinxi.com/link/7e78214436bc2ad8de16ccdef393201c",
        bannerImg:xingBaKeImg
      }
    }else if(type == 6){
      temp ={
        title:'肯德基',
        msg:'公众号下单享优惠',
        url:"https://activity01.yunzhanxinxi.com/link/8b8d5aae462ed623c5348f694dd95e5b",
        bannerImg:kenDeJiImg
      }
    }else if(type == 7){
      temp ={
        title:'千猪电影',
        msg:'公众号下单享优惠',
        url:"https://activity01.yunzhanxinxi.com/link/f073d89bcebb3941f5c0aad60ec914ef",
        bannerImg:qianZhuImg
      }
    }else if(type == 8){
      temp ={
        title:'充电费',
        msg:'公众号下单享优惠',
        url:"https://activity01.yunzhanxinxi.com/link/68b1e80d30b996baea1acb9200ec5b01",
        bannerImg:dianFeiImg
      }
    }else if(type == 10){
      temp ={
        title:'快递',
        msg:'领券寄快递4元起',
        url:"https://activity01.yunzhanxinxi.com/link/ba7013034b7d7baa97b6177d98f316c2",
        bannerImg:packageImg
      }

    }else if(type == 11){
      temp ={
        title:'瑞幸咖啡',
        msg:'公众号下单享优惠',
        url:"https://activity01.yunzhanxinxi.com/link/d6dd12380c192c4649a41c92c8bb902f",
        bannerImg:ruiXingImg
      }
    }
    
    this.setState(temp)
  }

  render () {
    const { title,msg,url,bannerImg} = this.state
    const btnProps = {
      msg,
      url
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
