import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Input, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import getUrlCode from "../../utils/getUrlCode";
import {
  postLogin,
} from "../../actions/home";
import {
  getGoods,
} from "../../actions/jingDong";
const bannerImg = require("../../assets/banner/banner1.png")
const mapStateToProps = (state)=>{
  const { home, jingDong } = state
  const { userId } = home
  const { getGoodsParams, goodsList, getGoodsUrlParams, goodsUrlList } = jingDong


  return {
    userId,
    getGoodsParams,
    getGoodsUrlParams,
    goodsList,
    goodsUrlList
  }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    postLogin:(payload)=>{
      dispatch(postLogin(payload));
    },
    getGoods:(payload)=>{
      dispatch(getGoods(payload));
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
    this.initData()
    
  }
  initData = async ()=>{
    const { getGoodsParams, getGoodsUrlParams } = this.props
    debugger
    await this.props.getGoods(getGoodsParams)
    // debugger

    // await this.props.getGoods(getGoodsUrlParams)

  }
  onGoodClick = (v,i) =>{
    const { goodsUrlList } = this.props
    const { buyUrl, couponUrl } = v || {}
    let url = ''
    if(couponUrl){
      url = couponUrl
    }else if(buyUrl){
      url = buyUrl
    }else{ 
      let item = goodsUrlList[i]
      const { buyUrl, couponUrl } = item || {}
      if(couponUrl){
        url = couponUrl
      }else if(buyUrl){
        url = buyUrl
      }
    }
    debugger
    window.location.href = url
  }


  

  

  render () {
    const { goodsList } = this.props
    const title = '京东'
    let goodsNode = Array.isArray(goodsList) && goodsList.map( (v,i) =>{
      const {
        
        imgSrc,
        price,
        returnMoney,
        returnRate,
        shop,
        title,
      } = v
      let res = (
        <View className='goodsItem' key={i + 'jingdong'} onClick={() => this.onGoodClick(v,i)}>
          <View className='goodImgBox'>
            <Image src={imgSrc} className='goodImg' ></Image>
          </View>
          <View className='goodTitle'>
            {title}
          </View>
          <View className='goodPrice'>
            ￥{price}
          </View>
          <View className='goodShop'>
            {shop}
          </View>
          <View className='goodReturn'>
            赚 ￥<span className='goodReturnMoney'>{returnMoney}</span>
          </View>
        </View>
      )
      return res
    })
    return (
      <View className='jingDong'>
        <View className='jingDongTopBox'>
          <View className='jingDongTop'>
            {title}
          </View>
          <View className='searchBox'>
            <Input className='searchInput'/>
            <View className='searchBtn'>
              搜索
            </View>
          </View>
        </View>
        <View className='goodsBox'>
          {goodsNode}
        </View>
      </View>
    )
  }
}
