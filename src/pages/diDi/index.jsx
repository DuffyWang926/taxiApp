import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  postProduct,
} from "../../actions/product";
import {
  postProductList,
} from "../../actions/productList";
import { history } from '@tarojs/router'
const bannerImg = require("../../assets/banner/banner3.png")
const mapStateToProps = (state)=>{
  const { product, productList } = state
  const { productListData } = productList
  const { productData } = product
    return {
      productData,
      productListData
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    postProduct:(payload)=>{
      dispatch(postProduct(payload));
    },
    postProductList:(payload)=>{
      dispatch(postProductList(payload));
    }
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  

  render () {
    const title = '滴滴'
    return (
      <View className='eLeMe'>
        <View className='eLeMeTop'>
          {title}
        </View>
        <Image className='eLeMeMid' src={bannerImg}></Image>

        <View className='eLeMeBtn' >
          <a href="https://activity01.yunzhanxinxi.com/link/6dfca0bd3c0f799d36b2666973e1c42b" className='redText'>领红包打车</a>
        </View>
      </View>
    )
  }
}
