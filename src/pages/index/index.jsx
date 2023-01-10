import { Component } from 'react'
import Taro from "@tarojs/taro";
import { View, TabBar, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  changeHomeData,
  postLogin

} from "../../actions/home";
import {
  getSearchData,

} from "../../actions/mine";

// import { AtTabBar } from "taro-ui";
import SearchCom from "../../components/SearchCom";
import TypeCom from "../../components/TypeCom";
import HomeItem from "../../components/HomeItem";
import TapCom from "../../components/TapCom";
import { parseUrl } from '../../utils/getUrlCode';
const bannerImgA = require("../../assets/banner/banner1.png")
const bannerImgB = require("../../assets/banner/banner2.png")
const bannerImgC = require("../../assets/banner/banner3.png")
const bannerImgD = require("../../assets/banner/banner4.jpg")
const bannerImgE = require("../../assets/banner/banner5.png")
const bannerImgF = require("../../assets/banner/banner6.png")


const homeImg = require("../../assets/thanks.jpg")
const mapStateToProps = (state)=>{
  const { home } = state
  const { itemList, tapCurrent } = home
    return {
      itemList,
      tapCurrent
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    changeHomeData:(payload)=>{
      dispatch(changeHomeData(payload));
    },
    postLogin:(payload)=>{
      dispatch(postLogin(payload));
    },
    getSearchData:(payload)=>{
      dispatch(getSearchData(payload));
    },
    
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  constructor(props) {
    super(props);
    const typeProps =[
      {
        typeId:1,
        url:'pages/eLeMe/index',
        title:'饿了么'
      },
      {
        typeId:2,
        url:'pages/meiTuan/index',
        title:'美团'
      },
      {
        typeId:3,
        url:`pages/simplePage/index?type=3`,
        title:'滴滴打车'
      },
      {
        typeId:4,
        url:`pages/simplePage/index?type=4`,
        title:'花小猪打车'
      },
      {
        typeId:5,
        url:`pages/simplePage/index?type=5`,
        title:'星巴克'
      },
      {
        typeId:6,
        url:`pages/simplePage/index?type=6`,
        title:'肯德基'
      },
      {
        typeId:7,
        url:`pages/simplePage/index?type=7`,
        title:'千猪电影'
      },
      
      {
        typeId:9,
        url:'pages/goodJing/index',
        title:'京东'
      },
      {
        typeId:10,
        url:`pages/simplePage/index?type=10`,
        title:'快递'
      },
      {
        typeId:11,
        url:`pages/simplePage/index?type=11`,
        title:'瑞幸咖啡'
      },
      // {
      //   typeId:8,
      //   url:`pages/simplePage/index?type=8`,
      //   title:'充电费'
      // },
    ]
    
    const pageList = [
      {
        typeId:0,
        url:`pages/mine/index`,
        title:'我的'
      },
    ].concat(typeProps)
    const bannerList = [
      {
        url:'pages/eLeMe/index',
        imgSrc:bannerImgA
      },
      {
        url:'pages/meiTuan/index',
        imgSrc:bannerImgB
      },
      {
        url:'pages/diDi/index',
        imgSrc:bannerImgC
      },
      {
        url:'pages/huaXiaoZhu/index',
        imgSrc:bannerImgD
      },
      {
        url:'pages/kendeji/index',
        imgSrc:bannerImgE
      },
      {
        url:'pages/xingbake/index',
        imgSrc:bannerImgF
      },
    ]

    this.state={
      bannerList,
      bannerCurrent:0,
      typeProps,
      pageList
    }
  }

  componentDidMount(){
    const { pageList } = this.state
    let url = window.location.href
    let { type, code, upCode = ''  } = parseUrl(url)
    let nextUrl = ''
    if(type){
      nextUrl = pageList[type].url
    }
    debugger
    if(code){
      this.props.postLogin({code,upCode})
    }
    this.props.getSearchData()
    if(nextUrl){
      Taro.navigateTo({
        url:nextUrl
      });
    }
  }

  
 
  changeTab= ()=>{
    this.props.changeHomeData({ tapCurrent:1})
  }
  onBannerClick = (obj) => {
    const { bannerList, bannerCurrent } = this.state
    let  url  = ''
    Array.isArray(bannerList) && bannerList.map( (v,i) =>{
      if(i == bannerCurrent){
        url = v.url
      }
    })
    if(url){
      Taro.navigateTo({
        url
      });
    }

  }
  onBannerChange = (e) => {
    const { current } = e.detail
    this.setState({
      bannerCurrent:current
    })

  }

  


  

  render () {
    const { bannerList, typeProps } = this.state
    
    const searchProps ={
      url:'/pages/search/index',
      changeTab:this.changeTab
    }
    
    const typeListCom = Array.isArray(typeProps) && typeProps.map( (v,i) =>{
      let res = (<TypeCom props={v} key={i + "type"}></TypeCom>)
      return res
    })
    const bannerListCom = Array.isArray(bannerList) && bannerList.map( (v,i) =>{
      const {imgSrc } = v
      let res = (<SwiperItem key={i + 'swiperItem'} >
      <Image src={imgSrc} className='homeImg' ></Image>
    </SwiperItem>)
      return res
    })
    return (
      <View className='home'>
        <Swiper
          onClick={ () => this.onBannerClick()}
          onChange={ (e) => this.onBannerChange(e)}
          className='homeSwiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
          autoplay>
          {bannerListCom}
        </Swiper>
        {/* <View className='homeSearch'>
          <SearchCom props={searchProps}></SearchCom>
        </View> */}
        <View className='typeList'>
          {typeListCom}
        </View>
        
        <TapCom ></TapCom>
      </View>
    )
  }
}
