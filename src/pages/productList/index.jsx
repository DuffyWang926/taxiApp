import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  postProductList,
} from "../../actions/productList";
import ImageCom from "../../components/ImageCom";
const mapStateToProps = (state)=>{
  const { productList } = state
  const { productListData } = productList
    return {
      productListData,
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    postProductList:(payload)=>{
      dispatch(postProductList(payload));
    }
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  componentDidMount(){
    const { type } = getCurrentInstance()?.router?.params || {};
    Taro.setNavigationBarTitle({
      title:'热门表情包'
    })
    this.props.postProductList({
      type
    })
  }

  render () {
    const { productListData } = this.props
    let itemListView = productListData.length > 0 && productListData.map( (v,i) =>{
      let res = (
        <ImageCom key={v.imgUrl} className='searchImg' props={v}></ImageCom>
      )
      return res
    })

    return (
      <View className='productList'>
        <View className='productBox'>
          { itemListView }
        </View>
      </View>
    )
  }
}
