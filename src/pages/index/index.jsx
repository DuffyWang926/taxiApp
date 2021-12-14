import { Component } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  getHomeDetail,
} from "../../actions/home";
import SearchCom from "../../components/SearchCom";
import HomeItem from "../../components/HomeItem";
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

  itemList = [
    {
      title:'remen',
      type:0,
      imgList:[
        {
          id:'1',
          url:'',
          type:'',
          name:'',
          emotion:''
        }
      ]
    },
    {
      title:'remen',
      type:0,
      imgList:[1,1,1]
    },
    {
      title:'remen',
      type:0,
      imgList:[1,1,1]
    }
      
  ]
  itemListView = this.itemList.length > 0 && this.itemList.map( (v,i) =>{
    let res = (
      <HomeItem props={v}></HomeItem>
    )
    return res
  })

  

  render () {
    const searchProps ={
      url:''
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
        <View className='homeList'>
          { this.itemListView }
        </View>
      </View>
    )
  }
}
