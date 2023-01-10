import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {getUrlCode} from "../../utils/getUrlCode";
import {
  postLogin,
  recordTime
} from "../../actions/home";
const recommendImg = require("../../assets/recommend.jpg")
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

  onRedClick = () =>{
    const { userId } = this.props

    const { path } = getCurrentInstance()?.router || {};
    if(!userId){
      let url = 'pages/login/index?oldUrl=' + path
      Taro.navigateTo({
        url
      })
    }else{
      let clickTime = new Date().getTime() + ''
      this.props.recordTime({userId, clickTime})
      let url = "https://activity01.yunzhanxinxi.com/link/68b1e80d30b996baea1acb9200ec5b01"
      window.location.href = url
    }
    
  }

  

  render () {
    const title = '充电费'
    return (
      <View className='recommend'>
        <View>
          <Image className='recommendImg' src={recommendImg}></Image>
        </View>
        <View className='recommendTip'>
          <span>复制公众号</span>
          <span>【 BBA666321 】</span>
          <span>到微信搜索。关注就能领券啦！</span>
        </View>
      </View>
    )
  }
}
