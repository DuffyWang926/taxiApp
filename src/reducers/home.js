

  
  const INITIAL_STATE = {
    userId:'',
    userInfo:{},
    tapCurrent:0
  }
  
  export default function home (state = INITIAL_STATE, action) {
    if(action.type ==  "LOGIN"){
      const { data = {} } = action.payload
      const { userInfo = {} } = data
      const { unionid = '' } = userInfo
      sessionStorage.setItem("userId", unionid);

      return {
        ...state,
        userInfo,
        userId:unionid
      }

    }else if( action.type ==  "POSTUSERINFO" ){
      const { data = {} } = action.payload
      const { userInfo = {} } = data
      const { userId = '' } = userInfo
      sessionStorage.setItem("userId", unionid);
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
  