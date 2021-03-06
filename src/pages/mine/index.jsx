import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import TapCom from "../../components/TapCom";
import {
  changeHomeData,
  postLogin

} from "../../actions/home";
import {
  getSearchData

} from "../../actions/mine";

const moneyImg = require("../../assets/icon/money.png")
const portraitImg = require("../../assets/portrait.svg")
const shareImg = require("../../assets/icon/share.svg")
const clientImg = require("../../assets/icon/clientService.svg")
import getUrlCode from "../../utils/getUrlCode";
const mapStateToProps = (state)=>{
  const { home } = state
  const { userInfo = {},   } = home
  const { nickname, headimgurl, openid, upCode, userCode } = userInfo
  
    return {
      nickname,
      headimgurl,
      openid,
      userCode,
      upCode
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    postLogin:(payload)=>{
      dispatch(postLogin(payload));
    },
    changeHomeData:(payload)=>{
      dispatch(changeHomeData(payload));
    },
    getSearchData:(payload)=>{
      dispatch(getSearchData(payload));
    },
    
    
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  constructor(props){
    super(props)
    const { userId } = props
    let url = window.location.href
    let code = getUrlCode(url) || ''
    let upCode = sessionStorage.getItem('upCode') || ''
    if(code && !userId){
      props.postLogin({ code, upCode})
    }

  }

  componentDidMount(){
    // this.props.getSearchData()
    this.props.changeHomeData({ tapCurrent:2})
  }

  

  loginClick = async () =>{
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
        title:'??????',
        content:'????????????5???????????????'
      })
    }
  }

  onShare = () =>{
    let url = 'pages/share/index'
    Taro.navigateTo({
      url
    })
  }

  onClientService = () =>{
    let url = 'pages/clientservice/index'
    Taro.navigateTo({
      url
    })
  }

  

  

  render () {
    const { nickname, headimgurl, upCode, userCode } = this.props
    let portraitImgSrc = headimgurl || portraitImg
    return (
      <View className='mine'>
        <View className='mineTop'>
          ??????
        </View>
        <View className='mineInfoBox'>
          <View className='mineInfoLeft'>
            <Image className='mineImg' src={portraitImgSrc}></Image>
            <View className='mineInfo'>
              { nickname ? <View onClick={() =>{ this.loginClick()}}>{nickname}</View>
              : <View onClick={() =>{ this.loginClick()}}>????????????</View>
              }
              <View>ID:{userCode}</View>
              <View>?????????:{upCode}</View>
            </View>
          </View>
          <View className='mineInfoRight' onClick={this.onShare}>
            <Image className='mineShareImg' src={shareImg}></Image>
            <View>????????????</View>
          </View>
          
        </View>
        <View className='mineMoney'>
          <View className='moneyType'>
            <View className='moneySum'>
              0.00
            </View>
            <View className='moneyTitle'>
              ????????????
            </View>
          </View>
          <View className='moneyType'>
            <View className='moneySum'>
              0.00
            </View>
            <View className='moneyTitle'>
              ????????????
            </View>
          </View>
          <View className='moneyType'>
            <View className='moneySum'>
              0.00
            </View>
            <View className='moneyTitle'>
              ????????????
            </View>
          </View>
          <View className='moneyType'>
            <View className='moneySum'>
              0.00
            </View>
            <View className='moneytitle'>
              ?????????
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
                ????????????
              </View>
            </View>
          </View>
          <View className='withdraw' onClick={ () =>{this.withdraw()}}>
            ??????
          </View>

        </View>
        <View className='clientService' onClick={this.onClientService}>
          <Image className='mineClientImg' src={clientImg}></Image>
          <View>
            ??????
          </View>
        </View>
        <TapCom ></TapCom>
       
      </View>
    )
  }
}
