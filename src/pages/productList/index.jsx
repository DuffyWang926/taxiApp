import { Component } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  getHomeDetail,
} from "../../actions/home";
import ImageCom from "../../components/ImageCom";
import Taro from "@tarojs/taro";
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

  componentDidMount(){
    Taro.setNavigationBarTitle({
      title:'热门表情包'
    })
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
      <ImageCom className='searchImg' props={v}></ImageCom>
    )
    return res
  })


  render () {
    return (
      <View className='productList'>
        <View className='productBox'>
          { this.itemListView }
        </View>
      </View>
    )
  }
}
