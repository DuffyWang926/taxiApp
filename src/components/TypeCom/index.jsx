import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";

import "./index.scss";
import ImageCom from "../ImageCom";
const eLeMeImg = require("../../assets/logo/logo1.jpg")
const meiTuanImg = require("../../assets/logo/logo2.png")
const didiImg = require("../../assets/logo/logo3.png")
const huaXiaoZhuImg = require("../../assets/logo/logo4.jpg")



const TypeItem = ({props}) => {
  const { url, typeId, title='' } = props
  let imgSrc = ''
  if(typeId == 1){
    imgSrc = eLeMeImg
  }else if(typeId == 2){
    imgSrc = meiTuanImg
  }else if(typeId == 3){
    imgSrc = didiImg
  }else if(typeId == 4){
    imgSrc = huaXiaoZhuImg
  }
  
  const typeClick = () =>{
    const { url } = props
    if(url){
      Taro.navigateTo({
        url
      });
    }
  }

  return (
    <View className="typeItem" onClick={ () =>{typeClick()}}>
      <Image className="itemTop" src={imgSrc}></Image>
      <View className="itemFoot" >
        {title}
      </View>
    </View>
  );
};

export default TypeItem
