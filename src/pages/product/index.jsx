import { Component } from 'react'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  getHomeDetail,
} from "../../actions/home";
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

  searchClick = (val) =>{
    debugger

  }
  

  render () {
    const searchProps ={
      searchClick:this.searchClick
    }
    
    return (
      <View className='product'>
        <View className='productTop'>
          <Image
            className='productImg'
            src={homeImg}
          ></Image>
        </View>
        <View className='productList'>
          { this.itemListView }
        </View>
      </View>
    )
  }
}
