import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";

import { history } from '@tarojs/router'
import TapCom from "../../components/TapCom";
import {
  postLogin

} from "../../actions/home";
const moneyImg = require("../../assets/icon/money.png")
const mapStateToProps = (state)=>{
  const { home } = state
  const { userInfo = {} } = home
  const { nickname, headimgurl, openid } = userInfo
  
    return {
      nickname,
      headimgurl,
      openid
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    postLogin:(payload)=>{
      dispatch(postLogin(payload));
    }
    
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  componentDidMount(){
    let url = window.location.href
    let nextList = url.split('?')
    let nextUrl = nextList.length > 0 && nextList[1]
    let paramsList = nextUrl && nextUrl.split('&')
    let code = ''
    Array.isArray(paramsList) && paramsList.map( (v,i) =>{
      let endList = v && v.split('=')
      if(endList.length > 0){
        if(endList[0] == 'code'){
          code = endList[1]
        }
      }
      
    })
    if(code){
      this.props.postLogin({code})
    }
  }

  loginClick = () =>{
    const { path } = getCurrentInstance()?.router || {};
    let url = 'pages/login/index?oldUrl=' + path
    Taro.navigateTo({
      url
    })
  }

  withdraw = () =>{
    let url = 'pages/withdraw/index'
    if(5 >= 5){
      Taro.navigateTo({
        url
      })
    }else{
      Taro.showToast({
        title:'提示',
        content:'余额超过5元才可提现'
      })
    }
  }

  

  render () {
    const { nickname, headimgurl } = this.props
    return (
      <View className='mine'>
        <View className='mineTop'>
          我的
        </View>
        <View className='mineInfoBox'>
          <Image className='mineImg' src={headimgurl}></Image>
          <View className='mineInfo'>
            { nickname ? <View onClick={() =>{ this.loginClick()}}>{nickname}</View>
            : <View onClick={() =>{ this.loginClick()}}>点击登录</View>
            }
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
          <View className='withdraw' onClick={ () =>{this.withdraw()}}>
            提现
          </View>

        </View>
        <TapCom ></TapCom>
       
      </View>
    )
  }
}
