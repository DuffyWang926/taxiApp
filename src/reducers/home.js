

  
  const INITIAL_STATE = {
    userId:'',
    openid:'',
    userInfo:{},
    tapCurrent:0
  }
  
  export default function home (state = INITIAL_STATE, action) {
    if(action.type ==  "LOGIN"){
      const { data = {} } = action.payload
      const { userInfo = {} } = data
      const { userId = '', openid = '' } = userInfo
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      return {
        ...state,
        userInfo,
        userId:userId,
        openid
      }
    }else if( action.type ==  "OPENID" ){
      const { data = {} } = action.payload
      const { openid = '' } = data
      return {
        ...state,
        openid,
      };

    }else if( action.type ==  "POSTUSERINFO" ){
      const { data = {} } = action.payload
      const { userInfo = {} } = data
      const { userId = '' } = userInfo
      sessionStorage.setItem("userId", userId);
      return {
        ...state,
        userInfo,
        userId,
      };

    }else if( action.type ==  "CHANGEHOMEDATA" ){
      const { tapCurrent = 0 } = action.payload
      return {
        ...state,
        tapCurrent
      };
    }
    return state
    
  }
  