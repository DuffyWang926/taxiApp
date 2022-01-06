import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "./index.scss";


const ImageCom = ({props}) => {
  const { id, imgUrl  } = props

  const onImgClick = () =>{
    Taro.navigateTo({
      url:`/pages/product/index?id=${id}`
    });
  }

  return (
    <View className="imageCom" >
      <Image
       src={imgUrl}
       onClick = { () => {onImgClick()}}
       className="imageComImg"
      ></Image>
    </View>
  );
};

export default ImageCom
