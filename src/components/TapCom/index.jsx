import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "./index.scss";
const homeImg = require("../../assets/thanks.jpg")


const TapCom = ({props}) => {
  const { id  } = props || {}
  

  const onImgClick = () =>{
    Taro.navigateTo({
      url:`/pages/product/index?id=${id}`
    });
  }

  return (
    <View className="tapCom" >
      <View className="tapItem">主页</View>
    </View>
  );
};

export default TapCom
