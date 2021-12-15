import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "./index.scss";
const homeImg = require("../../assets/thanks.jpg")


const ImageCom = ({props}) => {
  const { id  } = props
  

  const onImgClick = () =>{
    Taro.navigateTo({
      url:`/pages/product/index?id=${id}`
    });
  }

  return (
    <View className="imageCom" >
      <Image
       src={homeImg}
       onClick = { () => {onImgClick()}}
       className="imageComImg"
      ></Image>
    </View>
  );
};

export default ImageCom
