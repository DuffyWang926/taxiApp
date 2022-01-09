

  
  const INITIAL_STATE = {
    productData: [
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
      case "PRODUCT":
        const { data } = action.payload
        const { product={} } = data
        return {
          ...state,
          productData:product
        }
      default:
        return state
    }
  }
  