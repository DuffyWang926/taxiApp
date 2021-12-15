import { Component } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  getHomeDetail,
} from "../../actions/home";
import SearchCom from "../../components/SearchCom";
import ImageCom from "../../components/ImageCom";
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
 
  imgList = [
    
    {
      id:'1',
      url:'',
      type:'',
      name:'',
      emotion:''
    },
    {
      id:'1',
      url:'',
      type:'',
      name:'',
      emotion:''
    },
      
  ]
  imgListView = this.imgList.length > 0 && this.imgList.map( (v,i) =>{
    let res = (
      <ImageCom 
        className='searchImg'
        props={v}
      ></ImageCom>
    )
    return res
  })

  searchClick = (val) =>{
    debugger

  }
  

  render () {
    const searchProps ={
      searchClick:this.searchClick
    }
    
    return (
      <View className='search'>
        <View className='searchTop'>
          <SearchCom props={searchProps}></SearchCom>
        </View>
        <View className='searchList'>
          { this.imgListView }
        </View>
      </View>
    )
  }
}
