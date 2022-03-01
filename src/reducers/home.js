

  
  const INITIAL_STATE = {
    userId:'a',
    userInfo:{},
    tapCurrent:0
  }
  
  export default function home (state = INITIAL_STATE, action) {
    switch (action.type) {
      case "LOGIN":
        const { data = {} } = action.payload
        const { userInfo = {} } = data
        const { unionid = 'a' } = userInfo
        return {
          ...state,
          userInfo,
          userId:unionid
        }
      case "CHANGEHOMEDATA":
        const { tapCurrent = 0 } = action.payload
        return {
          ...state,
          tapCurrent
        }
      default:
        return state
    }
  }
  