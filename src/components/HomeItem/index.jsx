import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";

import "./index.scss";
const homeImg = require("../../assets/thanks.jpg")


const HomeItem = ({props}) => {
  const { url, title='', imgList=[] } = props
  const moreClick = () =>{
    if(url){
      Taro.navigateTo({
        url
      });
    }
  }
  
  const imgListView =  imgList.length > 0 && imgList.map( (v,i) =>{
    let res = (
      <Image className="itemImg" src={homeImg}></Image>
    )
    return res
  })

  return (
    <View className="homeItem" >
      <View className="itemTop" >
        <Text>
          {title}
        </Text>
        <Text onClick={ () =>{moreClick()}}>
          {'查看更多>'}
        </Text>
      </View>
      <View className="itemFoot">
        {
         imgListView
        }

      </View>
     
    </View>
  );
};

export default HomeItem
