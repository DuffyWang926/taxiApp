

  
  const INITIAL_STATE = {
    productListData: [
          {
            id:'1',
            imgUrl:1,
            type:'',
            name:'',
            emotion:''
          },
          {
            id:'2',
            imgUrl:2,
            type:'',
            name:'',
            emotion:''
          },
          {
            id:'3',
            imgUrl:3,
            type:'',
            name:'',
            emotion:''
          }
        ]
  }
  
  export default function home (state = INITIAL_STATE, action) {
    switch (action.type) {
      case "PRODUCTLIST":
        const { data } = action.payload
        const { productList=[] } = data
        return {
          ...state,
          productListData:productList
        }
      default:
        return state
    }
  }
  