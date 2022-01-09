import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  postProduct,
} from "../../actions/product";
import {
  postProductList,
} from "../../actions/productList";
import ImageCom from "../../components/ImageCom";
const homeImg = require("../../assets/thanks.jpg")
const mapStateToProps = (state)=>{
  const { product, productList } = state
  const { productListData } = productList
  const { productData } = product
    return {
      productData,
      productListData
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    postProduct:(payload)=>{
      dispatch(postProduct(payload));
    },
    postProductList:(payload)=>{
      dispatch(postProductList(payload));
    }
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  componentDidMount(){
    const { id } = getCurrentInstance()?.router?.params || {};
    this.props.postProduct({
      id
    })
    this.props.postProductList({
      type:0,
      size:3
    })
  }
  

  render () {
    const { imgUrl } = this.props.productData
    const { productListData } = this.props
    let itemListView = productListData.length > 0 && productListData.map( (v,i) =>{
      let res = (
        <ImageCom key={v.imgUrl} className='searchImg' props={v}></ImageCom>
      )
      return res
    })
   
    
    return (
      <View className='product'>
        <View className='productTop'>
          <Image
            className='productImg'
            src={imgUrl}
          ></Image>
        </View>
        <View className='productList'>
          { itemListView }
        </View>
      </View>
    )
  }
}
