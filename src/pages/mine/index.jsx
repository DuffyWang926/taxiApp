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
const moneyImg = require("../../assets/icon/money.png")
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
    return (
      <View className='mine'>
        <View className='mineTop'>
          我的
        </View>
        <View className='mineInfoBox'>
          <Image className='mineImg'></Image>
          <View className='mineInfo'>
            <View>点击登录</View>
            <View>ID:</View>
            <View>推荐人:</View>
          </View>
        </View>
        <View className='mineMoney'>
          <View className='moneyType'>
            <View className='moneySum'>
              0.00
            </View>
            <View className='moneyTitle'>
              累计收益
            </View>
          </View>
          <View className='moneyType'>
            <View className='moneySum'>
              0.00
            </View>
            <View className='moneyTitle'>
              今日收益
            </View>
          </View>
          <View className='moneyType'>
            <View className='moneySum'>
              0.00
            </View>
            <View className='moneyTitle'>
              昨日收益
            </View>
          </View>
          <View className='moneyType'>
            <View className='moneySum'>
              0.00
            </View>
            <View className='moneytitle'>
              在路上
            </View>
          </View>
        </View>
        <View className='wallet'>
          <View className='walletMoneyBox'>
            <Image className='walletMoney' src={moneyImg}></Image>
            <View className='moneyType'>
              <View className='moneySum'>
                0.00
              </View>
              <View className='moneytitle'>
                我的余额
              </View>
            </View>
          </View>
          <View className='withdraw'>
            提现
          </View>

        </View>
       
      </View>
    )
  }
}
