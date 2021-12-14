import { Component } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  getHomeDetail,
} from "../../actions/home";
import SearchCom from "../../components/SearchCom";
const homeImg = require("../../assets/thanks.jpg")
const mapStateToProps = (state)=>{
  const { home } = state
  const { name } = home
    return {
      name,
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    getHomeDetail:(payload)=>{
      dispatch(getHomeDetail(payload));
    }
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  clickTest = () =>{
    console.log(this)
    this.props.getHomeDetail({name:'222'})
  }

  

  render () {
    const searchProps ={
      url:'aa'
    }
    return (
      <View className='home'>
        <Swiper
          className='homeSwiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
          autoplay>
          <SwiperItem >
            <Image src={homeImg} className='homeImg' ></Image>
          </SwiperItem>
          <SwiperItem>
            <Image src={homeImg} className='homeImg' ></Image>
          </SwiperItem>
        </Swiper>
        <View className='homeSearch'>
          <SearchCom props={searchProps}></SearchCom>
        </View>

        <Text >{this.props.name}</Text>
      </View>
    )
  }
}
