
import Taro from '@tarojs/taro'
  
  const INITIAL_STATE = {
    getGoodsParams:{
      goodName:'面膜',
      isInit:'0',
      lastNum:0,
      num:2,
      pageNum:1
    },
    getGoodsUrlParams:{
      keyword:'手机',
      isInit:'1',
      size:4
    },
    goodsList:[
      {
        "imgUrl":"https://img14.360buyimg.com/pop/jfs/t1/123618/32/34520/144868/63b52a89Fda9351b8/8ef8253a72fe8770.jpg",
        "title":" 珀莱雅面膜 小球藻面膜 保湿海藻面膜补水面膜女男33片 ",
        "oldPrice":"79.00","nowPrice":"79.00","makeMoney":"2.84",
        "makeMoneyPercent":"6%","couponMoney":"0.00元",
        "link":" https://union-click.jd.com/jdc?e=1003913822&p=JF8BAOYJK1olXwUGXF9cDkgQB18PH1IUWwEFZBoCUBVIMzZNXhpXVhgcDBsJVFRMVnBaRQcLWgILVVhaD1RORjNVKxhMBk0KESA4aBRfaGYNbCBJDlBHED5RBHsWM28JGlgVXQMBXF1tWxlCBGoPSwgWVAZRUl5ZXUMeAWw4G1slH2hZATBaXU0TBz8NHglFW1UBZF9tCEwRAGYAGl4dXgMDV25dAEwnWj9XTQJNXAcCZG5tC3sXAm4KE1sXVAUBZG5dOEgnXQEJSF0XXFVVUzAAWhNMRm8NHTUVXAcFXV5cCUInAW4JGVklbQ ",
        "couponLink":""
      },
      {
        "imgUrl":"https://img14.360buyimg.com/pop/jfs/t1/179695/12/3553/195427/609b4c13E8eccb0c4/1b54f26080d475d8.jpg",
        "title":" 【进口原料】海藻补水润泽面膜30片保湿提亮提拉紧致学生女面膜收缩毛孔护肤品敏感肌痘印 海藻面膜 ",
        "oldPrice":"129.90","nowPrice":"29.90","makeMoney":"6.26",
        "makeMoneyPercent":"36%",
        "couponMoney":"100.00元",
        "link":" https://union-click.jd.com/jdc?e=1003913822&p=JF8BAOYJK1olXwUGXF9cDkgQB18PH1IUWwEFZBoCUBVIMzZNXhpXVhgcDBsJVFRMVnBaRQcLWgILVVhaD1RORjNVKxp1XQ9bNjsBayJlAmwPBShNG19KVxhRBHsWM28JGlgVXQMBXF1tWxlCBGoPSwgWVAZRUl5ZXUMeAWw4G1slH2hZATBaXU0TBz8NHglFW1UBZF9tCEwRAGYAGl4dWAMBV25dAEwnWj9XTQJNXAcCZG5tC3sXAm4KE1sXVAUBZG5dOEgnXQEJSF5HCQIAUTAAWhNMRmxWTzUVXQMBV19VDk4nAW4JGVklbQ ",
        "couponLink":""
      },
      {
        "imgUrl":"https://img14.360buyimg.com/pop/jfs/t1/30123/36/16914137/128818/63b61672F589e5518/e8ff93aea1edfb0d.jpg",
        "title":" JMsolution肌司研水光补水保湿面膜韩国进口玻尿酸收缩毛孔JM面膜10片/盒 ",
        "oldPrice":"80.00","nowPrice":"80.00","makeMoney":"1.44",
        "makeMoneyPercent":"3%","couponMoney":"0.00元",
        "link":" https://union-click.jd.com/jdc?e=1003913822&p=JF8BAOYJK1olXwUGXF9cDkgQB18PH1IUWwEFZBoCUBVIMzZNXhpXVhgcDBsJVFRMVnBaRQcLWgILVVhaD1RORjNVKwEQFRxlDhkgaEhPUT0Keg5UKlFkEBhRBHsWM28JGlgVXQMBXF1tWxlCBGoPSwgWVAZRUl5ZXUMeAWw4G1slH2hZATBaXU0TBz8NHglFW1UBZF9tCEwRAGYAGl4dWgIFXG5dAEwnWj9XTQJNXAcCZG5tC3sXAm4KE1sXVAUBZG5dOEgnXQEJSFMVXARXXDAAWhNMRmpaGzUVXQQKU19dDUsnAW4JGVklbQ ",
        "couponLink":""
      },
      {
        "imgUrl":"https://img14.360buyimg.com/pop/jfs/t1/66056/38/17797/56051/63aebe31Fd568f911/89441c8055e7cd59.jpg",
        "title":" WIS玻尿酸面膜24片 三重玻尿酸熬夜补水保湿面膜修护舒缓敏感肌可用 ",
        "oldPrice":"139.00","nowPrice":"139.00","makeMoney":"0.83",
        "makeMoneyPercent":"1%","couponMoney":"0.00元",
        "link":" https://union-click.jd.com/jdc?e=1003913822&p=JF8BAOYJK1olXwUGXF9cDkgQB18PH1IUWwEFZBoCUBVIMzZNXhpXVhgcDBsJVFRMVnBaRQcLWgILVVhaD1RORjNVKyhdWHoGLysdbTdtXBpJaBMRD2QLIwhRBHsWM28JGlgVXQMBXF1tWxlCBGoPSwgWVAZRUl5ZXUMeAWw4G1slH2hZATBaXU0TBz8NHglFW1UBZF9tCEwRAGYAGl4dVAEFUm5dAEwnWj9XTQJNXAcCZG5tC3sXAm4KE1sXVAUBZG5dOEgnXQEJSF0XXQMFUjAAWhNMRmtAEzUVXAcFXFddCEInAW4JGVklbQ ",
        "couponLink":""
      }
    ],
    goodsUrlList:[],

  }
  
  export default function goodJing (state = INITIAL_STATE, action) {
    Taro.hideLoading()

    if(action.type ===  "JINGDONGGOODS"){
      const { data } = action.payload
      const { dataList } = data
      return {
        ...state,
        goodsList:dataList
      };
      
    }else if(action.type ===  "JINGDONGGOODSURL"){
      const { data } = action.payload
      const { goodsList } = data
      return {
        ...state,
        goodsUrlList:goodsList
      };
      
    }else{
      return state
    }
    
  }
  