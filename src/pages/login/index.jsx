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
const logoImg = require("../../assets/logo/logo.jpg")
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

  login = () =>{
    
  }

  render () {
    return (
      <View className='login'>
        <View className='loginTop'>
          登录
        </View>
        <View className='loginMid'>
          <Image className='midImg' src={logoImg} ></Image>
          <View className='midTitle'>
            打车券每天领
          </View>
          <View className='midTip'>
            省一点,赚一点,越赚越快乐
          </View>
        </View>
        <View className='loginBtn' onClick={ () => { this.login()}}>
          微信登录
        </View>
      </View>
    )
  }
}
