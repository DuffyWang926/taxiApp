import Taro from "@tarojs/taro";
import { View, Input, Text } from "@tarojs/components";

import "./index.scss";



const SearchCom = ({props}) => {
  const { url } = props
  const boxClick = () =>{
    if(url){
      Taro.navigateTo({
        url
      });
    }
    debugger
  }

  return (
    <View className="searchBox" onClick={ () =>{boxClick()}}>
      <Input className="searchInput" placeholder="请输入关键字"  	 ></Input>
      <Text className="searchTxt">搜索</Text>
    </View>
  );
};

export default SearchCom
