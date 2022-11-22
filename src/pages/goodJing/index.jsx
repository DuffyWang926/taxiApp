import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Input, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import getUrlCode from "../../utils/getUrlCode";
import {
  postLogin,
  recordTime,
  postLoginOpenid
} from "../../actions/home";
import {
  getGoods,
  getJDGoods,
} from "../../actions/goodJing";
const bannerImg = require("../../assets/banner/banner1.png")
const mapStateToProps = (state)=>{
  const { home, goodJing } = state
  const { userId, openid } = home
  const { getGoodsParams, goodsList, getGoodsUrlParams, goodsUrlList } = goodJing


  return {
    userId,
    openid,
    getGoodsParams,
    getGoodsUrlParams,
    goodsList,
    goodsUrlList
  }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    postLoginOpenid:(payload)=>{
      dispatch(postLoginOpenid(payload));
    },
    getGoods:(payload)=>{
      dispatch(getGoods(payload));
    },
    getJDGoods:(payload)=>{
      dispatch(getJDGoods(payload));
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
    this.state={
      searchValue:''
    }
  }

  componentDidMount(){
    const { openid } = this.props
    let url = window.location.href
    let code = getUrlCode(url)
    if(code && !openid){
      this.props.postLoginOpenid({code})
    }
    this.initData()
    
  }
  initData = async ()=>{
    const { getGoodsParams, getGoodsUrlParams } = this.props
    // await this.props.getGoods(getGoodsParams)
    await this.props.getJDGoods(getGoodsParams)
    

    // await this.props.getGoods(getGoodsUrlParams)

  }
  onGoodClick = (v,i) =>{
    const { goodsUrlList, userId, openid } = this.props
    debugger
    const { link, couponLink } = v || {}
    let clickTime = new Date().getTime() + ''
    this.props.recordTime({userId,openid, clickTime, goodName:v.title})
    let url = ''
    if(couponLink){
      url = couponLink
    }else if(link){
      url = link
    }else{ 
      let item = goodsUrlList[i]
      const { link, couponLink } = item || {}
      if(couponLink){
        url = couponLink
      }else if(link){
        url = link
      }
    }

    window.location.href = url
  }
  onSearch = () =>{
    const { searchValue } = this.state
    let { getGoodsParams, getGoodsUrlParams } = this.props
    debugger
    if(searchValue){
      getGoodsParams.goodName = searchValue
      // this.props.getGoods(getGoodsParams)
      this.props.getJDGoods(getGoodsParams)
    }
  }
  onInputChange = (e) =>{
    let value = e.target.value
    this.setState({
      searchValue:value
    })
  }
  
  

  render () {
    const { goodsList } = this.props
    
    const title = '京东'
    let goodsNode = Array.isArray(goodsList) && goodsList.map( (v,i) =>{
      const {
        imgUrl,
        oldPrice,
        nowPrice,
        makeMoney,
        shop,
        title,
      } = v
      const btnProps = {
        msg:[],
        url:"https://activity01.yunzhanxinxi.com/link/426441e5060dafbf0a675c0c19a3b74a"
      }
      let res = (
        <View className='goodsItem' key={i + 'jingdong'} onClick={() => this.onGoodClick(v,i)}>
          <View className='goodImgBox'>
            <Image src={imgUrl} className='goodImg' ></Image>
          </View>
          <View className='goodTitle'>
            {title}
          </View>
          <View className='price'>
            <span className='oldPrice'>￥{oldPrice}</span>
            <span className='nowPrice'>￥{nowPrice}</span>
          </View>
          { shop && <View className='goodShop'>
            {shop}
          </View>}
          <View className='goodReturn' >
            赚 ￥<span className='goodReturnMoney'>{makeMoney}</span>
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
            <Input className='globalInput' onInput={this.onInputChange}/>
            <View className='searchBtn' onClick={this.onSearch}>
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
