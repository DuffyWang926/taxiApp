
  
  const INITIAL_STATE = {
    itemList: [],
  }
  
  export default function home (state = INITIAL_STATE, action) {
    switch (action.type) {
      case "HOMEDETAIL":
        const { data } = action.payload
        return {
          ...state,
          itemList:data
        }
      default:
        return state
    }
  }
  